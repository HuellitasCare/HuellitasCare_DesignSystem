import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '../components';
import { colors, spacing } from '../theme';

type CatalogSectionProps = {
  title: string;
  children: ReactNode;
};

export function CatalogSection({ title, children }: CatalogSectionProps) {
  return (
    <View style={styles.section}>
      <AppText variant="h2" accessibilityRole="header">
        {title}
      </AppText>
      {children}
    </View>
  );
}

type DemoProps = {
  /** Nombre del componente tal como se importa. */
  name: string;
  children: ReactNode;
};

/** Un componente dentro de una sección, con su nombre arriba. */
export function Demo({ name, children }: DemoProps) {
  return (
    <View>
      <AppText variant="label" color={colors.muted} style={styles.demoName}>
        {`<${name} />`}
      </AppText>
      <View style={styles.demoBody}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.xl },
  demoName: { marginBottom: spacing.sm },
  demoBody: { gap: spacing.md },
});
