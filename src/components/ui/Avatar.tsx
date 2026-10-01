import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';

import { colors, fontFamily } from '../../theme';
import { AppText } from './AppText';

export type AvatarProps = {
  source?: ImageSourcePropType;
  /** Se usan las iniciales cuando no hay imagen. */
  name?: string;
  size?: number;
  shape?: 'circle' | 'rounded';
  /** Punto de alerta en la esquina superior derecha. */
  dotColor?: string;
};

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function Avatar({ source, name, size = 48, shape = 'circle', dotColor }: AvatarProps) {
  const borderRadius = shape === 'circle' ? size / 2 : size * 0.2;
  const dotSize = Math.max(8, size * 0.2);

  return (
    <View style={{ width: size, height: size }} accessibilityRole="image" accessibilityLabel={name}>
      {source !== undefined ? (
        <Image source={source} style={{ width: size, height: size, borderRadius }} />
      ) : (
        <View style={[styles.placeholder, { width: size, height: size, borderRadius }]}>
          {name && (
            <AppText color={colors.textSecondary} style={{ fontSize: size * 0.36, fontFamily: fontFamily.semibold }}>
              {initials(name)}
            </AppText>
          )}
        </View>
      )}
      {dotColor && (
        <View
          style={[
            styles.dot,
            { width: dotSize, height: dotSize, borderRadius: dotSize / 2, backgroundColor: dotColor },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: { backgroundColor: colors.placeholder, alignItems: 'center', justifyContent: 'center' },
  dot: { position: 'absolute', top: 0, right: 0, borderWidth: 2, borderColor: colors.surface },
});
