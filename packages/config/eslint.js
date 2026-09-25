// Configuração ESLint compartilhada.
// `layer` aplica a regra de dependência da clean architecture:
// cada camada declara quais módulos NÃO pode importar.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

const LAYER_RULES = {
  domain: {
    patterns: ['@garimpo/*'],
    message: 'domain é o núcleo: não importa nenhum outro pacote.',
  },
  application: {
    patterns: [
      '@garimpo/infrastructure', '@garimpo/jobs', '@garimpo/ui', '@garimpo/web',
      'next', 'next/*', 'react', 'drizzle-orm', 'drizzle-orm/*', 'postgres',
      'inngest', 'inngest/*', '@supabase/*',
    ],
    message: 'application só depende de domain. Use ports (interfaces) para serviços externos.',
  },
  infrastructure: {
    patterns: ['@garimpo/jobs', '@garimpo/ui', '@garimpo/web', 'next', 'next/*', 'react'],
    message: 'infrastructure implementa ports; não conhece UI nem jobs.',
  },
  jobs: {
    patterns: ['@garimpo/infrastructure', '@garimpo/ui', '@garimpo/web', 'next', 'next/*', 'react'],
    message: 'jobs recebem casos de uso prontos (injetados pelo composition root).',
  },
  ui: {
    patterns: ['@garimpo/application', '@garimpo/infrastructure', '@garimpo/jobs', '@garimpo/web'],
    message: 'ui é apenas visual: sem regras de negócio nem infraestrutura.',
  },
};

/** @param {{ layer?: keyof typeof LAYER_RULES }} [options] */
export function createConfig({ layer } = {}) {
  const restriction = layer ? LAYER_RULES[layer] : undefined;

  return tseslint.config(
    { ignores: ['dist/**', '.next/**', 'node_modules/**'] },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
      rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
      },
    },
    ...(restriction
      ? [
          {
            files: ['src/**/*.{ts,tsx}'],
            rules: {
              'no-restricted-imports': [
                'error',
                { patterns: [{ group: restriction.patterns, message: restriction.message }] },
              ],
            },
          },
        ]
      : []),
  );
}
