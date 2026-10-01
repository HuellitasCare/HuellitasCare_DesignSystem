import { StyleSheet, View, type ViewStyle } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'error';
export type BadgeVariant = 'soft' | 'solid' | 'outline';

export type BadgeProps = {
  label: string;
  tone?: BadgeTone;
  variant?: BadgeVariant;
  /** Ej. "LEVE", "ESENCIAL", "ACTIVA". */
  uppercase?: boolean;
  rightIcon?: IconName;
  style?: ViewStyle;
};

const tonePalette: Record<BadgeTone, { main: string; soft: string; softText: string }> = {
  neutral: { main: colors.textSecondary, soft: '#EEEEEE', softText: colors.textSecondary },
  success: { main: colors.primary, soft: colors.primarySoft, softText: colors.primary },
  warning: { main: colors.secondary, soft: colors.secondarySoft, softText: colors.secondary },
  error: { main: colors.error, soft: colors.errorSoft, softText: colors.error },
};

export function Badge({
  label,
  tone = 'neutral',
  variant = 'soft',
  uppercase = false,
  rightIcon,
  style,
}: BadgeProps) {
  const palette = tonePalette[tone];
  const textColor =
    variant === 'solid' ? colors.white : variant === 'outline' ? palette.main : palette.softText;

  return (
    <View
      style={[
        styles.base,
        variant === 'soft' && { backgroundColor: palette.soft },
        variant === 'solid' && { backgroundColor: palette.main },
        variant === 'outline' && { borderWidth: 1, borderColor: palette.main },
        style,
      ]}
    >
      <AppText
        variant="label"
        color={textColor}
        style={[styles.text, uppercase && styles.uppercase]}
      >
        {label}
      </AppText>
      {rightIcon && <Icon name={rightIcon} size={12} color={textColor} />}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xxs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  text: { fontSize: 11, lineHeight: 14 },
  uppercase: { textTransform: 'uppercase', letterSpacing: 0.4 },
});
