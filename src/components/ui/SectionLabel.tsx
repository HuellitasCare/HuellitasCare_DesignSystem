import { StyleSheet } from 'react-native';

import { colors, spacing } from '../../theme';
import { AppText } from './AppText';

export type SectionLabelProps = {
  children: string;
};

/** Encabezado de sección en mayúsculas, ej. "MIS MASCOTAS", "ACCESO RÁPIDO". */
export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <AppText variant="sectionLabel" color={colors.muted} accessibilityRole="header" style={styles.label}>
      {children}
    </AppText>
  );
}

const styles = StyleSheet.create({
  label: { marginBottom: spacing.sm },
});
