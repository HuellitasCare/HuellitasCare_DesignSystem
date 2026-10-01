import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../theme';
import { AppText } from './AppText';

export type DividerProps = {
  /** Texto centrado, ej. "o continúa con". Sin texto se dibuja una línea simple. */
  label?: string;
};

export function Divider({ label }: DividerProps) {
  if (!label) return <View style={styles.line} />;

  return (
    <View style={styles.row}>
      <View style={[styles.line, styles.flex]} />
      <AppText variant="caption" color={colors.muted}>
        {label}
      </AppText>
      <View style={[styles.line, styles.flex]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  line: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  flex: { flex: 1 },
});
