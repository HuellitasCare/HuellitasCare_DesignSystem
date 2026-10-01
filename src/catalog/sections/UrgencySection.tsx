import { useState } from 'react';

import {
  SeverityLevelGrid,
  SymptomCategoryAccordion,
  UrgencyResultCard,
  UrgencyScale,
} from '../../components';
import { CatalogSection, Demo } from '../CatalogSection';

const CATEGORIES = [
  {
    key: 'digestivo',
    title: 'Digestivo',
    icon: '🍽',
    options: [
      { label: 'Vómito', value: 'vomito' },
      { label: 'Diarrea', value: 'diarrea' },
      { label: 'No come', value: 'no-come' },
      { label: 'Abdomen hinchado', value: 'abdomen' },
    ],
  },
  {
    key: 'respiratorio',
    title: 'Respiratorio',
    icon: '🫁',
    options: [
      { label: 'Tos persistente', value: 'tos' },
      { label: 'Dificultad para respirar', value: 'respirar' },
      { label: 'Jadeo excesivo', value: 'jadeo' },
    ],
  },
  {
    key: 'otros',
    title: 'Otros',
    icon: '⚠️',
    options: [
      { label: 'Temperatura alta', value: 'temperatura' },
      { label: 'Convulsiones', value: 'convulsiones' },
      { label: 'Pérdida de consciencia', value: 'consciencia' },
      { label: 'Sangrado', value: 'sangrado' },
    ],
  },
];

export function UrgencySection() {
  const [expanded, setExpanded] = useState<string | null>('digestivo');
  const [selected, setSelected] = useState<string[]>(['vomito', 'no-come']);

  return (
    <CatalogSection title="Evaluador de urgencia">
      <Demo name="SymptomCategoryAccordion">
        {CATEGORIES.map((category) => (
          <SymptomCategoryAccordion
            key={category.key}
            title={category.title}
            icon={category.icon}
            options={category.options}
            value={selected}
            onChange={setSelected}
            expanded={expanded === category.key}
            onToggle={() => setExpanded((current) => (current === category.key ? null : category.key))}
          />
        ))}
      </Demo>

      <Demo name="UrgencyResultCard">
        <UrgencyResultCard level="moderada" description="Consulta veterinaria en las próximas 24 horas" />
        <UrgencyResultCard level="alta" description="Requiere atención veterinaria inmediata" />
      </Demo>

      <Demo name="UrgencyScale">
        <UrgencyScale current="moderada" />
      </Demo>

      <Demo name="SeverityLevelGrid">
        <SeverityLevelGrid
          items={[
            { level: 'baja', title: 'Leve', description: 'Piel regresa en 1–2 seg, encías normales' },
            { level: 'moderada', title: 'Moderada', description: 'Piel tarda 2–3 seg, encías pegajosas' },
            { level: 'alta', title: 'Severa', description: 'Piel no regresa · Vet inmediato' },
          ]}
        />
      </Demo>
    </CatalogSection>
  );
}
