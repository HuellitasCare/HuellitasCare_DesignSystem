import { Text, type TextProps, type TextStyle } from 'react-native';

import { colors, fontFamily, typography, type FontWeight, type TypographyVariant } from '../../theme';

export type AppTextProps = TextProps & {
  variant?: TypographyVariant;
  color?: string;
  /** Sobrescribe el peso de la variante (ej. `body` en semibold). */
  weight?: FontWeight;
  align?: TextStyle['textAlign'];
};

export function AppText({
  variant = 'body',
  color = colors.text,
  weight,
  align,
  style,
  ...rest
}: AppTextProps) {
  return (
    <Text
      style={[
        typography[variant],
        { color },
        weight && { fontFamily: fontFamily[weight] },
        align && { textAlign: align },
        style,
      ]}
      {...rest}
    />
  );
}
