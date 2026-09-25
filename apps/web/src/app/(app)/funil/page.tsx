import { Badge, Button, Group, Select } from '@mantine/core';
import { FunnelBoard } from '@/features/funnel/funnel-board';
import { PageContainer } from '@/features/layout/page-container';
import { PageHeader } from '@/features/layout/page-header';
import { businesses, funnelTotals } from '@/mocks/data';

export const metadata = { title: 'Funil · Garimpo' };

export default function FunnelPage() {
  const followUps = businesses.filter((business) => business.followUp).length;

  return (
    <PageContainer>
      <PageHeader
        title="Funil"
        description="Acompanhe cada empresa desde o primeiro contato até o site fechado."
        actions={
          <Group gap={8}>
            <Select aria-label="Ramo" data={['Todos os ramos']} defaultValue="Todos os ramos" w={170} />
            <Select aria-label="Cidade" data={['Uberlândia, MG']} defaultValue="Uberlândia, MG" w={170} />
            <Button variant="light" color="gold" rightSection={<Badge size="sm" color="gold">{followUps}</Badge>}>
              Follow-ups de hoje
            </Button>
            <Button variant="default">Ver perdidos ({funnelTotals.perdido})</Button>
          </Group>
        }
      />
      <FunnelBoard businesses={businesses} totals={funnelTotals} />
    </PageContainer>
  );
}
