import { Card, ListGroup, PhotoAttach, SymptomRecordRow } from '../../components';
import { CatalogSection, Demo } from '../CatalogSection';

export function SymptomsSection() {
  return (
    <CatalogSection title="Síntomas">
      <Demo name="SymptomRecordRow">
        <ListGroup>
          <SymptomRecordRow date="8 mayo 2026" title="Letargo" petName="Luna 🐕" severity="leve" onPress={() => {}} />
          <SymptomRecordRow
            date="5 mayo 2026"
            title="Vómito + Letargo"
            petName="Luna 🐕"
            severity="moderado"
            onPress={() => {}}
          />
          <SymptomRecordRow date="22 abr 2026" title="Convulsiones" petName="Milo 🐈" severity="grave" onPress={() => {}} />
        </ListGroup>
      </Demo>

      <Demo name="PhotoAttach">
        <Card>
          <PhotoAttach subtitle="Ayuda al veterinario a evaluar mejor" onPress={() => {}} />
        </Card>
        <PhotoAttach variant="avatar" onPress={() => {}} />
      </Demo>
    </CatalogSection>
  );
}
