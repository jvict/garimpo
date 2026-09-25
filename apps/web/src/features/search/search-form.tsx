'use client';

import { useState } from 'react';
import { Button, Chip, Group, Paper, Select, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconSearch } from '@tabler/icons-react';

interface SearchFormProps {
  suggestions: string[];
  remainingRequests: number;
}

const AREAS = [
  { value: 'grade', label: 'Cidade inteira (grade)' },
  { value: 'bairros', label: 'Bairros selecionados' },
  { value: 'raio', label: 'Raio a partir de um ponto' },
];

export function SearchForm({ suggestions, remainingRequests }: SearchFormProps) {
  const [city, setCity] = useState('Uberlândia, MG');
  const [segment, setSegment] = useState('Contabilidade');
  const [area, setArea] = useState<string | null>('grade');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    // Próximo passo: chamar a Server Action que executa StartSearchUseCase.
    notifications.show({
      title: 'Busca iniciada',
      message: `${segment} em ${city}. Os resultados aparecem abaixo conforme chegam.`,
      color: 'green',
    });
  };

  return (
    <Paper component="form" onSubmit={submit} p="lg" radius="lg">
      <Stack gap="md">
        <SimpleGrid cols={{ base: 1, md: 4 }} spacing="md" style={{ alignItems: 'end' }}>
          <TextInput label="Cidade" value={city} onChange={(event) => setCity(event.currentTarget.value)} required />
          <TextInput label="Ramo" value={segment} onChange={(event) => setSegment(event.currentTarget.value)} required />
          <Select label="Área de busca" data={AREAS} value={area} onChange={setArea} allowDeselect={false} />
          <Button type="submit" leftSection={<IconSearch size={16} />}>Buscar empresas</Button>
        </SimpleGrid>
        <Group justify="space-between" gap="sm">
          <Group gap={8}>
            <Text fz="xs" c="ink.5">Sugestões:</Text>
            <Chip.Group>
              {suggestions.map((suggestion) => (
                <Chip key={suggestion} size="xs" variant="outline" checked={segment === suggestion} onChange={() => setSegment(suggestion)}>
                  {suggestion}
                </Chip>
              ))}
            </Chip.Group>
          </Group>
          <Text fz="xs" c="ink.5">
            Estimativa: até 24 requisições · restam {remainingRequests.toLocaleString('pt-BR')} grátis este mês
          </Text>
        </Group>
      </Stack>
    </Paper>
  );
}
