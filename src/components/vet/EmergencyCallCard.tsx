import { StyleSheet, View, type ViewStyle } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText, Button, Icon, type ButtonVariant } from '../ui';

export type EmergencyCallCardVariant =
  /** Rojo con botón blanco (Design System). */
  | 'danger'
  /** Negro con botón verde (Contacto con veterinario). */
  | 'dark'
  /** Negro con borde y botón rojos (evaluador, urgencia alta). */
  | 'darkDanger';

export type EmergencyCallCardProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onCall?: () => void;
  variant?: EmergencyCallCardVariant;
};

const variants: Record<EmergencyCallCardVariant, { container: ViewStyle; button: ButtonVariant }> = {
  danger: { container: { backgroundColor: colors.error }, button: 'inverse' },
  dark: { container: { backgroundColor: colors.dark }, button: 'primary' },
  darkDanger: {
    container: { backgroundColor: colors.dark, borderWidth: 1.5, borderColor: colors.error },
    button: 'danger',
  },
};

/** Tarjeta de llamada de emergencia ("Línea de emergencias veterinarias · Disponible 24/7"). */
export function EmergencyCallCard({
  title,
  subtitle,
  actionLabel = 'Llamar',
  onCall,
  variant = 'danger',
}: EmergencyCallCardProps) {
  const style = variants[variant];

  return (
    <View style={[styles.container, style.container]}>
      <Icon name="call" size={20} color={colors.white} />
      <View style={styles.texts}>
        <AppText variant="bodySmall" weight="bold" color={colors.white}>
          {title}
        </AppText>
        {subtitle && (
          <AppText variant="caption" color="rgba(255, 255, 255, 0.75)">
            {subtitle}
          </AppText>
        )}
      </View>
      <Button
        title={actionLabel}
        size="sm"
        variant={style.button}
        onPress={onCall}
        accessibilityLabel={`${actionLabel}: ${title}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.md,
  },
  texts: { flex: 1, gap: 2 },
});
