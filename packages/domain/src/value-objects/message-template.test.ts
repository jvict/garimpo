import { describe, expect, it } from 'vitest';
import { MessageTemplate } from './message-template';

describe('MessageTemplate', () => {
  const template = new MessageTemplate('Oi! Vi que a {nome} tem {avaliacoes} avaliações em {cidade}. {nome}!');

  it('lista as variáveis sem repetir', () => {
    expect(template.variables).toEqual(['nome', 'avaliacoes', 'cidade']);
  });

  it('substitui as variáveis conhecidas e mantém as desconhecidas', () => {
    expect(template.render({ nome: 'Contábil Horizonte', avaliacoes: 126 })).toBe(
      'Oi! Vi que a Contábil Horizonte tem 126 avaliações em {cidade}. Contábil Horizonte!',
    );
  });
});
