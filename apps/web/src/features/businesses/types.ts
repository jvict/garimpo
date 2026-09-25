import type { LeadStage, WebsiteStatus } from '@garimpo/domain';

/** Como a UI enxerga uma empresa. Hoje vem dos mocks; depois, dos casos de uso. */
export interface BusinessView {
  id: string;
  name: string;
  segment: string;
  neighborhood: string;
  city: string;
  address: string;
  phone: string;
  email: string | null;
  instagram: string | null;
  websiteStatus: WebsiteStatus;
  websiteNote: string;
  rating: number;
  reviews: number;
  score: number;
  scoreReasons: string[];
  stage: LeadStage;
  followUp: string | null;
  lastActivity: string;
  history: { text: string; when: string }[];
}
