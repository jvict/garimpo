import { BusinessesExplorer } from '@/features/businesses/businesses-explorer';
import { PageContainer } from '@/features/layout/page-container';
import { PageHeader } from '@/features/layout/page-header';
import { SearchForm } from '@/features/search/search-form';
import { googleQuota, latestSearch, segmentSuggestions } from '@/mocks/data';

export const metadata = { title: 'Buscas · Garimpo' };

export default function SearchesPage() {
  return (
    <PageContainer>
      <PageHeader title="Buscas" description="Encontre empresas por cidade e ramo e veja quem ainda não tem site." />
      <SearchForm suggestions={segmentSuggestions} remainingRequests={googleQuota.limit - googleQuota.used} />
      <BusinessesExplorer
        title={`${latestSearch.segment} em ${latestSearch.city}`}
        subtitle={`${latestSearch.total} empresas encontradas · sites verificados · concluída ${latestSearch.finishedAgo}`}
        businesses={latestSearch.results}
      />
    </PageContainer>
  );
}
