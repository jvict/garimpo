import { describe, expect, it } from 'vitest';
import { InvalidWhatsAppNumberError } from '@garimpo/domain';
import { GenerateWhatsAppLinkUseCase } from './generate-whatsapp-link.use-case';

describe('GenerateWhatsAppLinkUseCase', () => {
  const useCase = new GenerateWhatsAppLinkUseCase();

  it('gera o link wa.me com a mensagem personalizada', () => {
    const result = useCase.execute({
      phone: '(34) 99812-4410',
      template: 'Olá, {nome}!',
      variables: { nome: 'Contábil Horizonte' },
    });

    expect(result.message).toBe('Olá, Contábil Horizonte!');
    expect(result.url).toBe('https://wa.me/5534998124410?text=Ol%C3%A1%2C%20Cont%C3%A1bil%20Horizonte!');
  });

  it('recusa telefone fixo', () => {
    expect(() => useCase.execute({ phone: '(34) 3214-5580', template: 'Oi', variables: {} })).toThrow(
      InvalidWhatsAppNumberError,
    );
  });
});
