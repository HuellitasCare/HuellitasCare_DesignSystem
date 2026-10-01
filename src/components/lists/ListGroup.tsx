import { Children, Fragment, isValidElement, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../theme';
import { Card } from '../ui';

export type ListGroupProps = {
  children: ReactNode;
  /** Sangría izquierda del separador (para alinearlo con el texto en vez del ícono). */
  separatorInset?: number;
};

/** Card blanca que apila filas (`ListRow`, `VetCard variant="row"`, etc.) con separadores. */
export function ListGroup({ children, separatorInset = spacing.lg }: ListGroupProps) {
  const rows = Children.toArray(children).filter(isValidElement);

  return (
    <Card padding={0}>
      {rows.map((row, index) => (
        <Fragment key={row.key ?? index}>
          {index > 0 && <View style={[styles.separator, { marginLeft: separatorInset }]} />}
          {row}
        </Fragment>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  separator: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginRight: spacing.lg },
});
