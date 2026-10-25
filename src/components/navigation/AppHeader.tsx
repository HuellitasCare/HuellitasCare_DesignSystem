import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '../../theme';
import { AppText, IconButton } from '../ui';
import { BrandMark } from '../ui/BrandMark';
import { GlassSurface } from '../ui/GlassSurface';

export type AppHeaderProps = {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
  safeAreaTop?: boolean;
};

export function AppHeader({ title, onBack, right, safeAreaTop = true }: AppHeaderProps) {
  const insets = useSafeAreaInsets();
  const isHome = title === 'Huellitas Care';

  return (
    <View style={[styles.wrapper, { paddingTop: (safeAreaTop ? insets.top : 0) + spacing.md }]}>
      <GlassSurface style={styles.container}>
        {onBack ? (
          <IconButton icon="arrow-back" variant="outline" size={40} onPress={onBack}
            accessibilityLabel="Regresar" style={styles.back} />
        ) : (
          <View style={styles.mark}><BrandMark size={29} /></View>
        )}
        <View style={styles.titles}>
          <AppText variant={isHome ? 'h3' : 'body'} weight="semibold" color={colors.text}
            numberOfLines={1} accessibilityRole="header">
            {title}
          </AppText>
          {isHome && <AppText variant="caption" color={colors.textSecondary} style={styles.tagline}>
            Siempre cerca de su bienestar
          </AppText>}
        </View>
        {right}
      </GlassSurface>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 68,
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingVertical: spacing.md,
    borderRadius: 26,
  },
  titles: { flex: 1, gap: 2 },
  mark: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center',
    borderRadius: 16, backgroundColor: colors.primarySoft, borderWidth: 1, borderColor: 'rgba(255,255,255,0.9)' },
  back: { backgroundColor: 'rgba(255,255,255,0.6)', borderColor: 'rgba(35,117,95,0.1)' },
  tagline: { fontSize: 11, lineHeight: 16 },
});
