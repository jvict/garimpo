import type { WebsiteInspection } from '@garimpo/domain';

/** Port: acessa um site e devolve dados técnicos para classificação. */
export interface WebsiteInspector {
  inspect(url: string): Promise<WebsiteInspection>;
}
