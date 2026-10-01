import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '../../theme';
import { AppText, IconButton } from '../ui';

export type AppHeaderProps = {
  title: string;
  /** Si se pasa, muestra el botón circular de regresar. */
  onBack?: () => void;
  /** Acción opcional a la derecha. */
  right?: ReactNode;
  /** Agrega el inset superior del dispositivo (notch). Desactívalo si el header no está pegado arriba. */
  safeAreaTop?: boolean;
};

/** Barra verde superior de todas las pantallas. Requiere `SafeAreaProvider` en la raíz. */
export function AppHeader({ title, onBack, right, safeAreaTop = true }: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: (safeAreaTop ? insets.top : 0) + spacing.md }]}>
      {onBack && (
        <IconButton
          icon="arrow-back"
          variant="translucent"
          size={32}
          onPress={onBack}
          accessibilityLabel="Regresar"
        />
      )}
      <AppText
        variant="body"
        weight="semibold"
        color={colors.white}
        numberOfLines={1}
        accessibilityRole="header"
        style={styles.title}
      >
        {title}
      </AppText>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: { flex: 1 },
});
