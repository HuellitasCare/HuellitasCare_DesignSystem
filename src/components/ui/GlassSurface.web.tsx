import { useSyncExternalStore } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { colors, radius, shadows } from '../../theme';
import type { GlassSurfaceProps } from './GlassSurface.types';

export type { GlassSurfaceProps } from './GlassSurface.types';

type WebGlassStyle = ViewStyle & { backdropFilter?: string; WebkitBackdropFilter?: string };

function subscribeToTransparency(onChange: () => void) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const query = window.matchMedia('(prefers-reduced-transparency: reduce)');
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function getTransparencyPreference() {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-transparency: reduce)').matches;
}

export function GlassSurface({ tone = 'light', elevated = true, interactive: _interactive, style, ...props }: GlassSurfaceProps) {
  const reduced = useSyncExternalStore(subscribeToTransparency, getTransparencyPreference, () => true);
  const frosted: WebGlassStyle = reduced ? {} : {
    backdropFilter: 'blur(24px) saturate(150%)',
    WebkitBackdropFilter: 'blur(24px) saturate(150%)',
  };
  const backgroundColor = tone === 'dark'
    ? reduced ? colors.dark : 'rgba(24, 63, 53, 0.92)'
    : tone === 'soft'
      ? reduced ? '#EAF4EE' : colors.glassSoft
      : reduced ? '#FBFDFC' : colors.glass;

  return (
    <View
      style={[styles.base, frosted, elevated && shadows.soft, { backgroundColor }, tone === 'dark' && styles.darkBorder, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: radius.lg, borderWidth: 1, borderColor: colors.glassBorder },
  darkBorder: { borderColor: 'rgba(255, 255, 255, 0.18)' },
});
