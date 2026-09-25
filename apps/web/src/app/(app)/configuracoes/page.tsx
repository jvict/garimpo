import { Paper, Text } from '@mantine/core';
import { PageContainer } from '@/features/layout/page-container';
import { PageHeader } from '@/features/layout/page-header';

export const metadata = { title: 'Configurações · Garimpo' };

export default function Page() {
  return (
    <PageContainer>
      <PageHeader title="Configurações" description="Chave do Google, limites de uso e preferências da conta." />
      <Paper p="xl" radius="lg">
        <Text c="ink.5">Em breve.</Text>
      </Paper>
    </PageContainer>
  );
}
