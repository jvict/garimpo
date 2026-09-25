'use client';

import { Anchor, Table, Text } from '@mantine/core';
import { LeadStageBadge, WebsiteStatusBadge } from '@garimpo/ui';
import { WhatsAppButton } from '@/features/whatsapp/whatsapp-button';
import { hasWhatsApp } from '@/features/whatsapp/whatsapp-link';
import { ScoreBar } from './score-bar';
import type { BusinessView } from './types';

interface BusinessTableProps {
  businesses: BusinessView[];
  onSelect: (business: BusinessView) => void;
}

export function BusinessTable({ businesses, onSelect }: BusinessTableProps) {
  return (
    <Table.ScrollContainer minWidth={960}>
      <Table verticalSpacing="sm" horizontalSpacing="md" highlightOnHover>
        <Table.Thead bg="#FAFAF8">
          <Table.Tr>
            <Table.Th>Empresa</Table.Th>
            <Table.Th>Telefone</Table.Th>
            <Table.Th>Situação do site</Table.Th>
            <Table.Th>Google</Table.Th>
            <Table.Th>Score</Table.Th>
            <Table.Th>Etapa</Table.Th>
            <Table.Th ta="right">Contato</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {businesses.map((business) => (
            <Table.Tr key={business.id} onClick={() => onSelect(business)} style={{ cursor: 'pointer' }}>
              <Table.Td>
                <Anchor
                  component="button"
                  type="button"
                  fw={600}
                  c="ink.8"
                  ta="left"
                  onClick={(event) => {
                    event.stopPropagation();
                    onSelect(business);
                  }}
                >
                  {business.name}
                </Anchor>
                <Text fz="sm" c="ink.5">{business.neighborhood}</Text>
              </Table.Td>
              <Table.Td>
                <Text fz="sm" style={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{business.phone}</Text>
                <Text fz="xs" c="ink.5">{hasWhatsApp(business) ? 'Celular (WhatsApp)' : 'Fixo'}</Text>
              </Table.Td>
              <Table.Td>
                <WebsiteStatusBadge status={business.websiteStatus} />
                <Text fz="xs" c="ink.5" mt={4}>{business.websiteNote}</Text>
              </Table.Td>
              <Table.Td style={{ whiteSpace: 'nowrap' }}>
                <Text fz="sm" span c="gold.6">★</Text>{' '}
                <Text fz="sm" span>{business.rating.toLocaleString('pt-BR')}</Text>{' '}
                <Text fz="sm" span c="ink.5">({business.reviews})</Text>
              </Table.Td>
              <Table.Td><ScoreBar score={business.score} /></Table.Td>
              <Table.Td miw={120}><LeadStageBadge stage={business.stage} /></Table.Td>
              <Table.Td ta="right"><WhatsAppButton business={business} /></Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
