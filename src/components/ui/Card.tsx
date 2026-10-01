import { StyleSheet, View, type ViewProps } from 'react-native';

import { colors, radius, spacing } from '../../theme';

export type CardProps = ViewProps & {
  /** Padding interno. Usa `0` para listas que dibujan sus propias filas. */
  padding?: number;
};

export function Card({ padding = spacing.lg, style, ...rest }: CardProps) {
  return <View style={[styles.card, { padding }, style]} {...rest} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
});
