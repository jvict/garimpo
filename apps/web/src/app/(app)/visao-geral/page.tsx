import { SimpleGrid } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { BarListCard } from '@/features/dashboard/bar-list-card';
import { FollowUpsCard } from '@/features/dashboard/followups-card';
import { KpiCard } from '@/features/dashboard/kpi-card';
import { QuotaPanel } from '@/features/dashboard/quota-panel';
import { LinkButton } from '@/features/layout/link-button';
import { PageContainer } from '@/features/layout/page-container';
import { PageHeader } from '@/features/layout/page-header';
import { businesses, dashboardStats as stats, googleQuota } from '@/mocks/data';

export const metadata = { title: 'Visão geral · Garimpo' };

export default function OverviewPage() {
  const followUps = businesses.filter((business) => business.followUp);
  const replyRate = Math.round((stats.replied / stats.contacted) * 100);

  return (
    <PageContainer>
      <PageHeader
        title="Visão geral"
        description={stats.period}
        actions={<LinkButton href="/buscas" leftSection={<IconPlus size={16} />}>Nova busca</LinkButton>}
      />
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        <KpiCard label="Empresas encontradas" value={stats.found} hint={`${stats.searches} buscas este mês`} />
        <KpiCard label="Sem site ou só rede social" value={stats.opportunities} hint={`${Math.round((stats.opportunities / stats.found) * 100)}% das empresas`} highlight />
        <KpiCard label="Abordadas" value={stats.contacted} hint={`${stats.replied} responderam · ${replyRate}%`} />
        <KpiCard label="Sites fechados" value={stats.won} hint="[valor total vendido]" />
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        <FollowUpsCard businesses={followUps} />
        <QuotaPanel {...googleQuota} />
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        <BarListCard title="Funil" items={stats.funnel} max={stats.funnel[0]?.value ?? 1} color="ink.8" />
        <BarListCard
          title="Oportunidade por ramo"
          caption="% sem site ou só rede social"
          items={stats.bySegment}
          max={100}
          color="gold.5"
          format={(value) => `${value}%`}
          labelWidth={130}
        />
      </SimpleGrid>
    </PageContainer>
  );
}
