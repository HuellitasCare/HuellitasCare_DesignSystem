import { StyleSheet, type ViewProps } from 'react-native';

import { radius, spacing } from '../../theme';
import { GlassSurface } from './GlassSurface';

export type CardProps = ViewProps & {
  padding?: number;
};

export function Card({ padding = spacing.lg, style, ...rest }: CardProps) {
  return <GlassSurface style={[styles.card, { padding }, style]} {...rest} />;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
});
