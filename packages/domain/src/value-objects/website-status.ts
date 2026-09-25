export const WebsiteStatus = {
  NoWebsite: 'sem_site',
  SocialOnly: 'so_rede_social',
  Broken: 'quebrado',
  Poor: 'ruim',
  Ok: 'ok',
} as const;

export type WebsiteStatus = (typeof WebsiteStatus)[keyof typeof WebsiteStatus];
