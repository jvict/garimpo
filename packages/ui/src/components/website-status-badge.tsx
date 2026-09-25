import { Badge, type BadgeProps } from '@mantine/core';
import { WebsiteStatus } from '@garimpo/domain';

export const WEBSITE_STATUS_STYLE: Record<WebsiteStatus, { label: string; bg: string; fg: string; dot: string }> = {
  [WebsiteStatus.NoWebsite]: { label: 'Sem site', bg: '#FEE4E2', fg: '#B42318', dot: '#D92D20' },
  [WebsiteStatus.SocialOnly]: { label: 'Só rede social', bg: '#FFEFD6', fg: '#9A3412', dot: '#EA580C' },
  [WebsiteStatus.Broken]: { label: 'Site quebrado', bg: '#F4EBFF', fg: '#6941C6', dot: '#7F56D9' },
  [WebsiteStatus.Poor]: { label: 'Site fraco', bg: '#FEF7C3', fg: '#854A0E', dot: '#CA8504' },
  [WebsiteStatus.Ok]: { label: 'Site ok', bg: '#DCFAE6', fg: '#067647', dot: '#17B26A' },
};

interface WebsiteStatusBadgeProps extends Omit<BadgeProps, 'color'> {
  status: WebsiteStatus;
}

export function WebsiteStatusBadge({ status, ...props }: WebsiteStatusBadgeProps) {
  const style = WEBSITE_STATUS_STYLE[status];
  return (
    <Badge
      {...props}
      leftSection={<span style={{ width: 6, height: 6, borderRadius: '50%', background: style.dot }} />}
      styles={{ root: { background: style.bg, color: style.fg } }}
    >
      {style.label}
    </Badge>
  );
}
