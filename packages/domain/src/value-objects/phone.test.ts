import { describe, expect, it } from 'vitest';
import { Phone } from './phone';

describe('Phone', () => {
  it.each(['(34) 99812-4410', '+55 34 99812-4410', '034998124410', '5534998124410'])('normaliza %s', (raw) => {
    expect(Phone.create(raw)?.digits).toBe('34998124410');
  });

  it('rejeita números inválidos', () => {
    expect(Phone.create('12345')).toBeNull();
    expect(Phone.create('')).toBeNull();
  });

  it('identifica celular e fixo', () => {
    expect(Phone.create('(34) 99812-4410')?.isMobile).toBe(true);
    expect(Phone.create('(34) 3214-5580')?.isMobile).toBe(false);
  });

  it('formata para exibição e para o WhatsApp', () => {
    const phone = Phone.create('34998124410');
    expect(phone?.format()).toBe('(34) 99812-4410');
    expect(phone?.toWhatsAppNumber()).toBe('5534998124410');
    expect(Phone.create('3432145580')?.format()).toBe('(34) 3214-5580');
  });
});
