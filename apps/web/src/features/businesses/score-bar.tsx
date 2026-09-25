import { Group, Progress, Text } from '@mantine/core';

export function ScoreBar({ score }: { score: number }) {
  const color = score >= 80 ? 'gold.5' : score >= 50 ? 'gold.4' : 'ink.3';
  return (
    <Group gap={8} wrap="nowrap">
      <Text fw={600} fz="sm" w={22} style={{ fontVariantNumeric: 'tabular-nums' }}>{score}</Text>
      <Progress value={score} color={color} size="sm" radius="xl" w={56} aria-label={`Score ${score}`} />
    </Group>
  );
}
