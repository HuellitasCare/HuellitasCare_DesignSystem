import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText, Icon, ProgressBar, type IconName } from '../ui';

export type AudioGuidePlayerProps = {
  title?: string;
  subtitle?: string;
  /** Avance de la reproducción, entre 0 y 1. */
  progress: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious?: () => void;
  onRewind?: () => void;
  onForward?: () => void;
  onNext?: () => void;
};

/**
 * Controles de la guía en audio de los artículos. Solo es la interfaz:
 * la reproducción la maneja la pantalla (ej. con expo-audio).
 */
export function AudioGuidePlayer({
  title = 'Escuchar esta guía',
  subtitle = 'Pulsa los botones para controlar la reproducción',
  progress,
  isPlaying,
  onPlayPause,
  onPrevious,
  onRewind,
  onForward,
  onNext,
}: AudioGuidePlayerProps) {
  const controls: { icon: IconName; label: string; onPress?: () => void; main?: boolean }[] = [
    { icon: 'play-skip-back', label: 'Anterior', onPress: onPrevious },
    { icon: 'play-back', label: 'Retroceder', onPress: onRewind },
    { icon: isPlaying ? 'pause' : 'play', label: isPlaying ? 'Pausar' : 'Reproducir', onPress: onPlayPause, main: true },
    { icon: 'play-forward', label: 'Adelantar', onPress: onForward },
    { icon: 'play-skip-forward', label: 'Siguiente', onPress: onNext },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="headset-outline" size={16} color={colors.primary} />
        <AppText variant="bodySmall" weight="bold" color={colors.primary}>
          {title}
        </AppText>
      </View>
      <AppText variant="caption" color={colors.textSecondary}>
        {subtitle}
      </AppText>
      <ProgressBar progress={progress} height={6} accessibilityLabel="Progreso del audio" />
      <View style={styles.controls}>
        {controls.map((control) => (
          <Pressable
            key={control.label}
            onPress={control.onPress}
            disabled={!control.onPress}
            accessibilityRole="button"
            accessibilityLabel={control.label}
            hitSlop={6}
            style={({ pressed }) => [styles.control, pressed && styles.pressed, !control.onPress && styles.disabled]}
          >
            <Icon name={control.icon} size={control.main ? 30 : 22} color={colors.text} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs + 2 },
  controls: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: spacing.lg },
  control: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.6 },
  disabled: { opacity: 0.4 },
});
