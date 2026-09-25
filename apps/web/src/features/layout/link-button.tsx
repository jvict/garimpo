'use client';

import Link from 'next/link';
import { Button, type ButtonProps } from '@mantine/core';

/** Botão Mantine que navega com o Link do Next — utilizável em Server Components. */
export function LinkButton({ href, ...props }: ButtonProps & { href: string }) {
  return <Button component={Link} href={href} {...props} />;
}
