import { WebsiteStatus } from '../value-objects/website-status';
import type { WebsiteInspection } from '../value-objects/website-inspection';

const SOCIAL_HOSTS = [
  'instagram.com',
  'facebook.com',
  'fb.com',
  'linktr.ee',
  'wa.me',
  'whatsapp.com',
  'tiktok.com',
  'linkedin.com',
  'youtube.com',
];

// Captura o host de "https://www.site.com/x", "site.com:8080" ou "usuario@site.com".
const HOST_PATTERN = /^(?:[a-z][a-z0-9+.-]*:\/\/)?(?:[^@/?#]*@)?([^/?#:]+)/i;

/** Decide a situação do site de uma empresa — a regra central do Garimpo. */
export class WebsiteClassifier {
  classify(website: string | null, inspection: WebsiteInspection | null): WebsiteStatus {
    if (!website?.trim()) return WebsiteStatus.NoWebsite;
    if (this.isSocialProfile(website)) return WebsiteStatus.SocialOnly;
    if (!inspection) return WebsiteStatus.Broken;

    if (inspection.finalUrl && this.isSocialProfile(inspection.finalUrl)) {
      return WebsiteStatus.SocialOnly;
    }
    if (!inspection.reachable || inspection.httpStatus === null || inspection.httpStatus >= 400) {
      return WebsiteStatus.Broken;
    }
    if (!inspection.usesHttps || !inspection.hasViewportMeta) return WebsiteStatus.Poor;

    return WebsiteStatus.Ok;
  }

  private isSocialProfile(url: string): boolean {
    const host = this.hostOf(url);
    if (!host) return false;
    return SOCIAL_HOSTS.some((social) => host === social || host.endsWith(`.${social}`));
  }

  private hostOf(url: string): string | null {
    const host = HOST_PATTERN.exec(url.trim())?.[1];
    return host ? host.toLowerCase() : null;
  }
}
