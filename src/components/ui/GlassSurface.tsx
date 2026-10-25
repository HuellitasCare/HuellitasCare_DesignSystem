import { GlassView, isGlassEffectAPIAvailable, isLiquidGlassAvailable } from 'expo-glass-effect';
import { useEffect, useState } from 'react';
import { AccessibilityInfo, Platform, StyleSheet, View } from 'react-native';

import { colors, radius, shadows } from '../../theme';
import type { GlassSurfaceProps } from './GlassSurface.types';

export type { GlassSurfaceProps } from './GlassSurface.types';

export function GlassSurface({ tone = 'light', elevated = true, interactive = false, style, ...props }: GlassSurfaceProps) {
  const [reduceTransparency, setReduceTransparency] = useState(true);

  useEffect(() => {
    if (Platform.OS !== 'ios') return;
    let active = true;
    const listener = AccessibilityInfo.addEventListener('reduceTransparencyChanged', setReduceTransparency);
    void AccessibilityInfo.isReduceTransparencyEnabled().then((value) => {
      if (active) setReduceTransparency(value);
    }).catch(() => {});
    return () => {
      active = false;
      listener.remove();
    };
  }, []);

  const canUseGlass = Platform.OS === 'ios'
    && !reduceTransparency
    && isLiquidGlassAvailable()
    && isGlassEffectAPIAvailable();
  const surfaceStyle = [styles.base, elevated && shadows.soft, tone === 'dark' && styles.darkBorder, style];

  if (canUseGlass) {
    return (
      <GlassView
        glassEffectStyle="regular"
        colorScheme={tone === 'dark' ? 'dark' : 'light'}
        tintColor={tone === 'dark' ? 'rgba(24, 63, 53, 0.8)' : tone === 'soft' ? 'rgba(225, 240, 232, 0.35)' : 'rgba(255, 255, 255, 0.28)'}
        isInteractive={interactive}
        style={surfaceStyle}
        {...props}
      />
    );
  }

  return <View style={[surfaceStyle, styles[tone], style]} {...props} />;
}

const styles = StyleSheet.create({
  base: { borderRadius: radius.lg, borderWidth: 1, borderColor: colors.glassBorder, borderCurve: 'continuous' },
  light: { backgroundColor: '#FBFDFC' },
  soft: { backgroundColor: '#EAF4EE' },
  dark: { backgroundColor: colors.dark },
  darkBorder: { borderColor: 'rgba(255, 255, 255, 0.18)' },
});
