import type { ReactNode } from 'react';
import { Group, Stack, Text, Title } from '@mantine/core';

interface PageHeaderProps {
  title: string;
  description: string;
  actions?: ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <Group justify="space-between" align="flex-end" gap="md">
      <Stack gap={4}>
        <Title order={1} fz={30}>{title}</Title>
        <Text c="ink.5" fz="md">{description}</Text>
      </Stack>
      {actions}
    </Group>
  );
}
