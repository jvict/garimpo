import { BusinessesExplorer } from '@/features/businesses/businesses-explorer';
import { PageContainer } from '@/features/layout/page-container';
import { PageHeader } from '@/features/layout/page-header';
import { businesses } from '@/mocks/data';

export const metadata = { title: 'Empresas · Garimpo' };

export default function BusinessesPage() {
  return (
    <PageContainer>
      <PageHeader title="Empresas" description="Todas as empresas encontradas nas suas buscas." />
      <BusinessesExplorer title="Todas as empresas" subtitle={`${businesses.length} empresas em Uberlândia, MG`} businesses={businesses} />
    </PageContainer>
  );
}
