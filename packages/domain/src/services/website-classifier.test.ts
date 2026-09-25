import { describe, expect, it } from 'vitest';
import { WebsiteClassifier } from './website-classifier';
import { WebsiteStatus } from '../value-objects/website-status';
import type { WebsiteInspection } from '../value-objects/website-inspection';

const healthy: WebsiteInspection = {
  reachable: true,
  httpStatus: 200,
  finalUrl: 'https://exemplo.com.br/',
  usesHttps: true,
  hasViewportMeta: true,
};

describe('WebsiteClassifier', () => {
  const classifier = new WebsiteClassifier();

  it('sem URL → sem_site', () => {
    expect(classifier.classify(null, null)).toBe(WebsiteStatus.NoWebsite);
    expect(classifier.classify('  ', null)).toBe(WebsiteStatus.NoWebsite);
  });

  it.each(['https://instagram.com/escritorio', 'www.facebook.com/clinica', 'linktr.ee/academia'])(
    'rede social (%s) → so_rede_social',
    (url) => {
      expect(classifier.classify(url, null)).toBe(WebsiteStatus.SocialOnly);
    },
  );

  it('site que redireciona para rede social → so_rede_social', () => {
    const inspection = { ...healthy, finalUrl: 'https://www.instagram.com/escritorio/' };
    expect(classifier.classify('https://escritorio.com.br', inspection)).toBe(WebsiteStatus.SocialOnly);
  });

  it('inacessível ou com erro HTTP → quebrado', () => {
    expect(classifier.classify('https://x.com.br', null)).toBe(WebsiteStatus.Broken);
    expect(classifier.classify('https://x.com.br', { ...healthy, reachable: false, httpStatus: null })).toBe(
      WebsiteStatus.Broken,
    );
    expect(classifier.classify('https://x.com.br', { ...healthy, httpStatus: 500 })).toBe(WebsiteStatus.Broken);
  });

  it('sem HTTPS ou sem responsividade → ruim', () => {
    expect(classifier.classify('http://x.com.br', { ...healthy, usesHttps: false })).toBe(WebsiteStatus.Poor);
    expect(classifier.classify('https://x.com.br', { ...healthy, hasViewportMeta: false })).toBe(WebsiteStatus.Poor);
  });

  it('tudo certo → ok', () => {
    expect(classifier.classify('https://exemplo.com.br', healthy)).toBe(WebsiteStatus.Ok);
  });
});
