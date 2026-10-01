import { Alert, Card, InfoNote, SuccessState, UrgencyBanner } from '../../components';
import { CatalogSection, Demo } from '../CatalogSection';

export function FeedbackSection() {
  return (
    <CatalogSection title="Feedback">
      <Demo name="Alert">
        <Alert tone="success" title="Cambios guardados correctamente" />
        <Alert tone="warning" title="Revisa los datos ingresados" />
        <Alert tone="error" title="Algo salió mal. Intenta de nuevo" />
        <Alert
          tone="error"
          icon="alert-circle"
          title="Acción inmediata requerida"
          message="Los síntomas de Luna combinan fiebre con dificultad respiratoria. Esto puede ser señal de una emergencia grave. No esperes."
        />
      </Demo>

      <Demo name="UrgencyBanner">
        <UrgencyBanner level="alta" description="Requiere atención veterinaria inmediata" />
        <UrgencyBanner level="moderada" description="Consulta en las próximas 24 horas" />
        <UrgencyBanner level="baja" description="Monitorea en casa, no es urgente" />
      </Demo>

      <Demo name="InfoNote">
        <InfoNote icon="📱">Al guardar, tu guía de monitoreo quedará activa en el dashboard.</InfoNote>
        <InfoNote icon="✅" tone="success">
          “Vómito” · “No come” guardados en el historial de Luna
        </InfoNote>
      </Demo>

      <Demo name="SuccessState">
        <Card>
          <SuccessState title="Acción completada" subtitle="Los cambios fueron guardados correctamente" />
        </Card>
      </Demo>
    </CatalogSection>
  );
}
