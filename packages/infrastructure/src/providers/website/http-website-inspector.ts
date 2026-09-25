import type { WebsiteInspector } from '@garimpo/application';
import type { WebsiteInspection } from '@garimpo/domain';

const VIEWPORT_META = /<meta[^>]+name=["']?viewport["']?/i;

interface HttpWebsiteInspectorOptions {
  timeoutMs: number;
}

/** Adapter: implementa WebsiteInspector usando fetch. */
export class HttpWebsiteInspector implements WebsiteInspector {
  constructor(private readonly options: HttpWebsiteInspectorOptions = { timeoutMs: 8000 }) {}

  async inspect(url: string): Promise<WebsiteInspection> {
    const target = /^https?:\/\//i.test(url) ? url : `http://${url}`;

    try {
      const response = await fetch(target, {
        redirect: 'follow',
        signal: AbortSignal.timeout(this.options.timeoutMs),
        headers: { 'user-agent': 'Mozilla/5.0 (compatible; GarimpoBot/1.0)' },
      });
      const html = response.headers.get('content-type')?.includes('text/html') ? await response.text() : '';

      return {
        reachable: true,
        httpStatus: response.status,
        finalUrl: response.url,
        usesHttps: response.url.startsWith('https://'),
        hasViewportMeta: VIEWPORT_META.test(html),
      };
    } catch {
      return { reachable: false, httpStatus: null, finalUrl: null, usesHttps: false, hasViewportMeta: false };
    }
  }
}
