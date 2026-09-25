import type { ReactNode } from 'react';
import { Box, Stack } from '@mantine/core';

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <Box px={{ base: 'md', md: 40 }} py={{ base: 'md', md: 32 }} maw={1400}>
      <Stack gap="lg">{children}</Stack>
    </Box>
  );
}
