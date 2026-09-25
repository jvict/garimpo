import { Paper, Stack, Text } from '@mantine/core';

interface KpiCardProps {
  label: string;
  value: string | number;
  hint: string;
  highlight?: boolean;
}

export function KpiCard({ label, value, hint, highlight }: KpiCardProps) {
  return (
    <Paper p="lg" radius="lg">
      <Stack gap={8}>
        <Text fz="sm" fw={500} c="ink.6">{label}</Text>
        <Text ff="heading" fz={36} fw={700} lh={1} lts="-0.02em" c={highlight ? 'gold.6' : undefined}>
          {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
        </Text>
        <Text fz="sm" c="ink.5">{hint}</Text>
      </Stack>
    </Paper>
  );
}
