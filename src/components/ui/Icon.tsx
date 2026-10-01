import { Ionicons, type IoniconsIconName } from '@react-native-vector-icons/ionicons';
import type { ReactElement } from 'react';

import { colors } from '../../theme';
import { AppText } from './AppText';

export type IconName = IoniconsIconName;

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
};

export function Icon({ name, size = 20, color = colors.text }: IconProps) {
  return <Ionicons name={name} size={size} color={color} />;
}

/**
 * Muchas pantallas del Figma usan emojis como ícono (🔔, 📖, 🐾).
 * Un `IconSlot` acepta un emoji (string) o cualquier elemento (ej. `<Icon name="call" />`).
 */
export type IconSlot = string | ReactElement;

export function renderIconSlot(icon: IconSlot, size = 18) {
  if (typeof icon === 'string') {
    return (
      <AppText style={{ fontSize: size, lineHeight: size * 1.25 }} accessible={false}>
        {icon}
      </AppText>
    );
  }
  return icon;
}
