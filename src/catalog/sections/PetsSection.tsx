import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  AddPetTile,
  GreetingHeader,
  MonitoringStatusCard,
  PetProfileHeader,
  PetSelector,
  UrgencyActiveCard,
} from '../../components';
import { CatalogSection, Demo } from '../CatalogSection';

export function PetsSection() {
  const [selectedPet, setSelectedPet] = useState('luna');

  return (
    <CatalogSection title="Mascotas y dashboard">
      <Demo name="GreetingHeader">
        <GreetingHeader greeting="Buenas noches," name="Ángel" />
      </Demo>

      <Demo name="PetSelector · AddPetTile">
        <PetSelector
          pets={[
            { id: 'luna', name: 'Luna', emoji: '🐕' },
            { id: 'milo', name: 'Milo', emoji: '🐈' },
            { id: 'rocky', name: 'Rocky', emoji: '🐶' },
          ]}
        />
        <PetSelector
          selectedId={selectedPet}
          onSelect={setSelectedPet}
          onAdd={() => {}}
          pets={[
            { id: 'luna', name: 'Luna', emoji: '🐕', hasAlert: true },
            { id: 'milo', name: 'Milo', emoji: '🐈' },
          ]}
        />
        <View style={styles.tileDemo}>
          <AddPetTile onPress={() => {}} />
        </View>
      </Demo>

      <Demo name="PetProfileHeader">
        <PetProfileHeader
          name="Luna"
          subtitle="Golden Retriever · 3 años"
          badge={{ label: '2 alertas', tone: 'warning' }}
        />
      </Demo>

      <Demo name="MonitoringStatusCard">
        <MonitoringStatusCard
          title="👁 Seguimiento en casa activo"
          subtitle="Luna 🐕 · Próxima revisión"
          time="10:30 PM"
          onPress={() => {}}
        />
      </Demo>

      <Demo name="UrgencyActiveCard">
        <UrgencyActiveCard
          title="Urgencia alta · Luna 🐕"
          description="Busca atención veterinaria inmediata"
          onAction={() => {}}
        />
      </Demo>
    </CatalogSection>
  );
}

const styles = StyleSheet.create({
  tileDemo: { width: 116 },
});
