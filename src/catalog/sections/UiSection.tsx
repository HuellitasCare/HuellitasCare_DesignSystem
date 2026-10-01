import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  AppText,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  ChipGroup,
  Divider,
  IconButton,
  ProgressBar,
  RadioPillGroup,
  SectionLabel,
  SegmentedControl,
  SelectField,
  TextField,
} from '../../components';
import { colors, spacing } from '../../theme';
import { CatalogSection, Demo } from '../CatalogSection';

export function UiSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('angel@ejemplo.com');
  const [password, setPassword] = useState('secreto123');
  const [notes, setNotes] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [severity, setSeverity] = useState<'leve' | 'moderado' | 'grave'>('moderado');
  const [tab, setTab] = useState<'resumen' | 'historial' | 'medicamentos'>('resumen');
  const [pet, setPet] = useState<'luna' | 'rocky'>('luna');
  const [filter, setFilter] = useState<string[]>(['todos']);
  const [symptoms, setSymptoms] = useState<string[]>(['vomito', 'letargo']);

  return (
    <CatalogSection title="Componentes base (ui)">
      <Demo name="Button">
        <View style={styles.wrap}>
          <Button title="Botón Primario" />
          <Button title="Botón Secundario" variant="secondary" />
          <Button title="Botón Ghost" variant="ghost" />
          <Button title="Botón Peligro" variant="danger" />
          <Button title="Contactar veterinario" variant="accent" leftIcon="call" />
        </View>
        <View style={styles.row}>
          <Button title="Google" variant="social" leftIcon="logo-google" style={styles.flex} />
          <Button title="Apple" variant="social" leftIcon="logo-apple" style={styles.flex} />
        </View>
        <View style={styles.wrap}>
          <Button title="Activar" size="sm" />
          <Button title="Editar" size="sm" variant="secondary" />
          <Button title="Finalizar" size="sm" variant="danger" rightIcon="arrow-forward" />
          <Button title="Cargando" size="sm" loading />
          <Button title="Deshabilitado" size="sm" disabled />
        </View>
        <Button title="Iniciar sesión" fullWidth />
        <Button title="¿Olvidaste tu contraseña?" variant="link" style={styles.alignEnd} />
      </Demo>

      <Demo name="IconButton">
        <View style={styles.row}>
          <IconButton icon="call" shape="rounded" size={36} accessibilityLabel="Llamar" />
          <IconButton icon="chatbubble-outline" variant="outline" shape="rounded" size={36} accessibilityLabel="Chat" />
          <IconButton icon="send" accessibilityLabel="Enviar" />
          <View style={styles.greenBox}>
            <IconButton icon="arrow-back" variant="translucent" size={32} accessibilityLabel="Regresar" />
          </View>
        </View>
      </Demo>

      <Demo name="Badge">
        <View style={styles.wrap}>
          <Badge label="Badge" />
          <Badge label="Nuevo" tone="success" />
          <Badge label="3" tone="error" />
          <Badge label="Leve" tone="success" uppercase />
          <Badge label="Moderado" tone="warning" uppercase />
          <Badge label="Grave" tone="error" uppercase />
          <Badge label="Activo" tone="success" variant="solid" />
          <Badge label="Moderada" tone="warning" variant="solid" />
          <Badge label="Ir ahora" tone="error" variant="solid" />
          <Badge label="Ver" tone="success" rightIcon="arrow-forward" />
          <Badge label="Activa" tone="error" variant="outline" uppercase />
        </View>
      </Demo>

      <Demo name="Chip · ChipGroup">
        <AppText variant="caption" color={colors.textSecondary}>
          Selección única (outlined, sobre fondo gris)
        </AppText>
        <ChipGroup
          variant="outlined"
          value={filter}
          onChange={(next) => setFilter(next.length ? next : ['todos'])}
          options={[
            { label: 'Todos', value: 'todos' },
            { label: 'Esta semana', value: 'semana' },
            { label: 'Este mes', value: 'mes' },
            { label: 'Grave', value: 'grave' },
          ]}
        />
        <Card>
          <AppText variant="caption" color={colors.textSecondary} style={styles.mb}>
            Selección múltiple (filled, dentro de card)
          </AppText>
          <ChipGroup
            multiple
            value={symptoms}
            onChange={setSymptoms}
            options={[
              { label: 'Vómito', value: 'vomito' },
              { label: 'Diarrea', value: 'diarrea' },
              { label: 'No come', value: 'no-come' },
              { label: 'Letargo', value: 'letargo' },
              { label: 'Tos', value: 'tos' },
            ]}
          />
        </Card>
      </Demo>

      <Demo name="TextField">
        <Card style={styles.gap}>
          <TextField label="Nombre de la mascota" placeholder="Texto de ejemplo..." value={name} onChangeText={setName} />
          <TextField label="Con error" placeholder="Texto inválido" value="" error="Este campo es requerido" />
          <TextField
            label="Contraseña"
            password
            value={password}
            onChangeText={setPassword}
            helperText="Mínimo 8 caracteres"
          />
          <TextField label="Fecha y hora" value="05/05/2026 · 20:15" disabled />
          <TextField
            label="Descripción adicional"
            placeholder="Describe lo que observaste con detalle..."
            multiline
            value={notes}
            onChangeText={setNotes}
          />
        </Card>
        <TextField
          label="Correo electrónico (outlined)"
          variant="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </Demo>

      <Demo name="SelectField">
        <Card style={styles.gap}>
          <SelectField label="Especie" value="Perro" onPress={() => {}} />
          <SelectField label="Raza" placeholder="Selecciona la raza" onPress={() => {}} />
        </Card>
      </Demo>

      <Demo name="Checkbox">
        <Checkbox
          checked={acceptTerms}
          onChange={setAcceptTerms}
          label="Acepto los Términos y condiciones y la Política de privacidad"
        />
      </Demo>

      <Demo name="RadioPillGroup">
        <RadioPillGroup
          accessibilityLabel="Severidad"
          value={severity}
          onChange={setSeverity}
          options={[
            { label: 'Leve', value: 'leve' },
            { label: 'Moderado', value: 'moderado' },
            { label: 'Grave', value: 'grave' },
          ]}
        />
      </Demo>

      <Demo name="SegmentedControl">
        <SegmentedControl
          value={tab}
          onChange={setTab}
          options={[
            { label: 'Resumen', value: 'resumen' },
            { label: 'Historial completo', value: 'historial' },
            { label: 'Medicamentos', value: 'medicamentos' },
          ]}
        />
        <SegmentedControl
          variant="pills"
          value={pet}
          onChange={setPet}
          options={[
            { label: 'Luna 🐕', value: 'luna' },
            { label: 'Rocky 🐶', value: 'rocky' },
          ]}
        />
      </Demo>

      <Demo name="ProgressBar">
        <ProgressBar progress={0.6} label="3 / 5 preguntas" />
      </Demo>

      <Demo name="Divider">
        <Divider label="o continúa con" />
        <Divider />
      </Demo>

      <Demo name="Avatar">
        <View style={styles.row}>
          <Avatar size={72} />
          <Avatar name="Dr. Rodríguez" size={48} />
          <Avatar size={40} dotColor={colors.error} />
          <Avatar name="Luna" shape="rounded" />
        </View>
      </Demo>

      <Demo name="Card · SectionLabel">
        <Card>
          <SectionLabel>Biografía</SectionLabel>
          <AppText>
            Luna es una perra de compañía que destaca por su carácter tranquilo y sociable.
          </AppText>
        </Card>
      </Demo>
    </CatalogSection>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, alignItems: 'center' },
  row: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  flex: { flex: 1 },
  gap: { gap: spacing.lg },
  mb: { marginBottom: spacing.sm },
  alignEnd: { alignSelf: 'flex-end' },
  greenBox: { backgroundColor: colors.primary, padding: spacing.sm, borderRadius: 8 },
});
