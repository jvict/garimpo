import {
  Anchor, Box, Button, Divider, Group, PasswordInput, SimpleGrid, Stack, Text, TextInput, ThemeIcon, Title,
} from '@mantine/core';
import { IconBrandGoogle, IconBrandWhatsapp, IconSearch, IconWorld } from '@tabler/icons-react';
import { LinkButton } from '@/features/layout/link-button';
import { Logo } from '@/features/layout/logo';

export const metadata = { title: 'Entrar · Garimpo' };

const FEATURES = [
  { icon: IconSearch, title: 'Busque por cidade e ramo', text: 'Contabilidade, advocacia, clínicas, academias e o que mais precisar.' },
  { icon: IconWorld, title: 'Saiba quem precisa de um site', text: 'Sem site, só Instagram, site quebrado ou desatualizado.' },
  { icon: IconBrandWhatsapp, title: 'Aborde pelo WhatsApp', text: 'Mensagem pronta e personalizada, com funil para acompanhar cada contato.' },
];

export default function LoginPage() {
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={0} mih="100vh" bg="white">
      <Stack visibleFrom="md" justify="space-between" bg="#F3F2EE" px={72} py={56}>
        <Logo size="lg" />
        <Stack gap={36}>
          <Title order={1} fz={52} lh={1.05}>Encontre as empresas da sua cidade que ainda não têm site.</Title>
          <Stack gap="lg">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <Group key={title} gap="md" align="flex-start" wrap="nowrap">
                <ThemeIcon size={36} radius="md" variant="default"><Icon size={18} stroke={1.8} /></ThemeIcon>
                <Stack gap={2}>
                  <Text fw={600}>{title}</Text>
                  <Text fz="sm" c="ink.5">{text}</Text>
                </Stack>
              </Group>
            ))}
          </Stack>
        </Stack>
        <Text fz="sm" c="ink.5">Uso pessoal · versão MVP</Text>
      </Stack>

      <Stack justify="center" align="center" p="md">
        <Box component="form" w="100%" maw={380} action="/visao-geral">
          <Stack gap="lg">
            <Box hiddenFrom="md"><Logo /></Box>
            <Stack gap={6}>
              <Title order={2} fz={30}>Entrar</Title>
              <Text c="ink.5">Acesse sua conta para continuar garimpando.</Text>
            </Stack>
            <TextInput label="E-mail" type="email" placeholder="voce@exemplo.com" size="md" />
            <Stack gap={6}>
              <Group justify="space-between">
                <Text component="label" htmlFor="senha" fz="sm" fw={500}>Senha</Text>
                <Anchor href="#" fz="sm" c="gold.6">Esqueci a senha</Anchor>
              </Group>
              <PasswordInput id="senha" size="md" />
            </Stack>
            <Button type="submit" size="md">Entrar</Button>
            <Divider label="ou" labelPosition="center" />
            <LinkButton href="/visao-geral" variant="default" size="md" leftSection={<IconBrandGoogle size={18} />}>
              Continuar com Google
            </LinkButton>
          </Stack>
        </Box>
      </Stack>
    </SimpleGrid>
  );
}
