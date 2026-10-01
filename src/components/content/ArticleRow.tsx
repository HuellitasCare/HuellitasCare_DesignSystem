import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';

import { colors, radius } from '../../theme';
import { ListRow } from '../lists/ListRow';
import { renderIconSlot, type IconSlot } from '../ui';

export type ArticleRowProps = {
  title: string;
  /** Ej. "Salud · 5 min". */
  meta?: string;
  /** Miniatura del artículo. Sin imagen se muestra un cuadro gris (o el ícono si se pasa). */
  thumbnail?: ImageSourcePropType;
  icon?: IconSlot;
  iconBackground?: string;
  onPress?: () => void;
};

/** Fila de artículo ("Señales de deshidratación"). Úsala dentro de `ListGroup`. */
export function ArticleRow({ title, meta, thumbnail, icon, iconBackground, onPress }: ArticleRowProps) {
  const leading = thumbnail !== undefined ? (
    <Image source={thumbnail} style={styles.thumb} />
  ) : (
    <View style={[styles.thumb, { backgroundColor: iconBackground ?? colors.placeholder }]}>
      {icon && renderIconSlot(icon, 18)}
    </View>
  );

  return <ListRow title={title} subtitle={meta} leading={leading} onPress={onPress} />;
}

const styles = StyleSheet.create({
  thumb: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
