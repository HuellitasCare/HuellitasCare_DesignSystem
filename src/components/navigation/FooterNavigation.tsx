import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { Button } from '../ui';

export type FooterNavigationProps = {
  onPrevious?: () => void;
  onNext?: () => void;
  previousLabel?: string;
  nextLabel?: string;
  nextDisabled?: boolean;
  /** Oculta "Anterior" en el primer paso. */
  hidePrevious?: boolean;
};

/** Navegación inferior entre pasos: "‹ Anterior" / "Siguiente ›". */
export function FooterNavigation({
  onPrevious,
  onNext,
  previousLabel = 'Anterior',
  nextLabel = 'Siguiente',
  nextDisabled = false,
  hidePrevious = false,
}: FooterNavigationProps) {
  return (
    <View style={styles.container}>
      {hidePrevious ? (
        <View />
      ) : (
        <Button title={previousLabel} variant="ghost" size="sm" leftIcon="chevron-back" onPress={onPrevious} />
      )}
      <Button
        title={nextLabel}
        size="sm"
        rightIcon="chevron-forward"
        onPress={onNext}
        disabled={nextDisabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
