import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fontFamily, spacing } from '../../theme';
import { AppText, Icon, type IconName } from '../ui';

export type TabItem<K extends string = string> = {
  key: K;
  label: string;
  icon: IconName;
  /** Ícono cuando la pestaña está activa (por defecto el mismo). */
  activeIcon?: IconName;
};

export type BottomTabBarProps<K extends string = string> = {
  items: TabItem<K>[];
  activeKey: K;
  onChange?: (key: K) => void;
  /** Agrega el inset inferior del dispositivo. Requiere `SafeAreaProvider` en la raíz. */
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
    <View
      style={[styles.container, { paddingBottom: (safeAreaBottom ? insets.bottom : 0) + spacing.sm }]}
      accessibilityRole="tablist"
    >
      {items.map((item) => {
        const active = item.key === activeKey;
        const color = active ? colors.primary : colors.muted;
        return (
          <Pressable
            key={item.key}
            onPress={() => onChange?.(item.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={item.label}
            style={styles.tab}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  tab: { flex: 1, alignItems: 'center', gap: spacing.xxs, minHeight: 44, justifyContent: 'center' },
  label: { fontSize: 11, lineHeight: 14 },
  labelActive: { fontFamily: fontFamily.semibold },
});
