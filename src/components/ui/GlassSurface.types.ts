import type { ViewProps } from 'react-native';

export type GlassSurfaceProps = ViewProps & {
  tone?: 'light' | 'soft' | 'dark';
  elevated?: boolean;
  interactive?: boolean;
};
