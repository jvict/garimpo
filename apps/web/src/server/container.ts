import 'server-only';
import { WebsiteClassifier } from '@garimpo/domain';
import { HttpWebsiteInspector } from '@garimpo/infrastructure';

/**
 * Composition root: o único lugar que conhece as implementações concretas.
 * Casos de uso recebem aqui suas dependências (injeção manual).
 */
export const container = {
  websiteClassifier: new WebsiteClassifier(),
  websiteInspector: new HttpWebsiteInspector({ timeoutMs: 8000 }),
};
