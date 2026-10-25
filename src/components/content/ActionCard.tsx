import { cloneElement, type ReactElement } from 'react';
import { Platform, Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText, GlassSurface, Icon, renderIconSlot, type IconSlot } from '../ui';

export type ActionCardProps = {
  title: string;
  subtitle?: string;
  icon?: IconSlot;
  onPress?: () => void;
  variant?: 'dark' | 'primary';
};

export function ActionCard({ title, subtitle, icon, onPress, variant = 'dark' }: ActionCardProps) {
  const dark = variant === 'dark';
  const textColor = dark ? colors.white : colors.text;
  const iconColor = dark ? colors.white : colors.primary;
  const renderedIcon = typeof icon === 'string'
    ? renderIconSlot(icon, 22, iconColor)
    : icon && cloneElement(icon as ReactElement<{ color?: string; size?: number }>, { color: iconColor, size: 22 });

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole="button"
      accessibilityLabel={subtitle ? `${title}. ${subtitle}` : title}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <GlassSurface tone={dark ? 'dark' : 'light'} style={[styles.container, dark && styles.hero, dark && heroGradient]}>
        {dark && <View pointerEvents="none" style={styles.halo} />}
        {icon && <View style={[styles.iconBox, !dark && styles.lightIconBox]}>{renderedIcon}</View>}
        <View style={styles.texts}>
          <AppText variant="body" weight="semibold" color={textColor}>
            {title}
          </AppText>
          {subtitle && (
            <AppText variant="caption" color={dark ? '#D2E5D9' : colors.textSecondary}>
              {subtitle}
            </AppText>
          )}
        </View>
        <View style={[styles.arrow, !dark && styles.lightArrow]}>
          <Icon name="arrow-forward" size={18} color={iconColor} />
        </View>
      </GlassSurface>
    </Pressable>
  );
}

const heroGradient: ViewStyle = Platform.OS === 'web'
  ? { backgroundImage: 'linear-gradient(120deg, #173F34 0%, #326E55 100%)' } as ViewStyle
  : { experimental_backgroundImage: 'linear-gradient(120deg, #173F34 0%, #326E55 100%)' };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.xl,
    borderRadius: radius.lg,
    minHeight: 94,
    overflow: 'hidden',
  },
  hero: { minHeight: 116, borderColor: 'rgba(255, 255, 255, 0.15)', boxShadow: '0 12px 26px rgba(24, 63, 53, 0.15)' },
  halo: { position: 'absolute', width: 150, height: 150, right: -30, top: -66, borderRadius: 75, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.09)', backgroundColor: 'rgba(255, 255, 255, 0.035)' },
  pressed: { opacity: 0.94, transform: [{ scale: 0.99 }] },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightIconBox: { backgroundColor: '#EAF3ED', borderColor: colors.glassBorder },
  texts: { flex: 1, gap: 5 },
  arrow: { width: 30, height: 30, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.08)' },
  lightArrow: { backgroundColor: '#EFF5F1' },
});
