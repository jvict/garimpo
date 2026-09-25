import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './globals.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Bricolage_Grotesque, Geist } from 'next/font/google';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '@garimpo/ui';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-bricolage' });

export const metadata: Metadata = {
  title: 'Garimpo',
  description: 'Encontre empresas sem site na sua cidade e ofereça seus serviços.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${bricolage.variable}`} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript forceColorScheme="light" />
      </head>
      <body>
        <MantineProvider theme={theme} forceColorScheme="light">
          <Notifications position="top-right" />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
