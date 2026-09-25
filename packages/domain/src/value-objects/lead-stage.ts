/** Etapas do funil de prospecção, na ordem em que o lead avança. */
export const LeadStage = {
  New: 'novo',
  Contacted: 'contatado',
  Replied: 'respondeu',
  Proposal: 'proposta',
  Won: 'fechado',
  Lost: 'perdido',
} as const;

export type LeadStage = (typeof LeadStage)[keyof typeof LeadStage];
