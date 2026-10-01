import { StyleSheet, View } from 'react-native';

import { colors } from '../../theme';
import { AppText } from '../ui';

export type GreetingHeaderProps = {
  /** Ej. "Buenas noches,". */
  greeting: string;
  name: string;
};

export function GreetingHeader({ greeting, name }: GreetingHeaderProps) {
  return (
    <View style={styles.container} accessible accessibilityRole="header">
      <AppText variant="caption" color={colors.muted}>
        {greeting}
      </AppText>
      <AppText variant="h3" weight="bold">
        {name}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 2 },
});
