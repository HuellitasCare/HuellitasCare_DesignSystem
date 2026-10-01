import { StyleSheet, View, type ImageSourcePropType } from 'react-native';

import { colors, spacing } from '../../theme';
import { AppText, Avatar, Card } from '../ui';

export type ChatHeaderProps = {
  name: string;
  /** Ej. "En línea", "Clínica Animalitos". */
  subtitle?: string;
  photo?: ImageSourcePropType;
};

/** Tarjeta con el veterinario de la conversación. */
export function ChatHeader({ name, subtitle, photo }: ChatHeaderProps) {
  return (
    <Card padding={spacing.md} style={styles.card}>
      <Avatar source={photo} size={40} />
      <View style={styles.texts}>
        <AppText variant="bodySmall" weight="bold" accessibilityRole="header">
          {name}
        </AppText>
        {subtitle && (
          <AppText variant="caption" color={colors.muted}>
            {subtitle}
          </AppText>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  texts: { flex: 1 },
});
