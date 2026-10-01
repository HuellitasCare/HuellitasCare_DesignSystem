import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  ChatBubble,
  ChatHeader,
  ChatInput,
  DateSeparator,
  EmergencyCallCard,
  ListGroup,
  VetCard,
} from '../../components';
import { spacing } from '../../theme';
import { CatalogSection, Demo } from '../CatalogSection';

export function VetSection() {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState<string[]>([]);

  return (
    <CatalogSection title="Veterinario">
      <Demo name="EmergencyCallCard">
        <EmergencyCallCard title="Llamar veterinario ahora" subtitle="Botón de emergencia — siempre visible" />
        <EmergencyCallCard variant="dark" title="Línea de emergencias veterinarias" subtitle="Disponible 24/7" />
        <EmergencyCallCard variant="darkDanger" title="Línea de emergencias veterinarias" subtitle="Disponible 24/7" />
      </Demo>

      <Demo name="VetCard">
        <VetCard
          name="Dr. Rodríguez"
          clinic="Clínica Animalitos"
          rating={4.9}
          distance="0.8 km"
          isOpen
          onCall={() => {}}
          onChat={() => {}}
        />
        <ListGroup>
          <VetCard variant="row" name="Dra. Soto" clinic="VetCare 24h" rating={4.7} distance="1.2 km" isOpen onCall={() => {}} onChat={() => {}} />
          <VetCard
            variant="row"
            name="Dr. Fernández"
            clinic="Hospital Veterinario"
            rating={4.6}
            distance="3.1 km"
            isOpen={false}
            onCall={() => {}}
            onChat={() => {}}
          />
        </ListGroup>
      </Demo>

      <Demo name="ChatHeader · DateSeparator · ChatBubble · ChatInput">
        <ChatHeader name="Dr. Rodríguez" subtitle="Clínica Animalitos" />
        <View style={styles.chat}>
          <DateSeparator label="Hoy, 18 mayo 2026" />
          <ChatBubble direction="sent" message="Buenas tardes doctora, ¿cómo sigue Luna? ¿Ya ha bebido agua?" time="10:05" />
          <ChatBubble direction="received" message="Ya ha estado mejorando, comió con facilidad y bebió agua" time="10:10" />
          {sent.map((text, index) => (
            <ChatBubble key={index} direction="sent" message={text} time="Ahora" />
          ))}
        </View>
        <ChatInput
          value={message}
          onChangeText={setMessage}
          onAttach={() => {}}
          onSend={() => {
            setSent((s) => [...s, message.trim()]);
            setMessage('');
          }}
        />
      </Demo>
    </CatalogSection>
  );
}

const styles = StyleSheet.create({
  chat: { gap: spacing.sm },
});
