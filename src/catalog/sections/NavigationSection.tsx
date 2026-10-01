import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppHeader, BottomTabBar, FooterNavigation, WizardStepper } from '../../components';
import { radius } from '../../theme';
import { CatalogSection, Demo } from '../CatalogSection';

const WIZARD_STEPS = ['Síntomas', 'Resultado', 'Acción', 'Monitor', 'Guardar'];

export function NavigationSection() {
  const [tab, setTab] = useState<'inicio' | 'mascotas' | 'sintomas' | 'veterinario'>('inicio');
  const [step, setStep] = useState(2);

  return (
    <CatalogSection title="Navegación">
      <Demo name="AppHeader">
        <View style={styles.clip}>
          <AppHeader title="Nombre de Pantalla" onBack={() => {}} safeAreaTop={false} />
        </View>
      </Demo>

      <Demo name="WizardStepper">
        <WizardStepper steps={WIZARD_STEPS} currentIndex={0} />
        <WizardStepper steps={WIZARD_STEPS} currentIndex={step} />
        <WizardStepper steps={WIZARD_STEPS} currentIndex={1} showUpcoming />
        <FooterNavigation
          hidePrevious={step === 0}
          nextDisabled={step === WIZARD_STEPS.length - 1}
          onPrevious={() => setStep((s) => Math.max(0, s - 1))}
          onNext={() => setStep((s) => Math.min(WIZARD_STEPS.length - 1, s + 1))}
        />
      </Demo>

      <Demo name="BottomTabBar">
        <View style={styles.clip}>
          <BottomTabBar
            safeAreaBottom={false}
            activeKey={tab}
            onChange={setTab}
            items={[
              { key: 'inicio', label: 'Inicio', icon: 'home-outline', activeIcon: 'home' },
              { key: 'mascotas', label: 'Mascotas', icon: 'paw-outline', activeIcon: 'paw' },
              { key: 'sintomas', label: 'Síntomas', icon: 'pulse-outline', activeIcon: 'pulse' },
              { key: 'veterinario', label: 'Veterinario', icon: 'medkit-outline', activeIcon: 'medkit' },
            ]}
          />
        </View>
      </Demo>
    </CatalogSection>
  );
}

const styles = StyleSheet.create({
  clip: { borderRadius: radius.md, overflow: 'hidden' },
});
