import { useState } from 'react';

import {
  ActionCard,
  ArticleRow,
  AudioGuidePlayer,
  Card,
  FeaturedArticleCard,
  ImagePlaceholder,
  ListGroup,
  NotificationPreview,
  RangeHighlight,
  ReminderCard,
  SearchBar,
} from '../../components';
import { colors } from '../../theme';
import { CatalogSection, Demo } from '../CatalogSection';

export function ContentSection() {
  const [query, setQuery] = useState('');
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0.35);
  const [reminderActive, setReminderActive] = useState(false);

  return (
    <CatalogSection title="Contenido y guías">
      <Demo name="Búsqueda">
        <SearchBar value={query} onChangeText={setQuery} placeholder="Buscar registros..." onFilterPress={() => {}} />
      </Demo>

      <Demo name="Acciones">
        <ActionCard icon="warning" title="Evaluador" subtitle="Revisar síntomas" onPress={() => {}} />
        <ActionCard
          variant="primary"
          icon="calendar"
          title="Calendario"
          subtitle="Vacunas y citas"
          onPress={() => {}}
        />
      </Demo>

      <Demo name="Destacado">
        <FeaturedArticleCard
          badgeLabel="Esencial"
          title="Primeros auxilios"
          meta="12 min lectura"
          onPress={() => {}}
        />
      </Demo>

      <Demo name="Artículos">
        <ListGroup>
          <ArticleRow title="Deshidratación" meta="Salud · 5 min" onPress={() => {}} />
          <ArticleRow title="Temperatura" meta="Guía · 3 min" icon="thermometer-outline" iconBackground={colors.errorSoft} onPress={() => {}} />
          <ArticleRow title="Plantas tóxicas" meta="Prevención · 7 min" onPress={() => {}} />
        </ListGroup>
      </Demo>

      <Demo name="Audio">
        <AudioGuidePlayer
          progress={progress}
          isPlaying={playing}
          onPlayPause={() => setPlaying((p) => !p)}
          onRewind={() => setProgress((p) => Math.max(0, p - 0.1))}
          onForward={() => setProgress((p) => Math.min(1, p + 0.1))}
          onPrevious={() => setProgress(0)}
          onNext={() => setProgress(1)}
        />
      </Demo>

      <Demo name="Rango">
        <RangeHighlight value="38°C – 39°C" caption="Temperatura normal · Perros adultos" />
      </Demo>

      <Demo name="Recordatorio">
        <ReminderCard
          title="Revisar a Luna"
          active={reminderActive}
          onActivate={() => setReminderActive(true)}
        />
      </Demo>

      <Demo name="Aviso">
        <Card>
          <NotificationPreview
            title="Revisión de Luna"
            body="Seguimiento pendiente"
            time="10:20 PM"
          />
        </Card>
      </Demo>

      <Demo name="Imágenes">
        <ImagePlaceholder label="Imagen / Mapa" />
        <ImagePlaceholder label="Clínicas cercanas" icon="map-outline" height={100} />
      </Demo>
    </CatalogSection>
  );
}
