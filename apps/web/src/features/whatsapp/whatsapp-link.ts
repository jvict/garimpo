import { GenerateWhatsAppLinkUseCase } from '@garimpo/application';
import { Phone, WebsiteStatus } from '@garimpo/domain';
import { messageTemplates } from '@/mocks/data';
import type { BusinessView } from '@/features/businesses/types';

const generateLink = new GenerateWhatsAppLinkUseCase();

export function hasWhatsApp(business: BusinessView): boolean {
  return Phone.create(business.phone)?.isMobile ?? false;
}

export function defaultTemplateFor(business: BusinessView) {
  const id = business.websiteStatus === WebsiteStatus.SocialOnly ? 'rede-social' : 'sem-site';
  return messageTemplates.find((template) => template.id === id) ?? messageTemplates[0]!;
}

export function templateVariables(business: BusinessView) {
  return {
    nome: business.name,
    ramo: business.segment.toLowerCase(),
    cidade: business.city,
    nota: business.rating.toLocaleString('pt-BR'),
    avaliacoes: business.reviews,
  };
}

/** Link wa.me com a mensagem pronta, ou null quando o telefone não é celular. */
export function whatsAppLinkFor(business: BusinessView, templateBody?: string): string | null {
  if (!hasWhatsApp(business)) return null;
  return generateLink.execute({
    phone: business.phone,
    template: templateBody ?? defaultTemplateFor(business).body,
    variables: templateVariables(business),
  }).url;
}
