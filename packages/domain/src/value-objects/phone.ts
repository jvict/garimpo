/** Telefone brasileiro normalizado: DDD + número, só dígitos (10 ou 11). */
export class Phone {
  private constructor(readonly digits: string) {}

  /** Aceita formatos como "(34) 99812-4410", "+55 34 99812-4410" ou "034998124410". */
  static create(raw: string): Phone | null {
    let digits = raw.replace(/\D/g, '');
    if (digits.startsWith('55') && digits.length >= 12) digits = digits.slice(2);
    if (digits.startsWith('0')) digits = digits.slice(1);
    if (digits.length !== 10 && digits.length !== 11) return null;
    return new Phone(digits);
  }

  /** Celular: 11 dígitos com o 9 logo após o DDD. Só celulares costumam ter WhatsApp. */
  get isMobile(): boolean {
    return this.digits.length === 11 && this.digits[2] === '9';
  }

  /** Formato usado pelo wa.me: código do país + DDD + número. */
  toWhatsAppNumber(): string {
    return `55${this.digits}`;
  }

  format(): string {
    const ddd = this.digits.slice(0, 2);
    const number = this.digits.slice(2);
    const split = number.length - 4;
    return `(${ddd}) ${number.slice(0, split)}-${number.slice(split)}`;
  }
}
