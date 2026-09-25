'use client';

import type { ReactNode } from 'react';
import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AppSidebar } from './app-sidebar';
import { Logo } from './logo';

interface AppLayoutProps {
  children: ReactNode;
  quota: { used: number; limit: number };
}

export function AppLayout({ children, quota }: AppLayoutProps) {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 56, sm: 0 } }}
      navbar={{ width: 248, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      styles={{
        header: { background: '#F7F7F5' },
        navbar: { background: '#F7F7F5', borderColor: 'var(--mantine-color-ink-2)' },
        main: { background: '#F7F7F5' },
      }}
    >
      <AppShell.Header hiddenFrom="sm" px="md">
        <Group h="100%" justify="space-between">
          <Logo />
          <Burger opened={opened} onClick={toggle} size="sm" aria-label="Abrir menu" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <AppSidebar quota={quota} onNavigate={close} />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
