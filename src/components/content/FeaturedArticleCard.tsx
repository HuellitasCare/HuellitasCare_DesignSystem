import { Image, Pressable, StyleSheet, View, type ImageSourcePropType } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText, Badge } from '../ui';
import { ImagePlaceholder } from './ImagePlaceholder';

export type FeaturedArticleCardProps = {
  title: string;
  /** Ej. "12 min lectura". */
  meta?: string;
  /** Ej. "Esencial". */
  badgeLabel?: string;
  image?: ImageSourcePropType;
  onPress?: () => void;
};

/** Artículo destacado de "Cuidados básicos" con imagen superior. */
export function FeaturedArticleCard({ title, meta, badgeLabel, image, onPress }: FeaturedArticleCardProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole="button"
      accessibilityLabel={[badgeLabel, title, meta].filter(Boolean).join('. ')}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {image !== undefined ? (
        <Image source={image} style={styles.image} resizeMode="cover" />
      ) : (
        <ImagePlaceholder label="Imagen destacada" height={140} flat />
      )}
      <View style={styles.body}>
        {badgeLabel && <Badge label={badgeLabel} tone="success" uppercase />}
        <AppText variant="body" weight="bold">
          {title}
        </AppText>
        {meta && (
          <AppText variant="caption" color={colors.muted}>
            {meta}
          </AppText>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  pressed: { opacity: 0.9 },
  image: { width: '100%', height: 140 },
  body: { padding: spacing.lg, gap: spacing.xs + 2 },
});
