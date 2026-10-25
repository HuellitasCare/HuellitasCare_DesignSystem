import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText, BrandMark } from '../components';
import { BrowserPolish } from '../design/BrowserPolish';
import { screenBackground } from '../design/screen';
import { colors, spacing } from '../theme';
import { SECTIONS } from './Catalog';

export function Showcase() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
      <BrowserPolish />
      <View style={styles.column}>
        <View style={styles.intro}>
          <View style={styles.brand}>
            <View style={styles.mark}><BrandMark size={35} /></View>
            <AppText variant="label" color={colors.primary}>HUELLITAS CARE</AppText>
          </View>
          <AppText variant="h1" accessibilityRole="header">Design System Glass</AppText>
          <AppText color={colors.textSecondary}>
            Componentes para el cuidado animal.
          </AppText>
        </View>
        {SECTIONS.map(({ key, Component }) => <Component key={key} />)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, ...screenBackground },
  pageContent: { alignItems: 'center', padding: spacing.lg, paddingVertical: spacing.xxxl },
  column: { width: '100%', maxWidth: 680, gap: spacing.xxxl + spacing.xl },
  intro: { gap: spacing.md, paddingVertical: spacing.xl },
  brand: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  mark: { width: 50, height: 50, borderRadius: 18, backgroundColor: colors.primarySoft,
    justifyContent: 'center', alignItems: 'center' },
});
