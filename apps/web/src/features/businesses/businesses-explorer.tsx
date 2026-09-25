'use client';

import { useMemo, useState } from 'react';
import { Badge, Button, Group, Pagination, Paper, Stack, Tabs, Text, TextInput, Title } from '@mantine/core';
import { IconDownload, IconSearch } from '@tabler/icons-react';
import { WebsiteStatus } from '@garimpo/domain';
import { WEBSITE_STATUS_STYLE } from '@garimpo/ui';
import { BusinessDrawer } from './business-drawer';
import { BusinessTable } from './business-table';
import type { BusinessView } from './types';

const ALL = 'todas';

interface BusinessesExplorerProps {
  title: string;
  subtitle: string;
  businesses: BusinessView[];
}

/** Lista de empresas com filtro por situação do site, busca por nome e painel de detalhe. */
export function BusinessesExplorer({ title, subtitle, businesses }: BusinessesExplorerProps) {
  const [statusFilter, setStatusFilter] = useState<string>(ALL);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<BusinessView | null>(null);

  const counts = useMemo(() => {
    const byStatus = new Map<string, number>([[ALL, businesses.length]]);
    for (const business of businesses) {
      byStatus.set(business.websiteStatus, (byStatus.get(business.websiteStatus) ?? 0) + 1);
    }
    return byStatus;
  }, [businesses]);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return businesses
      .filter((business) => statusFilter === ALL || business.websiteStatus === statusFilter)
      .filter((business) => !term || `${business.name} ${business.neighborhood}`.toLowerCase().includes(term))
      .sort((a, b) => b.score - a.score);
  }, [businesses, statusFilter, query]);

  const tabs = [
    { value: ALL, label: 'Todas' },
    ...Object.values(WebsiteStatus).map((status) => ({ value: status, label: WEBSITE_STATUS_STYLE[status].label })),
  ];

  return (
    <Paper radius="lg" style={{ overflow: 'hidden' }}>
      <Stack gap={0}>
        <Group justify="space-between" align="flex-start" px="lg" pt="lg" pb="sm" gap="md">
          <Stack gap={4}>
            <Title order={2} fz={20}>{title}</Title>
            <Text fz="sm" c="ink.5">{subtitle}</Text>
          </Stack>
          <Group gap={8}>
            <TextInput
              aria-label="Filtrar por nome ou bairro"
              placeholder="Filtrar por nome ou bairro"
              leftSection={<IconSearch size={16} />}
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              w={260}
            />
            <Button variant="default" leftSection={<IconDownload size={16} />}>Exportar CSV</Button>
          </Group>
        </Group>

        <Tabs value={statusFilter} onChange={(value) => setStatusFilter(value ?? ALL)} variant="pills" px="md" pb="sm">
          <Tabs.List>
            {tabs.map((tab) => (
              <Tabs.Tab
                key={tab.value}
                value={tab.value}
                rightSection={<Badge size="sm" variant="light" color="ink">{counts.get(tab.value) ?? 0}</Badge>}
              >
                {tab.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>

        <BusinessTable businesses={visible} onSelect={setSelected} />

        <Group justify="space-between" px="lg" py="sm" style={{ borderTop: '1px solid var(--mantine-color-ink-1)' }}>
          <Text fz="sm" c="ink.5">Mostrando {visible.length} de {businesses.length} · ordenado por score</Text>
          <Pagination total={1} size="sm" />
        </Group>
      </Stack>

      <BusinessDrawer business={selected} onClose={() => setSelected(null)} />
    </Paper>
  );
}
