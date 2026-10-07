import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Showcase } from './src/catalog/Showcase';

/** Entrada para la web (GitHub Pages): los componentes sueltos, sin el cromo del catálogo. */
export default function App() {
  useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold });

  useEffect(() => {
    document.title = 'HuellitasCare · Design System';
  }, []);

  return (
    <SafeAreaProvider>
      <Showcase />
    </SafeAreaProvider>
  );
}
