import { Paper, Progress, Stack, Group, Text } from '@mantine/core';

interface QuotaCardProps {
  used: number;
  limit: number;
}

export function QuotaCard({ used, limit }: QuotaCardProps) {
  return (
    <Paper p="sm" radius="md">
      <Stack gap={8}>
        <Group justify="space-between">
          <Text fz="xs" fw={600}>Cota do Google</Text>
          <Text fz="xs" c="ink.5">este mês</Text>
        </Group>
        <Progress value={(used / limit) * 100} color="gold.5" size="sm" radius="xl" aria-label="Uso da cota do Google" />
        <Text fz="xs" c="ink.5">
          {used.toLocaleString('pt-BR')} de {limit.toLocaleString('pt-BR')} requisições grátis
        </Text>
      </Stack>
    </Paper>
  );
}
