const VARIABLE = /\{(\w+)\}/g;

/** Modelo de mensagem com variáveis no formato {nome}, {cidade}... */
export class MessageTemplate {
  constructor(readonly body: string) {}

  get variables(): string[] {
    return [...new Set(Array.from(this.body.matchAll(VARIABLE), (match) => match[1] ?? ''))];
  }

  /** Substitui as variáveis conhecidas; as desconhecidas ficam como estão. */
  render(values: Record<string, string | number>): string {
    return this.body.replace(VARIABLE, (placeholder, key: string) =>
      key in values ? String(values[key]) : placeholder,
    );
  }
}
