import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fontFamily, spacing } from '../../theme';
import { AppText, Icon, type IconName } from '../ui';
import { GlassSurface } from '../ui/GlassSurface';

export type TabItem<K extends string = string> = {
  key: K;
  label: string;
  icon: IconName;
  activeIcon?: IconName;
};

export type BottomTabBarProps<K extends string = string> = {
  items: TabItem<K>[];
  activeKey: K;
  onChange?: (key: K) => void;
  safeAreaBottom?: boolean;
};

export function BottomTabBar<K extends string = string>({
  items,
  activeKey,
  onChange,
  safeAreaBottom = true,
}: BottomTabBarProps<K>) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: (safeAreaBottom ? insets.bottom : 0) + spacing.md }]}>
      <GlassSurface style={styles.container} accessibilityRole="tablist">
      {items.map((item) => {
        const active = item.key === activeKey;
        const color = active ? colors.white : colors.textSecondary;
        return (
          <Pressable
            key={item.key}
            onPress={() => onChange?.(item.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={item.label}
            style={({ pressed }) => [styles.tab, active && styles.tabActive, pressed && styles.pressed]}
          >
            <Icon name={active ? (item.activeIcon ?? item.icon) : item.icon} size={22} color={color} />
            <AppText
              variant="caption"
              color={color}
              style={[styles.label, active && styles.labelActive]}
            >
              {item.label}
            </AppText>
          </Pressable>
        );
      })}
      </GlassSurface>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
    padding: 7,
    gap: 4,
    borderRadius: 32,
  },
  tab: { flex: 1, alignItems: 'center', gap: 5, minHeight: 58, justifyContent: 'center', borderRadius: 25,
    paddingVertical: spacing.sm, paddingHorizontal: 2 },
  tabActive: { backgroundColor: colors.primary, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  label: { fontSize: 10, lineHeight: 14 },
  labelActive: { fontFamily: fontFamily.semibold },
  pressed: { opacity: 0.72, transform: [{ scale: 0.97 }] },
});
