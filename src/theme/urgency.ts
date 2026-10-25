import { colors } from './colors';

export type UrgencyLevel = 'alta' | 'moderada' | 'baja';

type UrgencyStyle = {
  label: string;
  color: string;
  soft: string;
  dot: string;
};

export const urgencyStyles: Record<UrgencyLevel, UrgencyStyle> = {
  alta: { label: 'Alta', color: colors.error, soft: colors.errorSoft, dot: colors.error },
  moderada: {
    label: 'Moderada',
    color: colors.secondary,
    soft: colors.secondarySoft,
    dot: colors.warning,
  },
  baja: { label: 'Baja', color: colors.success, soft: colors.successSoft, dot: colors.success },
};

export const URGENCY_ORDER: UrgencyLevel[] = ['alta', 'moderada', 'baja'];
