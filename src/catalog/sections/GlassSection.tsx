import { useWindowDimensions, StyleSheet, View } from 'react-native';

import { AppText, BrandMark, GlassSurface } from '../../components';
import { CareHero } from '../../design/CareHero';
import { WelcomeHero } from '../../design/WelcomeHero';
import { colors, spacing } from '../../theme';
import { CatalogSection, Demo } from '../CatalogSection';

export function GlassSection() {
  const { width } = useWindowDimensions();

  return (
    <CatalogSection title="Identidad Glass">
      <Demo name="Marca">
        <GlassSurface style={styles.brand}>
          <View style={styles.mark}><BrandMark size={34} /></View>
          <View style={styles.brandCopy}>
            <AppText variant="h3">Huellitas Care</AppText>
            <AppText variant="caption" color={colors.textSecondary}>Cuidado cercano</AppText>
          </View>
        </GlassSurface>
      </Demo>

      <Demo name="Superficies">
        <View style={styles.surfaces}>
          <GlassSurface style={styles.surface}>
            <AppText variant="label">Cristal claro</AppText>
            <AppText variant="caption" color={colors.textSecondary}>Tarjetas</AppText>
          </GlassSurface>
          <GlassSurface tone="soft" style={styles.surface}>
            <AppText variant="label">Cristal suave</AppText>
            <AppText variant="caption" color={colors.textSecondary}>Acentos</AppText>
          </GlassSurface>
          <GlassSurface tone="dark" style={styles.surface}>
            <AppText variant="label" color={colors.white}>Cristal oscuro</AppText>
            <AppText variant="caption" color="#D5E7DD">Acciones</AppText>
          </GlassSurface>
        </View>
      </Demo>

      <Demo name="Inicio">
        <CareHero onPress={() => {}} />
      </Demo>

      <Demo name="Acceso">
        <WelcomeHero expanded={false} compact={width < 360} />
      </Demo>
    </CatalogSection>
  );
}

const styles = StyleSheet.create({
  brand: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg },
  mark: { width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 18,
    backgroundColor: colors.primarySoft },
  brandCopy: { flex: 1, gap: 2 },
  surfaces: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  surface: { flexGrow: 1, flexBasis: 160, minHeight: 104, padding: spacing.lg, gap: spacing.xs,
    justifyContent: 'center' },
});
