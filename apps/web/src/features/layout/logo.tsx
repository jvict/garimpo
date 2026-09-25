import { Group, Text, ThemeIcon } from '@mantine/core';
import { IconDiamond } from '@tabler/icons-react';

export function Logo({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const box = size === 'lg' ? 36 : 32;
  return (
    <Group gap={10}>
      <ThemeIcon size={box} radius="md" color="ink.8">
        <IconDiamond size={box * 0.56} color="#FBBF24" stroke={2} />
      </ThemeIcon>
      <Text ff="heading" fw={700} fz={size === 'lg' ? 22 : 20} lts="-0.02em">
        Garimpo
      </Text>
    </Group>
  );
}
