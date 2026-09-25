import { Badge, type BadgeProps } from '@mantine/core';
import { LeadStage } from '@garimpo/domain';

export const LEAD_STAGE_STYLE: Record<LeadStage, { label: string; bg: string; fg: string }> = {
  [LeadStage.New]: { label: 'Novo', bg: '#F0EFEB', fg: '#44403C' },
  [LeadStage.Contacted]: { label: 'Contatado', bg: '#EFF4FF', fg: '#1D4ED8' },
  [LeadStage.Replied]: { label: 'Respondeu', bg: '#E6F7F5', fg: '#0F766E' },
  [LeadStage.Proposal]: { label: 'Proposta', bg: '#FFF8EB', fg: '#92400E' },
  [LeadStage.Won]: { label: 'Fechado', bg: '#DCFAE6', fg: '#067647' },
  [LeadStage.Lost]: { label: 'Perdido', bg: '#F0EFEB', fg: '#6B6760' },
};

interface LeadStageBadgeProps extends Omit<BadgeProps, 'color'> {
  stage: LeadStage;
}

export function LeadStageBadge({ stage, ...props }: LeadStageBadgeProps) {
  const style = LEAD_STAGE_STYLE[stage];
  return (
    <Badge {...props} styles={{ root: { background: style.bg, color: style.fg } }}>
      {style.label}
    </Badge>
  );
}
