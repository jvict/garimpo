import { Paper, Text } from '@mantine/core';
import { PageContainer } from '@/features/layout/page-container';
import { PageHeader } from '@/features/layout/page-header';

export const metadata = { title: 'Modelos de mensagem · Garimpo' };

export default function Page() {
  return (
    <PageContainer>
      <PageHeader title="Modelos de mensagem" description="Crie e edite os textos usados na abordagem pelo WhatsApp." />
      <Paper p="xl" radius="lg">
        <Text c="ink.5">Em breve.</Text>
      </Paper>
    </PageContainer>
  );
}
