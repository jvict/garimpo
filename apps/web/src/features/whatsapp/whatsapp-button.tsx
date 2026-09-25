'use client';

import { Button, Text, type ButtonProps } from '@mantine/core';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import type { BusinessView } from '@/features/businesses/types';
import { whatsAppLinkFor } from './whatsapp-link';

interface WhatsAppButtonProps extends ButtonProps {
  business: BusinessView;
}

/** Abre o WhatsApp Web/app com a mensagem padrão já preenchida. */
export function WhatsAppButton({ business, ...props }: WhatsAppButtonProps) {
  const href = whatsAppLinkFor(business);
  if (!href) return <Text fz="sm" c="ink.5">Só telefone fixo</Text>;

  return (
    <Button
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      size="xs"
      variant="light"
      color="whatsapp"
      leftSection={<IconBrandWhatsapp size={16} />}
      onClick={(event) => event.stopPropagation()}
      {...props}
    >
      WhatsApp
    </Button>
  );
}
