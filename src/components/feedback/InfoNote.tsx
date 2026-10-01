import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText, renderIconSlot, type IconSlot } from '../ui';

export type InfoNoteProps = {
  /** Texto o nodo con partes resaltadas (ej. un link "guía de monitoreo"). */
  children: ReactNode;
  icon?: IconSlot;
  /** `neutral`: card blanca. `success`: fondo verde tenue (ej. "guardados en el historial"). */
  tone?: 'neutral' | 'success';
};

/** Nota informativa pequeña dentro de formularios o resúmenes. */
export function InfoNote({ children, icon, tone = 'neutral' }: InfoNoteProps) {
  const isSuccess = tone === 'success';

  return (
    <View style={[styles.container, isSuccess ? styles.success : styles.neutral]}>
      {icon && renderIconSlot(icon, 16)}
      {typeof children === 'string' ? (
        <AppText variant="caption" color={isSuccess ? colors.primary : colors.textSecondary} style={styles.flex}>
          {children}
        </AppText>
      ) : (
        <View style={styles.flex}>{children}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  neutral: { backgroundColor: colors.surface, borderColor: colors.border },
  success: { backgroundColor: colors.primarySoft, borderColor: '#C8E6C9' },
  flex: { flex: 1 },
});
