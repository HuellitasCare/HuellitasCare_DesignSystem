import { Pressable, ScrollView, StyleSheet, View, type ImageSourcePropType } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText, Avatar, Icon } from '../ui';
import { GlassSurface } from '../ui/GlassSurface';

export type PetSummary = {
  id: string;
  name: string;
  photo?: ImageSourcePropType;
  hasAlert?: boolean;
};

export type AddPetTileProps = {
  onPress?: () => void;
  label?: string;
};

export function AddPetTile({ onPress, label = 'Agregar' }: AddPetTileProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label} mascota`}
      style={({ pressed }) => [styles.tile, styles.addTile, pressed && styles.pressed]}
    >
      <View style={styles.addIcon}>
        <Icon name="add" size={25} color={colors.primary} />
      </View>
      <AppText variant="caption" weight="medium" color={colors.primary}>
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

/**
 * Sección "MIS MASCOTAS": tiles con foto y nombre en una sola fila que se desliza de lado; el tile
 * "+ Agregar" queda al final, después de la última mascota.
 */
export function PetSelector({ pets, selectedId, onSelect, onAdd }: PetSelectorProps) {
  return (
    <GlassSurface style={styles.card}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
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
              <View style={[styles.avatarRing, selected && styles.avatarSelected]}>
                <Avatar source={pet.photo} name={pet.name} size={TAMANO_FOTO} />
              </View>
              <AppText variant="caption" weight="semibold" numberOfLines={1}>
                {pet.name}
              </AppText>
              {pet.hasAlert && <View style={styles.alertDot} />}
            </Pressable>
          );
        })}
        {onAdd && <AddPetTile onPress={onAdd} />}
      </ScrollView>
    </GlassSurface>
  );
}

const TAMANO_FOTO = 58;

const styles = StyleSheet.create({
  card: { overflow: 'hidden', borderRadius: 28 },
  row: { flexDirection: 'row', gap: 10, padding: spacing.md },
  tile: {
    width: 106,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    minHeight: 124,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  addTile: { backgroundColor: 'rgba(232,244,237,0.5)', borderColor: 'rgba(35,117,95,0.2)', borderStyle: 'dashed' },
  addIcon: { width: TAMANO_FOTO + 8, height: TAMANO_FOTO + 8, borderRadius: radius.pill,
    alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.6)' },
  avatarRing: { padding: 4, borderRadius: radius.pill, borderWidth: 1, borderColor: 'rgba(255,255,255,0.95)',
    backgroundColor: 'rgba(255,255,255,0.5)' },
  avatarSelected: { borderColor: colors.primary },
  alertTile: { backgroundColor: colors.errorSoft },
  selectedTile: { borderColor: 'rgba(35,117,95,0.35)', backgroundColor: colors.primarySoft },
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
