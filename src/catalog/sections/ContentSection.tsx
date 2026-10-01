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
import { CatalogSection, Demo } from '../CatalogSection';

export function ContentSection() {
  const [query, setQuery] = useState('');
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0.35);
  const [reminderActive, setReminderActive] = useState(false);

  return (
    <CatalogSection title="Contenido y guías">
      <Demo name="SearchBar">
        <SearchBar value={query} onChangeText={setQuery} placeholder="Buscar registros..." onFilterPress={() => {}} />
      </Demo>

      <Demo name="ActionCard">
        <ActionCard icon="⚠️" title="Título de acción principal" subtitle="Subtítulo descriptivo de la acción" onPress={() => {}} />
        <ActionCard
          variant="primary"
          icon="📅"
          title="Calendario de salud"
          subtitle="Ver vacunas y citas pendientes"
          onPress={() => {}}
        />
      </Demo>

      <Demo name="FeaturedArticleCard">
        <FeaturedArticleCard
          badgeLabel="Esencial"
          title="Manual de primeros auxilios para mascotas"
          meta="12 min lectura"
          onPress={() => {}}
        />
      </Demo>

      <Demo name="ArticleRow">
        <ListGroup>
          <ArticleRow title="Señales de deshidratación" meta="Salud · 5 min" onPress={() => {}} />
          <ArticleRow title="Cómo medir temperatura" meta="Primeros auxilios · 3 min" icon="🌡️" iconBackground="#FDECEA" onPress={() => {}} />
          <ArticleRow title="Plantas tóxicas para mascotas" meta="Prevención · 7 min" onPress={() => {}} />
        </ListGroup>
      </Demo>

      <Demo name="AudioGuidePlayer">
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

      <Demo name="RangeHighlight">
        <RangeHighlight value="38°C – 39°C" caption="Temperatura normal · Perros adultos" />
      </Demo>

      <Demo name="ReminderCard">
        <ReminderCard
          title="Revisar a Luna a las 10:30 PM"
          active={reminderActive}
          onActivate={() => setReminderActive(true)}
        />
      </Demo>

      <Demo name="NotificationPreview">
        <Card>
          <NotificationPreview
            title="Revisión pendiente — Luna"
            body="¡Tu mascota necesita seguimiento! Es importante monitorear la evolución de Luna"
            time="10:20 PM"
          />
        </Card>
      </Demo>

      <Demo name="ImagePlaceholder">
        <ImagePlaceholder label="Imagen / Mapa" />
        <ImagePlaceholder label="Clínicas cercanas" icon="map-outline" height={100} />
      </Demo>
    </CatalogSection>
  );
}
