'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, NavLink, Stack, Text } from '@mantine/core';
import {
  IconBuildingSkyscraper,
  IconLayoutDashboard,
  IconLayoutKanban,
  IconMessageCircle,
  IconSearch,
  IconSettings,
} from '@tabler/icons-react';
import { Logo } from './logo';
import { QuotaCard } from './quota-card';
import classes from './app-sidebar.module.css';

const MAIN_LINKS = [
  { href: '/visao-geral', label: 'Visão geral', icon: IconLayoutDashboard },
  { href: '/buscas', label: 'Buscas', icon: IconSearch },
  { href: '/empresas', label: 'Empresas', icon: IconBuildingSkyscraper },
  { href: '/funil', label: 'Funil', icon: IconLayoutKanban },
];

const TOOL_LINKS = [
  { href: '/modelos', label: 'Modelos de mensagem', icon: IconMessageCircle },
  { href: '/configuracoes', label: 'Configurações', icon: IconSettings },
];

interface AppSidebarProps {
  quota: { used: number; limit: number };
  onNavigate?: () => void;
}

export function AppSidebar({ quota, onNavigate }: AppSidebarProps) {
  const pathname = usePathname();

  const renderLink = ({ href, label, icon: Icon }: (typeof MAIN_LINKS)[number]) => (
    <NavLink
      key={href}
      component={Link}
      href={href}
      label={label}
      leftSection={<Icon size={18} stroke={1.8} />}
      active={pathname.startsWith(href)}
      onClick={onNavigate}
      className={classes.link}
    />
  );

  return (
    <Stack h="100%" gap={4} p="md" pt={20}>
      <Box px={10} pb={18}>
        <Logo />
      </Box>
      {MAIN_LINKS.map(renderLink)}
      <Text className={classes.section}>Ferramentas</Text>
      {TOOL_LINKS.map(renderLink)}
      <Box mt="auto">
        <QuotaCard used={quota.used} limit={quota.limit} />
      </Box>
    </Stack>
  );
}
