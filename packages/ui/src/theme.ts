import { createTheme, type MantineColorsTuple } from '@mantine/core';

/** Neutros quentes — texto, bordas e botões principais. */
const ink: MantineColorsTuple = [
  '#F7F7F5', '#EFEEEA', '#E7E5E0', '#D6D3CE', '#A8A29E',
  '#6B6760', '#57534E', '#3A3834', '#1C1B19', '#0F0E0D',
];

/** Âmbar "ouro" — destaques, score e cota. */
const gold: MantineColorsTuple = [
  '#FFF8EB', '#FEF0C7', '#FCE3B4', '#FBBF24', '#F5B544',
  '#D97706', '#B45309', '#92400E', '#78350F', '#451A03',
];

/** Verde do botão de WhatsApp (tons 6 e 8 = #067647, contraste AA sobre branco). */
const whatsapp: MantineColorsTuple = [
  '#ECFDF3', '#DCFAE6', '#ABEFC6', '#75E0A7', '#47CD89',
  '#17B26A', '#067647', '#085D3A', '#067647', '#05603A',
];

export const theme = createTheme({
  colors: { ink, gold, whatsapp },
  primaryColor: 'ink',
  primaryShade: 8,
  black: '#1C1B19',
  defaultRadius: 'md',
  fontFamily: 'var(--font-geist), system-ui, sans-serif',
  headings: {
    fontFamily: 'var(--font-bricolage), var(--font-geist), sans-serif',
    fontWeight: '700',
  },
  components: {
    Paper: { defaultProps: { withBorder: true, radius: 'lg' } },
    Card: { defaultProps: { withBorder: true, radius: 'lg' } },
    Badge: { defaultProps: { radius: 'xl', size: 'md' }, styles: { root: { textTransform: 'none' } } },
  },
});
