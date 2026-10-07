import { ScrollView, StyleSheet, View } from 'react-native';

import { colors, spacing } from '../theme';
import { SECTIONS } from './Catalog';
import { PlainCatalogContext } from './CatalogSection';

/** Todos los componentes en una sola columna, sin encabezados: es la vista de la página web. */
export function Showcase() {
  return (
    <PlainCatalogContext.Provider value>
      <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
        <View style={styles.column}>
          {SECTIONS.map(({ key, Component }) => (
            <Component key={key} />
          ))}
        </View>
      </ScrollView>
    </PlainCatalogContext.Provider>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  pageContent: { alignItems: 'center', padding: spacing.lg, paddingVertical: spacing.xxxl },
  column: { width: '100%', maxWidth: 440, gap: spacing.xxxl },
});
