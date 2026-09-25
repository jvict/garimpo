'use client';

import Link from 'next/link';
import { Anchor, Group, Paper, Stack, Text, Title } from '@mantine/core';
import type { BusinessView } from '@/features/businesses/types';
import { WhatsAppButton } from '@/features/whatsapp/whatsapp-button';

export function FollowUpsCard({ businesses }: { businesses: BusinessView[] }) {
  return (
    <Paper p="lg" radius="lg">
      <Stack gap={4}>
        <Group justify="space-between" mb="xs">
          <Title order={2} fz={16} ff="text" fw={600}>Follow-ups de hoje</Title>
          <Anchor component={Link} href="/funil" fz="sm" fw={600} c="gold.6">Ver funil</Anchor>
        </Group>
        {businesses.map((business) => (
          <Group key={business.id} justify="space-between" py="sm" wrap="nowrap" style={{ borderTop: '1px solid var(--mantine-color-ink-1)' }}>
            <Stack gap={2}>
              <Text fz="sm" fw={600}>{business.name}</Text>
              <Text fz="sm" c="ink.5">{business.followUp}</Text>
            </Stack>
            <WhatsAppButton business={business} />
          </Group>
        ))}
      </Stack>
    </Paper>
  );
}
