import { Group, Paper, Progress, Stack, Text, Title } from '@mantine/core';

interface QuotaPanelProps {
  used: number;
  limit: number;
  collected: number;
  renewsOn: string;
  dailyCap: number;
}

export function QuotaPanel({ used, limit, collected, renewsOn, dailyCap }: QuotaPanelProps) {
  const rows = [
    ['Empresas coletadas', `≈ ${collected.toLocaleString('pt-BR')}`],
    ['Renova em', renewsOn],
    ['Trava diária no Google Cloud', `${dailyCap} req/dia`],
  ];
  return (
    <Paper p="lg" radius="lg">
      <Stack gap="md">
        <Title order={2} fz={16} ff="text" fw={600}>Cota grátis do Google</Title>
        <Group gap={6} align="baseline">
          <Text ff="heading" fz={40} fw={700} lh={1}>{used}</Text>
          <Text c="ink.5">de {limit.toLocaleString('pt-BR')} requisições</Text>
        </Group>
        <Progress value={(used / limit) * 100} color="gold.5" size="md" radius="xl" aria-label="Uso da cota" />
        <Stack gap={8}>
          {rows.map(([label, value]) => (
            <Group key={label} justify="space-between">
              <Text fz="sm" c="ink.5">{label}</Text>
              <Text fz="sm" fw={600}>{value}</Text>
            </Group>
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
}
