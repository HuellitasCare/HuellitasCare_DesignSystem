import { Image } from 'expo-image';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';

import { AppText, Icon } from '../components/ui';
import { colors, spacing } from '../theme';
import { gradient } from './screen';

export type CareHeroProps = {
  onPress: () => void;
  showPets?: boolean;
  actionTone?: 'light' | 'red';
};

export function CareHero({ onPress, showPets = true, actionTone = 'light' }: CareHeroProps) {
  const { width, fontScale } = useWindowDimensions();
  const compact = width < 360 || fontScale > 1.2;
  const redAction = actionTone === 'red';

  return <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="Evaluar síntomas"
    style={({ pressed }) => [styles.hero, pressed && styles.pressed]}>
    <View pointerEvents="none" style={styles.reflection} />
    {showPets && <Image source={require('../../assets/companions.svg')} contentFit="contain"
      style={[styles.illustration, compact && styles.illustrationCompact]} accessible={false} />}
    <View style={[styles.copy, (compact || !showPets) && styles.copyCompact]}>
      <AppText variant="sectionLabel" color="#B9DACB" style={styles.eyebrow}>SU BIENESTAR IMPORTA</AppText>
      <AppText variant="h2" color="#F8FCF8" style={styles.title}>Un cuidado que{ '\n' }empieza contigo.</AppText>
      <AppText variant="caption" color="#D5E7DD" style={styles.subtitle}>Registra las señales que observas</AppText>
      <View style={[styles.action, redAction && styles.actionRed]}>
        <AppText variant="label" color={redAction ? colors.white : '#224F40'} style={styles.actionLabel}>
          Evaluar síntomas
        </AppText>
        <Icon name="arrow-forward" size={17} color={redAction ? colors.white : '#224F40'} />
      </View>
    </View>
  </Pressable>;
}

const styles = StyleSheet.create({
  hero: { minHeight: 214, padding: 22, borderRadius: 28, overflow: 'hidden', backgroundColor: '#245C49',
    ...gradient('linear-gradient(120deg, #173E32, #34795E)'), borderWidth: 1, borderColor: '#508B70',
    boxShadow: '0 12px 30px rgba(28, 75, 55, 0.16)' },
  reflection: { position: 'absolute', width: 250, height: 250, borderRadius: 125, top: -140, left: -85,
    backgroundColor: 'rgba(217, 243, 217, 0.05)', borderWidth: 1, borderColor: 'rgba(238, 255, 239, 0.12)' },
  copy: { maxWidth: '70%', gap: 10, alignItems: 'flex-start', zIndex: 1 },
  copyCompact: { maxWidth: '100%' },
  eyebrow: { fontSize: 9, letterSpacing: 1.5 },
  title: { fontSize: 23, lineHeight: 29, letterSpacing: -0.8 },
  subtitle: { maxWidth: 165, fontSize: 12, lineHeight: 17 },
  action: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center', marginTop: 4,
    backgroundColor: '#E5F0DE', paddingVertical: 11, paddingHorizontal: 15, borderRadius: 99,
    borderWidth: 1, borderColor: '#F1F8EA', maxWidth: '100%', minHeight: 44 },
  actionRed: { backgroundColor: colors.error, borderColor: '#D8747F' },
  actionLabel: { flexShrink: 1 },
  illustration: { position: 'absolute', width: 184, height: 184, right: -30, bottom: -5, opacity: 0.95 },
  illustrationCompact: { width: 130, height: 130, right: -36, bottom: -34, opacity: 0.28 },
  pressed: { opacity: 0.92, transform: [{ scale: 0.99 }] },
});
