import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText } from '../ui';

export type ChatBubbleProps = {
  message: string;
  /** Ej. "10:05". */
  time?: string;
  /** `sent`: mensaje del usuario (derecha, verde). `received`: del veterinario (izquierda, blanco). */
  direction: 'sent' | 'received';
};

export function ChatBubble({ message, time, direction }: ChatBubbleProps) {
  const sent = direction === 'sent';

  return (
    <View
      style={[styles.bubble, sent ? styles.sent : styles.received]}
      accessible
      accessibilityLabel={`${sent ? 'Tú' : 'Veterinario'}: ${message}${time ? `, ${time}` : ''}`}
    >
      <AppText variant="bodySmall">{message}</AppText>
      {time && (
        <AppText variant="caption" color={colors.muted} style={styles.time}>
          {time}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '80%',
    gap: spacing.xs,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primarySoft,
    borderColor: '#C8E6C9',
    borderBottomRightRadius: spacing.xs,
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderBottomLeftRadius: spacing.xs,
  },
  time: { fontSize: 11, lineHeight: 14 },
});
