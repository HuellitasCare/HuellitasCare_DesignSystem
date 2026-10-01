import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText } from '../ui';

export type RangeHighlightProps = {
  /** Ej. "38°C – 39°C". */
  value: string;
  /** Ej. "Temperatura normal · Perros adultos". */
  caption?: string;
};

/** Valor de referencia destacado en verde dentro de un artículo. */
export function RangeHighlight({ value, caption }: RangeHighlightProps) {
  return (
    <View style={styles.container} accessible accessibilityLabel={caption ? `${value}. ${caption}` : value}>
      <AppText variant="h2" weight="bold" color={colors.primary} align="center">
        {value}
      </AppText>
      {caption && (
        <AppText variant="caption" color={colors.primary} align="center">
          {caption}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
});
