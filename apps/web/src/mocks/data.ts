// DADOS DE EXEMPLO — usados enquanto Supabase e Google Places não estão ligados.
// Serão substituídos pelos casos de uso da camada application.
import { LeadStage, WebsiteStatus } from '@garimpo/domain';
import type { BusinessView } from '@/features/businesses/types';

type Seed = [
  id: string, name: string, segment: string, neighborhood: string, phone: string,
  status: WebsiteStatus, note: string, rating: number, reviews: number, score: number,
  stage: LeadStage, followUp: string | null, lastActivity: string,
];

const seeds: Seed[] = [
  ['1', 'Contábil Horizonte', 'Contabilidade', 'Centro', '(34) 99812-4410', WebsiteStatus.NoWebsite, 'Nenhum site no Google', 4.8, 126, 92, LeadStage.New, null, 'Encontrada hoje'],
  ['2', 'Prime Contabilidade', 'Contabilidade', 'Santa Mônica', '(34) 99177-0932', WebsiteStatus.SocialOnly, 'instagram.com/primecontab', 4.9, 88, 88, LeadStage.New, null, 'Encontrada hoje'],
  ['3', 'Nova Era Assessoria Contábil', 'Contabilidade', 'Martins', '(34) 99654-2217', WebsiteStatus.NoWebsite, 'Nenhum site no Google', 4.7, 41, 84, LeadStage.New, null, 'Encontrada hoje'],
  ['4', 'Andrade & Lima Contadores', 'Contabilidade', 'Tabajaras', '(34) 3214-5580', WebsiteStatus.Broken, 'Erro 503 · domínio expirado?', 4.6, 54, 71, LeadStage.Contacted, 'Contatado há 3 dias sem resposta', 'Contatado há 3 dias'],
  ['5', 'Contab Cerrado', 'Contabilidade', 'Brasil', '(34) 99230-7788', WebsiteStatus.Poor, 'Sem HTTPS', 4.5, 37, 63, LeadStage.Replied, 'Pediu a prévia do site ontem', 'Respondeu ontem'],
  ['6', 'Pires Contabilidade', 'Contabilidade', 'Umuarama', '(34) 98845-1120', WebsiteStatus.SocialOnly, 'facebook.com/pirescontab', 4.3, 19, 58, LeadStage.New, null, 'Encontrada hoje'],
  ['7', 'MR Contábil', 'Contabilidade', 'Saraiva', '(34) 99761-3345', WebsiteStatus.Poor, 'Não é responsivo', 4.4, 23, 55, LeadStage.New, null, 'Encontrada hoje'],
  ['8', 'Grupo Fiscal Consultoria', 'Contabilidade', 'Fundinho', '(34) 3236-9001', WebsiteStatus.Ok, 'grupofiscal.com.br', 4.9, 212, 12, LeadStage.Lost, null, 'Descartada'],
  ['9', 'Studio Corpo em Forma', 'Academia', 'Jardim Karaíba', '(34) 99102-5566', WebsiteStatus.NoWebsite, 'Nenhum site no Google', 4.8, 97, 86, LeadStage.New, null, 'Encontrada ontem'],
  ['10', 'Clínica Vida Plena', 'Clínica médica', 'Centro', '(34) 99433-8120', WebsiteStatus.SocialOnly, 'instagram.com/vidaplenaclinica', 4.7, 150, 80, LeadStage.Contacted, 'Contatada há 3 dias · só Instagram', 'Contatada há 3 dias'],
  ['11', 'Moura Advogados', 'Advocacia', 'Fundinho', '(34) 99355-7412', WebsiteStatus.Poor, 'Sem HTTPS', 4.6, 32, 66, LeadStage.Contacted, null, 'Contatado há 2 dias'],
  ['12', 'Academia Impulso', 'Academia', 'Umuarama', '(34) 99218-3390', WebsiteStatus.NoWebsite, 'Nenhum site no Google', 4.5, 64, 79, LeadStage.Replied, null, 'Respondeu há 1 dia'],
  ['13', 'Oliveira & Reis Advocacia', 'Advocacia', 'Santa Mônica', '(34) 99876-1044', WebsiteStatus.NoWebsite, 'Nenhum site no Google', 4.9, 45, 83, LeadStage.Proposal, 'Proposta enviada há 3 dias', 'Proposta enviada há 3 dias'],
  ['14', 'OdontoSorriso', 'Odontologia', 'Centro', '(34) 99541-2287', WebsiteStatus.Broken, 'Timeout ao acessar', 4.4, 71, 74, LeadStage.Proposal, null, 'Aguardando retorno'],
  ['15', 'Espaço Pilates Leve', 'Academia', 'Martins', '(34) 99687-9021', WebsiteStatus.SocialOnly, 'instagram.com/pilatesleve', 4.9, 58, 81, LeadStage.Won, null, 'Fechado · 12 set'],
  ['16', 'Silva Contabilidade', 'Contabilidade', 'Tibery', '(34) 99120-4478', WebsiteStatus.NoWebsite, 'Nenhum site no Google', 4.6, 29, 77, LeadStage.Won, null, 'Fechado · 3 set'],
];

function reasonsFor(status: WebsiteStatus, reviews: number, phone: string): string[] {
  const site: Record<WebsiteStatus, string> = {
    [WebsiteStatus.NoWebsite]: 'Não tem site no Google',
    [WebsiteStatus.SocialOnly]: 'Usa só rede social como site',
    [WebsiteStatus.Broken]: 'Site fora do ar',
    [WebsiteStatus.Poor]: 'Site desatualizado',
    [WebsiteStatus.Ok]: 'Já tem um site funcionando',
  };
  const reasons = [site[status]];
  if (reviews >= 50) reasons.push(`${reviews} avaliações: empresa movimentada`);
  reasons.push(/\) 9/.test(phone) ? 'Celular: provável WhatsApp' : 'Só telefone fixo');
  return reasons;
}

export const businesses: BusinessView[] = seeds.map(
  ([id, name, segment, neighborhood, phone, websiteStatus, websiteNote, rating, reviews, score, stage, followUp, lastActivity]) => ({
    id, name, segment, neighborhood, city: 'Uberlândia, MG',
    address: `[Endereço do Google], ${neighborhood}`,
    phone, email: null, instagram: websiteNote.startsWith('instagram.com') ? websiteNote : null,
    websiteStatus, websiteNote, rating, reviews, score,
    scoreReasons: reasonsFor(websiteStatus, reviews, phone),
    stage, followUp, lastActivity,
    history: [
      { text: `Site verificado: ${websiteNote.toLowerCase()}`, when: 'hoje, 09:42' },
      { text: `Encontrada na busca "${segment} em Uberlândia, MG"`, when: 'hoje, 09:40' },
    ],
  }),
);

export const latestSearch = {
  segment: 'Contabilidade',
  city: 'Uberlândia, MG',
  total: 148,
  finishedAgo: 'há 2 min',
  results: businesses.filter((business) => business.segment === 'Contabilidade'),
};

export const googleQuota = { used: 342, limit: 1000, dailyCap: 100, renewsOn: '1 de outubro', collected: 6840 };

export const dashboardStats = {
  period: 'Setembro de 2026',
  found: 612,
  searches: 4,
  opportunities: 289,
  contacted: 74,
  replied: 17,
  won: 3,
  funnel: [
    { label: 'Novo', value: 289 },
    { label: 'Contatado', value: 51 },
    { label: 'Respondeu', value: 17 },
    { label: 'Proposta', value: 5 },
    { label: 'Fechado', value: 3 },
  ],
  bySegment: [
    { label: 'Academias', value: 58 },
    { label: 'Contabilidade', value: 46 },
    { label: 'Clínicas médicas', value: 44 },
    { label: 'Advocacia', value: 39 },
  ],
};

export const funnelTotals: Record<LeadStage, number> = {
  [LeadStage.New]: 289,
  [LeadStage.Contacted]: 51,
  [LeadStage.Replied]: 17,
  [LeadStage.Proposal]: 5,
  [LeadStage.Won]: 3,
  [LeadStage.Lost]: 6,
};

export const messageTemplates = [
  {
    id: 'sem-site',
    name: 'Primeiro contato · sem site',
    body:
      'Olá, tudo bem? Vi que a {nome} tem ótimas avaliações no Google ({nota} com {avaliacoes} avaliações), mas ainda não tem um site próprio.\n\n' +
      'Eu crio sites para empresas de {ramo} e posso te mostrar uma prévia de como ficaria o de vocês, sem compromisso. Posso te enviar?',
  },
  {
    id: 'rede-social',
    name: 'Primeiro contato · só rede social',
    body:
      'Olá, tudo bem? Acompanhei o trabalho da {nome} pelo Instagram e vi que vocês ainda não têm um site próprio.\n\n' +
      'Um site ajuda quem procura {ramo} no Google a encontrar vocês. Posso te mostrar uma prévia, sem compromisso?',
  },
  {
    id: 'follow-up',
    name: 'Follow-up',
    body: 'Oi! Passando para saber se conseguiu ver minha mensagem sobre o site da {nome}. Posso te mandar a prévia?',
  },
];

export const segmentSuggestions = ['Advocacia', 'Clínicas médicas', 'Academias', 'Odontologia', 'Salões de beleza'];
