import { useRef, useState, type ComponentType } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader, ChipGroup } from '../components';
import { colors, spacing } from '../theme';
import { ContentSection } from './sections/ContentSection';
import { FeedbackSection } from './sections/FeedbackSection';
import { FoundationsSection } from './sections/FoundationsSection';
import { ListsSection } from './sections/ListsSection';
import { NavigationSection } from './sections/NavigationSection';
import { PetsSection } from './sections/PetsSection';
import { SymptomsSection } from './sections/SymptomsSection';
import { UiSection } from './sections/UiSection';
import { UrgencySection } from './sections/UrgencySection';
import { VetSection } from './sections/VetSection';

const SECTIONS: { key: string; label: string; Component: ComponentType }[] = [
  { key: 'fundamentos', label: 'Fundamentos', Component: FoundationsSection },
  { key: 'ui', label: 'Base', Component: UiSection },
  { key: 'feedback', label: 'Feedback', Component: FeedbackSection },
  { key: 'navegacion', label: 'Navegación', Component: NavigationSection },
  { key: 'listas', label: 'Listas', Component: ListsSection },
  { key: 'mascotas', label: 'Mascotas', Component: PetsSection },
  { key: 'urgencia', label: 'Urgencia', Component: UrgencySection },
  { key: 'sintomas', label: 'Síntomas', Component: SymptomsSection },
  { key: 'veterinario', label: 'Veterinario', Component: VetSection },
  { key: 'contenido', label: 'Contenido', Component: ContentSection },
];

const ALL = 'todos';

/** Vitrina de todos los componentes de HuellitasCare agrupados como en el plan. */
export function Catalog() {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [filter, setFilter] = useState<string[]>([ALL]);
  const active = filter[0] ?? ALL;
  const visible = active === ALL ? SECTIONS : SECTIONS.filter((s) => s.key === active);

  return (
    <View style={styles.screen}>
      <AppHeader title="Catálogo de componentes" />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xxxl }]}
        keyboardShouldPersistTaps="handled"
      >
        <ChipGroup
          variant="outlined"
          value={filter}
          onChange={(next) => {
            setFilter(next.length ? next : [ALL]);
            scrollRef.current?.scrollTo({ y: 0, animated: false });
          }}
          options={[{ label: 'Todos', value: ALL }, ...SECTIONS.map((s) => ({ label: s.label, value: s.key }))]}
        />
        {visible.map(({ key, Component }) => (
          <Component key={key} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.xxxl + spacing.sm },
});
