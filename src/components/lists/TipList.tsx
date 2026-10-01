import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText, Icon, type IconName } from '../ui';

export type TipListVariant =
  /** "Evita hacer esto": fondo rosado, ✕ rojas. */
  | 'avoid'
  /** "Esto puede mejorar su estado": fondo verde, ✓ verdes. */
  | 'help'
  /** "Ve al veterinario DE INMEDIATO si…": borde izquierdo rojo, viñetas. */
  | 'warning';

export type TipListProps = {
  variant: TipListVariant;
  title: string;
  items: string[];
};

const variants: Record<
  TipListVariant,
  { color: string; background: string; border: string; headerIcon: IconName; itemIcon?: IconName }
> = {
  avoid: { color: colors.error, background: '#FFF5F5', border: '#F5C6CB', headerIcon: 'ban', itemIcon: 'close' },
  help: {
    color: colors.primary,
    background: '#F1F8F1',
    border: '#C8E6C9',
    headerIcon: 'checkmark-circle',
    itemIcon: 'checkmark',
  },
  warning: { color: colors.error, background: colors.errorSoft, border: colors.error, headerIcon: 'warning' },
};

export function TipList({ variant, title, items }: TipListProps) {
  const style = variants[variant];
  const isWarning = variant === 'warning';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: style.background, borderColor: style.border },
        isWarning && styles.warningContainer,
      ]}
    >
      <View style={[styles.header, !isWarning && { borderBottomColor: style.border, borderBottomWidth: 1 }]}>
        <Icon name={style.headerIcon} size={18} color={style.color} />
        <AppText variant="bodySmall" weight="bold" color={style.color} style={styles.flex} accessibilityRole="header">
          {title}
        </AppText>
      </View>
      {items.map((item, index) => (
        <View
          key={`${index}-${item}`}
          style={[
            styles.item,
            isWarning ? styles.warningItem : index > 0 && { borderTopColor: style.border, borderTopWidth: 1 },
          ]}
        >
          {style.itemIcon ? (
            <Icon name={style.itemIcon} size={14} color={style.color} />
          ) : (
            <View style={[styles.bullet, { backgroundColor: style.color }]} />
          )}
          <AppText variant="bodySmall" color={isWarning ? style.color : colors.text} style={styles.flex}>
            {item}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: radius.md, borderWidth: 1, overflow: 'hidden' },
  warningContainer: { borderWidth: 0, borderLeftWidth: 4, paddingBottom: spacing.sm },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md - 2,
  },
  warningItem: { paddingVertical: spacing.xs },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 7 },
  flex: { flex: 1 },
});
