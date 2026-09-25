'use client';

import { useState } from 'react';
import { Badge, Group, Paper, ScrollArea, SimpleGrid, Stack, Text, Title, UnstyledButton } from '@mantine/core';
import { LeadStage } from '@garimpo/domain';
import { LEAD_STAGE_STYLE, WebsiteStatusBadge } from '@garimpo/ui';
import { BusinessDrawer } from '@/features/businesses/business-drawer';
import type { BusinessView } from '@/features/businesses/types';
import classes from './funnel-board.module.css';

const COLUMNS = [LeadStage.New, LeadStage.Contacted, LeadStage.Replied, LeadStage.Proposal, LeadStage.Won];

interface FunnelBoardProps {
  businesses: BusinessView[];
  totals: Record<LeadStage, number>;
}

export function FunnelBoard({ businesses, totals }: FunnelBoardProps) {
  const [selected, setSelected] = useState<BusinessView | null>(null);

  return (
    <ScrollArea type="auto" offsetScrollbars>
      <SimpleGrid cols={5} spacing="sm" miw={1100} style={{ alignItems: 'start' }}>
        {COLUMNS.map((stage) => {
          const cards = businesses.filter((business) => business.stage === stage).sort((a, b) => b.score - a.score);
          const hidden = totals[stage] - cards.length;
          return (
            <Stack key={stage} gap={10} className={classes.column}>
              <Group justify="space-between" px={4}>
                <Title order={2} fz={14} ff="text" fw={600}>{LEAD_STAGE_STYLE[stage].label}</Title>
                <Badge variant="white" color="ink" size="sm">{totals[stage]}</Badge>
              </Group>
              {cards.map((business) => (
                <UnstyledButton key={business.id} onClick={() => setSelected(business)} className={classes.card}>
                  <Stack gap={10}>
                    <Stack gap={2}>
                      <Text fz="sm" fw={600}>{business.name}</Text>
                      <Text fz="xs" c="ink.5">{business.segment} · {business.neighborhood}</Text>
                    </Stack>
                    <Group justify="space-between" gap={6}>
                      <WebsiteStatusBadge status={business.websiteStatus} size="sm" />
                      <Text fz="xs" fw={600} c="gold.7" style={{ whiteSpace: 'nowrap' }}>Score {business.score}</Text>
                    </Group>
                    {business.followUp ? (
                      <Paper withBorder={false} bg="gold.0" px={8} py={4} radius="sm">
                        <Text fz="xs" fw={600} c="gold.7">{business.followUp}</Text>
                      </Paper>
                    ) : (
                      <Text fz="xs" c="ink.5">{business.lastActivity}</Text>
                    )}
                  </Stack>
                </UnstyledButton>
              ))}
              {hidden > 0 && <Text fz="xs" c="ink.5" ta="center" py={4}>+ {hidden} empresas</Text>}
            </Stack>
          );
        })}
      </SimpleGrid>
      <BusinessDrawer business={selected} onClose={() => setSelected(null)} />
    </ScrollArea>
  );
}
