import { Pressable, StyleSheet, View, type ImageSourcePropType } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText, Avatar, Badge, Icon, IconButton } from '../ui';

export type VetCardProps = {
  name: string;
  clinic: string;
  rating?: number;
  distance?: string;
  isOpen: boolean;
  photo?: ImageSourcePropType;
  onPress?: () => void;
  onCall?: () => void;
  onChat?: () => void;
  variant?: 'card' | 'row';
};

export function VetCard({
  name,
  clinic,
  rating,
  distance,
  isOpen,
  photo,
  onPress,
  onCall,
  onChat,
  variant = 'card',
}: VetCardProps) {


  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${name}, ${clinic}, ${isOpen ? 'abierto' : 'cerrado'}`}
      style={({ pressed }) => [
        styles.container,
        variant === 'card' && styles.card,
        pressed && styles.pressed,
      ]}
    >
      <Avatar source={photo} size={48} />
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <AppText variant="bodySmall" weight="bold" numberOfLines={1} style={styles.name}>
            {name}
          </AppText>
          <Badge label={isOpen ? 'Abierto' : 'Cerrado'} tone={isOpen ? 'success' : 'neutral'} />
        </View>
        <AppText variant="caption" color={colors.muted} numberOfLines={1}>
          {clinic}
        </AppText>
        {(rating !== undefined || distance) && <View style={styles.meta}>
          {rating !== undefined && <><Icon name="star" size={12} color={colors.secondary} />
            <AppText variant="caption" color={colors.textSecondary}>{rating.toFixed(1)}</AppText></>}
          {distance && <><Icon name="location-outline" size={12} color={colors.textSecondary} />
            <AppText variant="caption" color={colors.textSecondary}>{distance}</AppText></>}
        </View>}
      </View>
      <View style={styles.actions}>
        {onCall && (
          <IconButton icon="call" shape="rounded" size={36} onPress={onCall} accessibilityLabel={`Llamar a ${name}`} />
        )}
        {onChat && (
          <IconButton
            icon="chatbubble-outline"
            variant="outline"
            shape="rounded"
            size={36}
            onPress={onChat}
            accessibilityLabel={`Enviar mensaje a ${name}`}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.85 },
  info: { flex: 1, gap: 2 },
  meta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.xs },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs + 2 },
  name: { flexShrink: 1 },
  actions: { gap: spacing.sm },
});
