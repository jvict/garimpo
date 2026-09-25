import { Group, Paper, Progress, Stack, Text, Title } from '@mantine/core';

interface BarListCardProps {
  title: string;
  caption?: string;
  items: { label: string; value: number }[];
  max: number;
  color: string;
  format?: (value: number) => string;
  labelWidth?: number;
}

export function BarListCard({ title, caption, items, max, color, format = String, labelWidth = 96 }: BarListCardProps) {
  return (
    <Paper p="lg" radius="lg">
      <Stack gap="sm">
        <Group justify="space-between" align="baseline">
          <Title order={2} fz={16} ff="text" fw={600}>{title}</Title>
          {caption && <Text fz="xs" c="ink.5">{caption}</Text>}
        </Group>
        {items.map((item) => (
          <Group key={item.label} gap="sm" wrap="nowrap">
            <Text fz="sm" w={labelWidth}>{item.label}</Text>
            <Progress value={Math.max(2, (item.value / max) * 100)} color={color} size="md" radius="xl" style={{ flexGrow: 1 }} aria-label={item.label} />
            <Text fz="sm" fw={600} w={44} ta="right" style={{ fontVariantNumeric: 'tabular-nums' }}>{format(item.value)}</Text>
          </Group>
        ))}
      </Stack>
    </Paper>
  );
}
