'use client';

import { useMemo, useState } from 'react';
import {
  Anchor, Box, Button, CopyButton, Drawer, Group, Paper, Select, SegmentedControl,
  SimpleGrid, Stack, Text, TextInput, Textarea, Timeline, Title,
} from '@mantine/core';
import { IconBrandWhatsapp, IconCheck, IconCopy } from '@tabler/icons-react';
import { LeadStage, MessageTemplate } from '@garimpo/domain';
import { LEAD_STAGE_STYLE, LeadStageBadge, WebsiteStatusBadge } from '@garimpo/ui';
import { messageTemplates } from '@/mocks/data';
import { defaultTemplateFor, templateVariables, whatsAppLinkFor } from '@/features/whatsapp/whatsapp-link';
import type { BusinessView } from './types';

interface BusinessDrawerProps {
  business: BusinessView | null;
  onClose: () => void;
}

export function BusinessDrawer({ business, onClose }: BusinessDrawerProps) {
  return (
    <Drawer
      opened={business !== null}
      onClose={onClose}
      position="right"
      size={580}
      padding="xl"
      title={business && <BusinessBadges business={business} />}
      overlayProps={{ backgroundOpacity: 0.28, color: '#1C1B19' }}
    >
      {business && <BusinessDetails key={business.id} business={business} />}
    </Drawer>
  );
}

function BusinessBadges({ business }: { business: BusinessView }) {
  return (
    <Group gap={8}>
      <WebsiteStatusBadge status={business.websiteStatus} />
      <LeadStageBadge stage={business.stage} />
    </Group>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <Text component="h3" m={0} fz={12} fw={600} tt="uppercase" lts="0.06em" c="ink.5">
      {children}
    </Text>
  );
}

function BusinessDetails({ business }: { business: BusinessView }) {
  const [templateId, setTemplateId] = useState(defaultTemplateFor(business).id);
  const template = messageTemplates.find((item) => item.id === templateId) ?? messageTemplates[0]!;
  const [message, setMessage] = useState(() => new MessageTemplate(template.body).render(templateVariables(business)));
  const [stage, setStage] = useState<string>(business.stage);

  const whatsAppHref = useMemo(() => whatsAppLinkFor(business, message), [business, message]);

  const changeTemplate = (id: string | null) => {
    const next = messageTemplates.find((item) => item.id === id);
    if (!next) return;
    setTemplateId(next.id);
    setMessage(new MessageTemplate(next.body).render(templateVariables(business)));
  };

  return (
    <Stack gap="xl">
      <Stack gap={8}>
        <Title order={2} fz={28}>{business.name}</Title>
        <Text c="ink.5" fz="sm">
          {business.segment} · {business.neighborhood}, {business.city} ·{' '}
          <Text span c="gold.6">★</Text> {business.rating.toLocaleString('pt-BR')} ({business.reviews} avaliações)
        </Text>
        <Anchor href="#" fz="sm" fw={600} c="gold.6">Abrir no Google Maps</Anchor>
      </Stack>

      <Paper p="md" radius="lg" bg="gold.0" style={{ borderColor: 'var(--mantine-color-gold-2)' }}>
        <Group gap="xl" wrap="nowrap">
          <Stack gap={4} align="center" miw={84}>
            <Text ff="heading" fz={44} fw={700} lh={1} c="gold.7">{business.score}</Text>
            <Text fz="xs" fw={600} c="gold.7">{business.score >= 80 ? 'Lead quente' : business.score >= 50 ? 'Lead morno' : 'Lead frio'}</Text>
          </Stack>
          <Stack gap={8}>
            {business.scoreReasons.map((reason) => (
              <Group key={reason} gap={8} wrap="nowrap">
                <IconCheck size={16} color="var(--mantine-color-gold-6)" stroke={2.2} />
                <Text fz="sm">{reason}</Text>
              </Group>
            ))}
          </Stack>
        </Group>
      </Paper>

      <Stack gap="sm">
        <SectionTitle>Contato</SectionTitle>
        <SimpleGrid cols={2} spacing="lg" verticalSpacing="md">
          <Info label="Telefone" value={business.phone} strong />
          <Info label="Endereço" value={business.address} />
          <Info label="E-mail" value={business.email} />
          <Info label="Instagram" value={business.instagram} />
        </SimpleGrid>
      </Stack>

      <Stack gap="sm">
        <Group justify="space-between">
          <SectionTitle>Mensagem de WhatsApp</SectionTitle>
          <Select
            aria-label="Modelo de mensagem"
            size="xs"
            w={240}
            value={templateId}
            onChange={changeTemplate}
            data={messageTemplates.map((item) => ({ value: item.id, label: item.name }))}
            allowDeselect={false}
          />
        </Group>
        <Textarea
          aria-label="Mensagem"
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
          autosize
          minRows={5}
        />
        <Group gap={8}>
          <Button
            component="a"
            href={whatsAppHref ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            color="whatsapp"
            leftSection={<IconBrandWhatsapp size={18} />}
            disabled={!whatsAppHref}
            style={{ flexGrow: 1 }}
          >
            {whatsAppHref ? 'Abrir no WhatsApp' : 'Telefone fixo: sem WhatsApp'}
          </Button>
          <CopyButton value={message}>
            {({ copied, copy }) => (
              <Button variant="default" onClick={copy} leftSection={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}>
                {copied ? 'Copiado' : 'Copiar texto'}
              </Button>
            )}
          </CopyButton>
        </Group>
        <Text fz="xs" c="ink.5">Ao abrir o WhatsApp, a empresa passa para a etapa Contatado.</Text>
      </Stack>

      <Stack gap="sm">
        <SectionTitle>Etapa do funil</SectionTitle>
        <SegmentedControl
          value={stage}
          onChange={setStage}
          fullWidth
          data={Object.values(LeadStage).map((value) => ({ value, label: LEAD_STAGE_STYLE[value].label }))}
        />
      </Stack>

      <Stack gap="sm">
        <SectionTitle>Histórico</SectionTitle>
        <Timeline bulletSize={10} lineWidth={2} color="ink.3">
          {business.history.map((event) => (
            <Timeline.Item key={event.text} title={<Text fz="sm">{event.text}</Text>}>
              <Text fz="xs" c="ink.5">{event.when}</Text>
            </Timeline.Item>
          ))}
        </Timeline>
        <TextInput aria-label="Adicionar nota" placeholder="Adicionar uma nota…" />
      </Stack>
    </Stack>
  );
}

function Info({ label, value, strong }: { label: string; value: string | null; strong?: boolean }) {
  return (
    <Box>
      <Text fz="xs" c="ink.5">{label}</Text>
      <Text fz="sm" fw={strong ? 600 : 400} c={value ? undefined : 'ink.5'}>{value ?? 'Não encontrado'}</Text>
    </Box>
  );
}
