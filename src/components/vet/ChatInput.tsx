import { StyleSheet, TextInput, View } from 'react-native';

import { colors, fontFamily, radius, spacing, typography } from '../../theme';
import { IconButton } from '../ui';

export type ChatInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  /** Si se pasa, muestra el botón de adjuntar. */
  onAttach?: () => void;
  placeholder?: string;
};

/** Barra inferior del chat: campo de texto + adjuntar + enviar. */
export function ChatInput({
  value,
  onChangeText,
  onSend,
  onAttach,
  placeholder = 'Escribe un mensaje...',
}: ChatInputProps) {
  const canSend = value.trim().length > 0;

  return (
    <View style={styles.row}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        accessibilityLabel="Mensaje"
        returnKeyType="send"
        onSubmitEditing={canSend ? onSend : undefined}
        style={styles.input}
      />
      {onAttach && (
        <IconButton icon="attach" onPress={onAttach} accessibilityLabel="Adjuntar archivo" />
      )}
      <IconButton icon="send" onPress={onSend} disabled={!canSend} accessibilityLabel="Enviar mensaje" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  input: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...typography.bodySmall,
    fontFamily: fontFamily.regular,
    color: colors.text,
  },
});
