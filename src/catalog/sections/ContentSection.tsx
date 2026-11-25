import { useState } from 'react';

import {
  ActionCard,
  ArticleRow,
  AudioGuideDock,
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

const DEMO_CHAPTERS = [
  { title: 'Introducción y señales clave', durationSeconds: 34 },
  { title: 'Qué observar primero', durationSeconds: 42 },
  { title: 'Medidas prácticas en casa', durationSeconds: 48 },
];

export function ContentSection() {
  const [query, setQuery] = useState('');
  const [playing, setPlaying] = useState(false);
  const [chapterIndex, setChapterIndex] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [reminderActive, setReminderActive] = useState(false);

  const progress = (chapterIndex + 0.35) / DEMO_CHAPTERS.length;

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
          chapters={DEMO_CHAPTERS}
          currentIndex={chapterIndex}
          onSelectChapter={setChapterIndex}
          speed={speed}
          onCycleSpeed={() => setSpeed((s) => (s === 1 ? 1.25 : s === 1.25 ? 1.5 : 1))}
          elapsedSeconds={48}
          totalDurationSeconds={124}
          onPlayPause={() => setPlaying((p) => !p)}
          onPrevious={() => setChapterIndex((i) => Math.max(0, i - 1))}
          onNext={() => setChapterIndex((i) => Math.min(DEMO_CHAPTERS.length - 1, i + 1))}
        />
        <AudioGuideDock
          chapterTitle={DEMO_CHAPTERS[chapterIndex].title}
          partLabel={`Parte ${chapterIndex + 1}/${DEMO_CHAPTERS.length} · 0:48`}
          isPlaying={playing}
          canPrevious={chapterIndex > 0}
          canNext={chapterIndex < DEMO_CHAPTERS.length - 1}
          onPlayPause={() => setPlaying((p) => !p)}
          onPrevious={() => setChapterIndex((i) => Math.max(0, i - 1))}
          onNext={() => setChapterIndex((i) => Math.min(DEMO_CHAPTERS.length - 1, i + 1))}
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
