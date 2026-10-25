import { Alert, Card, InfoNote, SuccessState, UrgencyBanner } from '../../components';
import { CatalogSection, Demo } from '../CatalogSection';

export function FeedbackSection() {
  return (
    <CatalogSection title="Feedback">
      <Demo name="Alertas">
        <Alert tone="success" title="Guardado" />
        <Alert tone="warning" title="Revisar datos" />
        <Alert tone="error" title="Error" />
        <Alert
          tone="error"
          icon="alert-circle"
          title="Atención urgente"
          message="Consulta veterinaria inmediata"
        />
      </Demo>

      <Demo name="Urgencia">
        <UrgencyBanner level="alta" description="Atención inmediata" />
        <UrgencyBanner level="moderada" description="Consulta en 24 h" />
        <UrgencyBanner level="baja" description="Monitoreo en casa" />
      </Demo>

      <Demo name="Notas">
        <InfoNote icon="phone-portrait-outline">Guía activa</InfoNote>
        <InfoNote icon="checkmark-circle" tone="success">Guardado en historial</InfoNote>
      </Demo>

      <Demo name="Confirmación">
        <Card>
          <SuccessState title="Completado" subtitle="Cambios guardados" />
        </Card>
      </Demo>
    </CatalogSection>
  );
}
