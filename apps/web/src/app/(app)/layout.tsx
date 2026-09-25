import type { ReactNode } from 'react';
import { AppLayout } from '@/features/layout/app-layout';
import { googleQuota } from '@/mocks/data';

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return <AppLayout quota={{ used: googleQuota.used, limit: googleQuota.limit }}>{children}</AppLayout>;
}
