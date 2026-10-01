import { StyleSheet, View } from 'react-native';

import { AppText } from '../../components';
import { colors, radius, spacing, type TypographyVariant } from '../../theme';
import { CatalogSection, Demo } from '../CatalogSection';

const swatches: { name: keyof typeof colors; label: string; dark?: boolean }[] = [
  { name: 'primary', label: 'Primary' },
  { name: 'primaryLight', label: 'Primary Light' },
  { name: 'secondary', label: 'Secondary' },
  { name: 'secondaryLight', label: 'Secondary Light', dark: true },
  { name: 'error', label: 'Error' },
  { name: 'warning', label: 'Warning' },
  { name: 'success', label: 'Success' },
  { name: 'background', label: 'Background', dark: true },
  { name: 'surface', label: 'Surface', dark: true },
  { name: 'text', label: 'Text' },
  { name: 'textSecondary', label: 'Text Sec' },
  { name: 'muted', label: 'Muted' },
];

const typeSamples: { variant: TypographyVariant; label: string }[] = [
  { variant: 'h1', label: 'H1 Bold — 28px' },
  { variant: 'h2', label: 'H2 SemiBold — 22px' },
  { variant: 'h3', label: 'H3 SemiBold — 18px' },
  { variant: 'body', label: 'Body Regular — 16px' },
  { variant: 'bodySmall', label: 'Body Small — 14px' },
  { variant: 'caption', label: 'Caption Regular — 13px' },
  { variant: 'label', label: 'Label SemiBold — 13px' },
  { variant: 'button', label: 'Button Medium — 16px' },
  { variant: 'sectionLabel', label: 'Section label — 11px' },
];

export function FoundationsSection() {
  return (
    <CatalogSection title="Fundamentos">
      <Demo name="colors">
        <View style={styles.grid}>
          {swatches.map((swatch) => (
            <View
              key={swatch.name}
              style={[styles.swatch, { backgroundColor: colors[swatch.name] }, swatch.dark && styles.swatchBorder]}
            >
              <AppText variant="caption" weight="bold" color={swatch.dark ? colors.text : colors.white} align="center">
                {swatch.label}
              </AppText>
              <AppText variant="caption" color={swatch.dark ? colors.text : colors.white} align="center">
                {colors[swatch.name]}
              </AppText>
            </View>
          ))}
        </View>
      </Demo>
      <Demo name="typography">
        {typeSamples.map((sample) => (
          <AppText
            key={sample.variant}
            variant={sample.variant}
            color={
              sample.variant === 'caption'
                ? colors.textSecondary
                : sample.variant === 'button'
                  ? colors.primary
                  : sample.variant === 'sectionLabel'
                    ? colors.muted
                    : colors.text
            }
          >
            {sample.label}
          </AppText>
        ))}
        <AppText variant="caption" color={colors.muted}>
          Fuente: Inter · tamaños del frame “Tipografía” del Design System · radios: {radius.md}px botones,{' '}
          {radius.lg}px cards
        </AppText>
      </Demo>
    </CatalogSection>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  swatch: {
    width: '31%',
    flexGrow: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.md,
    gap: 2,
  },
  swatchBorder: { borderWidth: 1, borderColor: colors.border },
});
