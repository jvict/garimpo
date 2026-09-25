import { InvalidWhatsAppNumberError, MessageTemplate, Phone } from '@garimpo/domain';

export interface GenerateWhatsAppLinkInput {
  phone: string;
  template: string;
  variables: Record<string, string | number>;
}

export interface GenerateWhatsAppLinkOutput {
  url: string;
  message: string;
}

/** Monta o link wa.me com a mensagem já personalizada para a empresa. */
export class GenerateWhatsAppLinkUseCase {
  execute({ phone, template, variables }: GenerateWhatsAppLinkInput): GenerateWhatsAppLinkOutput {
    const parsed = Phone.create(phone);
    if (!parsed?.isMobile) throw new InvalidWhatsAppNumberError(phone);

    const message = new MessageTemplate(template).render(variables);
    const url = `https://wa.me/${parsed.toWhatsAppNumber()}?text=${encodeURIComponent(message)}`;

    return { url, message };
  }
}
