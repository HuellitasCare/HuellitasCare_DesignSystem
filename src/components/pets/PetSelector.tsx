import { Pressable, StyleSheet, View, type ImageSourcePropType } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText, Avatar, Card, Icon } from '../ui';

export type PetSummary = {
  id: string;
  name: string;
  /** Emoji junto al nombre, ej. "🐕". */
  emoji?: string;
  photo?: ImageSourcePropType;
  /** Resalta la mascota con una alerta activa (punto rojo). */
  hasAlert?: boolean;
};

export type AddPetTileProps = {
  onPress?: () => void;
  label?: string;
};

/** Tile punteado "+ Agregar" (dashboard vacío y lista de mascotas). */
export function AddPetTile({ onPress, label = 'Agregar' }: AddPetTileProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label} mascota`}
      style={({ pressed }) => [styles.tile, styles.addTile, pressed && styles.pressed]}
    >
      <Icon name="add" size={20} color={colors.muted} />
      <AppText variant="caption" color={colors.muted}>
        {label}
      </AppText>
    </Pressable>
  );
}

export type PetSelectorProps = {
  pets: PetSummary[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  /** Si se pasa, agrega el tile "+ Agregar" al final. */
  onAdd?: () => void;
};

/** Sección "MIS MASCOTAS": tiles con avatar y nombre. */
export function PetSelector({ pets, selectedId, onSelect, onAdd }: PetSelectorProps) {
  return (
    <Card padding={spacing.md}>
      <View style={styles.row}>
        {pets.map((pet) => {
          const selected = pet.id === selectedId;
          return (
            <Pressable
              key={pet.id}
              onPress={onSelect ? () => onSelect(pet.id) : undefined}
              disabled={!onSelect}
              accessibilityRole={onSelect ? 'button' : undefined}
              accessibilityState={{ selected }}
              accessibilityLabel={pet.hasAlert ? `${pet.name}, con alerta activa` : pet.name}
              style={({ pressed }) => [
                styles.tile,
                pet.hasAlert && styles.alertTile,
                selected && styles.selectedTile,
                pressed && styles.pressed,
              ]}
            >
              <Avatar source={pet.photo} size={40} />
              <AppText variant="caption" weight="semibold" numberOfLines={1}>
                {pet.emoji ? `${pet.name} ${pet.emoji}` : pet.name}
              </AppText>
              {pet.hasAlert && <View style={styles.alertDot} />}
            </Pressable>
          );
        })}
        {onAdd && <AddPetTile onPress={onAdd} />}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  tile: {
    flexGrow: 1,
    flexBasis: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs + 2,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    minHeight: 84,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  addTile: { backgroundColor: colors.surface, borderColor: colors.border, borderStyle: 'dashed' },
  alertTile: { backgroundColor: colors.errorSoft },
  selectedTile: { borderColor: colors.primary },
  alertDot: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  pressed: { opacity: 0.8 },
});
