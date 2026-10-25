import { useState } from 'react';

import {
  Badge,
  ChecklistItem,
  KeyValueList,
  ListGroup,
  ListRow,
  NumberedSteps,
  StatRow,
  StepList,
  TipList,
} from '../../components';
import { colors } from '../../theme';
import { CatalogSection, Demo } from '../CatalogSection';

export function ListsSection() {
  const [checks, setChecks] = useState({ ambiente: true, agua: true, comida: false, temperatura: false });

  const toggle = (key: keyof typeof checks) => (value: boolean) => setChecks((c) => ({ ...c, [key]: value }));

  return (
    <CatalogSection title="Listas">
      <Demo name="Filas">
        <ListGroup>
          <ListRow icon="time" title="Avisos" subtitle="Pendientes" badge={{ label: 'Hoy' }} onPress={() => {}} />
          <ListRow icon="document-attach" title="Historial" subtitle="Nuevo registro" badge={{ label: 'Nuevo', tone: 'success' }} onPress={() => {}} />
          <ListRow icon="pulse" title="Alertas" subtitle="3 activas" badge={{ label: '3', tone: 'error' }} onPress={() => {}} />
        </ListGroup>
        <ListGroup>
          <ListRow
            icon="call"
            title="Veterinario"
            subtitle="Abierto · 0.8 km"
            tone="danger"
            badge={{ label: 'Ir ahora', tone: 'error', variant: 'solid' }}
            onPress={() => {}}
          />
          <ListRow
            icon="eye"
            iconBackground={colors.primarySoft}
            title="Guía en casa"
            subtitle="Seguimiento activo"
            badge={{ label: 'Activo', tone: 'success', variant: 'solid' }}
            onPress={() => {}}
          />
          <ListRow
            icon="eye"
            title="Observación"
            subtitle="4–6 h"
            badge={<Badge label="Recomendado" tone="success" />}
            onPress={() => {}}
          />
          <ListRow icon="water-outline" iconBackground={colors.primarySoft} title="Hidratación" subtitle="Agua cada 15 min" />
        </ListGroup>
      </Demo>

      <Demo name="Datos">
        <KeyValueList
          items={[
            { label: 'Especie', value: 'Perro' },
            { label: 'Raza', value: 'Golden Retriever' },
            { label: 'Edad', value: '3 años' },
            { label: 'Peso', value: '28 kg' },
            { label: 'Urgencia', value: <Badge label="Moderada" tone="warning" variant="solid" /> },
          ]}
        />
      </Demo>

      <Demo name="Indicadores">
        <StatRow
          items={[
            { value: 2, label: 'Alertas', color: colors.error },
            { value: 1, label: 'Próxima cita', color: colors.secondary },
            { value: 3, label: 'Al día', color: colors.primary },
          ]}
        />
      </Demo>

      <Demo name="Pasos">
        <StepList
          steps={[
            { label: 'Paso completado', status: 'completed' },
            { label: 'Paso activo actual', status: 'active' },
            { label: 'Paso pendiente', status: 'pending' },
          ]}
        />
      </Demo>

      <Demo name="Instrucciones">
        <NumberedSteps
          steps={[
            { title: 'Prepara el termómetro digital', description: 'Usa un termómetro rectal digital. Límpialo con alcohol.' },
            { title: 'Coloca a tu mascota en posición cómoda', description: 'Pide a alguien que la sostenga con calma.' },
            { title: 'Introduce el termómetro', description: 'Introduce suavemente 2–3 cm. Sostén hasta escuchar el pitido.' },
          ]}
        />
      </Demo>

      <Demo name="Checklist">
        <ListGroup>
          <ChecklistItem
            title="Ambiente tranquilo preparado"
            subtitle="Luna está en un lugar sin ruido ni estrés"
            checked={checks.ambiente}
            onToggle={toggle('ambiente')}
          />
          <ChecklistItem
            title="Agua fresca y accesible"
            subtitle="Coloca agua limpia a su alcance"
            checked={checks.agua}
            onToggle={toggle('agua')}
          />
          <ChecklistItem
            title="Sin comida sólida por 2+ horas"
            subtitle="Su sistema digestivo necesita descansar"
            checked={checks.comida}
            onToggle={toggle('comida')}
          />
          <ChecklistItem
            title="Temperatura verificada"
            subtitle="Normal en perros: 38–39°C"
            checked={checks.temperatura}
            onToggle={toggle('temperatura')}
            accessory={<Badge label="¿Cómo?" tone="success" rightIcon="arrow-forward" />}
          />
        </ListGroup>
      </Demo>

      <Demo name="Consejos">
        <TipList
          variant="avoid"
          title="Evita hacer esto"
          items={[
            'Dar medicamentos humanos (ibuprofeno, paracetamol)',
            'Forzarle agua o comida si no quiere',
            'Dejarla sin supervisión las próximas 2 horas',
          ]}
        />
        <TipList
          variant="help"
          title="Esto puede mejorar su estado"
          items={[
            'Ofrece agua tibia en pequeñas cantidades cada 30 min',
            'Mantén el ambiente silencioso y sin estímulos',
            'Acaríciala suavemente si se deja',
          ]}
        />
        <TipList
          variant="warning"
          title="Ve al veterinario DE INMEDIATO si..."
          items={[
            'Más de 3 vómitos en 1 hora',
            'Sangre en el vómito o en las heces',
            'No puede ponerse de pie o está muy débil',
            'Dificultad para respirar',
          ]}
        />
      </Demo>
    </CatalogSection>
  );
}
