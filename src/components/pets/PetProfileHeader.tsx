import { StyleSheet, type ImageSourcePropType } from 'react-native';

import { colors, spacing } from '../../theme';
import { AppText, Avatar, Badge, Card, type BadgeProps } from '../ui';

export type PetProfileHeaderProps = {
  name: string;
  subtitle?: string;
  photo?: ImageSourcePropType;
  badge?: BadgeProps;
};

export function PetProfileHeader({ name, subtitle, photo, badge }: PetProfileHeaderProps) {
  return (
    <Card style={styles.card}>
      <Avatar source={photo} size={72} />
      <AppText variant="h3" weight="bold" align="center" accessibilityRole="header">
        {name}
      </AppText>
      {subtitle && (
        <AppText variant="caption" color={colors.muted} align="center">
          {subtitle}
        </AppText>
      )}
      {badge && <Badge {...badge} style={styles.badge} />}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', gap: spacing.xs, paddingVertical: spacing.xl },
  badge: { alignSelf: 'center', marginTop: spacing.xs },
});
