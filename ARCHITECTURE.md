# Arquitetura do Garimpo

Plataforma para encontrar empresas de uma cidade por ramo (contabilidade, advocacia,
clínicas, academias...), verificar se têm site e abordá-las pelo WhatsApp para oferecer
criação de sites.

**Fase atual:** uso pessoal (MVP). **Objetivo:** virar SaaS. Por isso o banco já nasce com `org_id`.

---

## 1. Fluxo do produto

```
BUSCA (cidade + ramo) → VERIFICA SITE → ENRIQUECE + SCORE → FUNIL (CRM) → CONTATO (WhatsApp)
   Google Places          HTTP + PageSpeed   e-mail, insta       status, notas     link wa.me
```

### Classificação do site (`WebsiteStatus`)
| Status | Regra | Potencial |
|---|---|---|
| `sem_site` | Google não retorna site | Altíssimo |
| `so_rede_social` | URL (ou redirecionamento) é Instagram, Facebook, Linktree, wa.me... | Altíssimo |
| `quebrado` | Inacessível, timeout ou HTTP ≥ 400 | Alto |
| `ruim` | Sem HTTPS ou sem meta viewport (não responsivo) | Médio |
| `ok` | Passou em tudo | Baixo |

## 2. Stack

| Camada | Tecnologia |
|---|---|
| Monorepo | **npm workspaces** + Turborepo (apenas npm, sem pnpm/yarn) |
| Linguagem | TypeScript strict |
| Front + API | Next.js (App Router) |
| UI | Mantine + CSS Modules (sem Tailwind) |
| Banco + Auth | Supabase (Postgres + Auth + RLS) |
| ORM | Drizzle |
| Filas | Inngest |
| Validação | Zod |
| Testes | Vitest |
| Dados | Google Places API (New) — Text Search com campos Enterprise |

Node 24 LTS (`.nvmrc`).

## 3. Estrutura do monorepo

```
garimpo/
├── apps/
│   └── web/                    Next.js + Mantine — APRESENTAÇÃO
│       └── src/
│           ├── app/              rotas (App Router)
│           ├── features/         componentes por funcionalidade
│           ├── actions/          Server Actions (controllers)
│           └── server/
│               └── container.ts  COMPOSITION ROOT (injeção de dependências)
└── packages/
    ├── domain/                 entidades, value objects, serviços de domínio,
    │                           INTERFACES de repositório. Zero dependências.
    ├── application/            casos de uso + ports (interfaces de serviços externos)
    ├── infrastructure/         Drizzle, repositórios, Google Places, HTTP, Inngest
    ├── jobs/                   funções da fila — finas, só chamam casos de uso
    ├── ui/                     tema Mantine e componentes visuais compartilhados
    └── config/                 tsconfig e ESLint compartilhados
```

## 4. Regra de dependência

As dependências apontam sempre **para dentro**:

```
web / jobs  →  infrastructure  →  application  →  domain
```

| Pacote | Pode importar | Não pode importar |
|---|---|---|
| `domain` | nada | qualquer `@garimpo/*` |
| `application` | `domain` | infrastructure, jobs, ui, web, Next, Drizzle, Inngest, Supabase |
| `infrastructure` | `domain`, `application` | jobs, ui, web, Next, React |
| `jobs` | `application` | infrastructure, ui, web |
| `ui` | libs visuais | application, infrastructure, jobs |
| `web` | tudo | — (é onde tudo se conecta) |

A regra é **verificada pelo ESLint** (`packages/config/eslint.js`, `no-restricted-imports`):
uma importação proibida quebra o `npm run lint`.

## 5. SOLID na prática

- **S** — cada caso de uso faz uma coisa (`CheckWebsiteUseCase`, `StartSearchUseCase`...).
- **O** — nova fonte de dados = nova classe implementando `PlacesProvider`, sem alterar casos de uso.
- **L** — `DrizzleBusinessRepository` e `InMemoryBusinessRepository` (testes) são intercambiáveis.
- **I** — interfaces pequenas (`WebsiteInspector` tem só `inspect(url)`).
- **D** — casos de uso recebem interfaces no construtor; `container.ts` entrega as implementações.

Injeção de dependência **manual** (sem biblioteca de DI).

## 6. Fluxo de uma busca

```
[web]   formulário → Server Action startSearch()
[app]   StartSearchUseCase: valida (Zod) → UsageTracker.canSpend() → salva busca → JobQueue.enqueue()
[jobs]  CollectBusinessesUseCase: PlacesProvider.textSearch() em grade/bairros → dedup por place_id → saveMany()
[jobs]  CheckWebsiteUseCase (por empresa): WebsiteInspector → WebsiteClassifier → LeadScoreCalculator
[web]   tabela atualiza via Supabase Realtime
```

## 7. Modelo de dados (planejado)

```
organizations     (id, nome, plano)
searches          (id, org_id, cidade, ramo, status, qtd_encontrada)
businesses        (id, org_id, place_id, nome, ramo, endereco, cidade, bairro, telefone,
                   tem_whatsapp, email, instagram, website, nota, n_avaliacoes, maps_url)
                   UNIQUE(org_id, place_id)
website_checks    (id, business_id, status_site, http_code, https, mobile_ok, pagespeed, checado_em)
leads             (id, org_id, business_id, score, etapa, proximo_followup)
interactions      (id, lead_id, canal, mensagem, resultado, data)
message_templates (id, org_id, nome, corpo)
usage_events      (org_id, tipo, quantidade, data)
```

## 8. Google Places — custos e limites

- Campos necessários (site, telefone, nota, avaliações) caem no SKU **Text Search Enterprise**:
  **1.000 requisições grátis/mês**, cada uma com até 20 empresas (≈ 20 mil empresas/mês).
- Máximo de 60 resultados por consulta → cobrir a cidade dividindo em grade/bairros.
- Proteção: contador de uso no sistema + **quota diária no Google Cloud Console**.
- Termos do Google: apenas `place_id` pode ser armazenado indefinidamente — revisar antes do SaaS.

## 9. WhatsApp

1. **MVP:** link `wa.me` com mensagem pré-preenchida (envio manual, sem risco).
2. Fila de disparo assistida (abre → envia → marca → próximo).
3. Futuro: WhatsApp Cloud API oficial para caixa de entrada de respostas.

Não usar APIs não oficiais (Baileys, Evolution, Z-API) — risco de banimento.

## 10. Roadmap

1. **MVP:** login, busca, verificação de site, tabela com filtros, botão WhatsApp, CSV, contador de uso.
2. **CRM:** kanban, notas, follow-ups, modelos de mensagem.
3. **SaaS:** organizações, planos/créditos, cobrança (Asaas/Stripe), opt-out global, LGPD.
4. **Crescimento:** PageSpeed, score, WhatsApp Cloud API, base CNPJ.
5. **Diferencial:** prévia de site gerada por IA.
