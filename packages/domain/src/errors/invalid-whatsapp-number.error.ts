export class InvalidWhatsAppNumberError extends Error {
  constructor(readonly phone: string) {
    super(`O telefone "${phone}" não parece ser um celular com WhatsApp.`);
    this.name = 'InvalidWhatsAppNumberError';
  }
}
