import { Image } from 'expo-image';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';

import { AppText, Icon } from '../components/ui';
import { colors, spacing } from '../theme';
import { gradient } from './screen';

export type CareHeroProps = {
  onPress: () => void;
  showPets?: boolean;
  actionTone?: 'light' | 'red';
  visual?: 'pets' | 'none' | 'heart' | 'pulse' | 'shield' | 'record';
};

export function CareHero({ onPress, showPets = true, actionTone = 'light', visual }: CareHeroProps) {
  const { width, fontScale } = useWindowDimensions();
  const compact = width < 360 || fontScale > 1.2;
  const redAction = actionTone === 'red';
  const selectedVisual = visual ?? (showPets ? 'pets' : 'none');

  return <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="Evaluar síntomas"
    style={({ pressed }) => [styles.hero, pressed && styles.pressed]}>
    <View pointerEvents="none" style={styles.reflection} />
    {selectedVisual === 'pets' && <Image source={require('../../assets/companions.svg')} contentFit="contain"
      style={[styles.illustration, compact && styles.illustrationCompact]} accessible={false} />}
    {selectedVisual === 'heart' && <View pointerEvents="none" accessible={false}
      style={[styles.rightVisual, compact && styles.rightVisualCompact]}>
      <View style={styles.heartOrbit} />
      <View style={styles.heartHalo}>
        <View style={styles.heartCenter}><Icon name="heart" size={48} color="#F8FCF8" /></View>
      </View>
      <View style={styles.heartSparkle}><Icon name="add" size={18} color="#D6EBDC" /></View>
      <View style={styles.heartDot} />
    </View>}
    {selectedVisual === 'pulse' && <View pointerEvents="none" accessible={false}
      style={[styles.rightVisual, compact && styles.rightVisualCompact]}>
      <View style={styles.pulseBack} />
      <View style={styles.pulseCard}>
        <View style={styles.pulseHeader}>
          <View style={styles.pulseIndicator} />
          <View style={styles.pulseHeaderLine} />
        </View>
        <Icon name="pulse" size={90} color="#E8F7E9" />
        <View style={styles.pulseFooter}>
          <View style={styles.pulseFooterLine} />
          <View style={styles.pulseFooterDot} />
        </View>
      </View>
      <View style={styles.pulseHeart}><Icon name="heart" size={21} color={colors.error} /></View>
    </View>}
    {selectedVisual === 'shield' && <View pointerEvents="none" accessible={false}
      style={[styles.rightVisual, compact && styles.rightVisualCompact]}>
      <View style={styles.shieldBack} />
      <View style={styles.shieldTile}>
        <Icon name="shield-checkmark-outline" size={76} color="#F0F9EF" />
      </View>
      <View style={styles.shieldHeart}><Icon name="heart" size={19} color={colors.error} /></View>
      <View style={styles.shieldSparkle}><Icon name="add" size={18} color="#E6F4E7" /></View>
    </View>}
    {selectedVisual === 'record' && <View pointerEvents="none" accessible={false}
      style={[styles.rightVisual, compact && styles.rightVisualCompact]}>
      <View style={styles.recordBack} />
      <View style={styles.recordCard}>
        <View style={styles.recordHeader}>
          <View style={styles.recordHeaderLine} />
          <View style={styles.recordHeaderDot} />
        </View>
        {[0, 1, 2].map((row) => <View key={row} style={styles.recordRow}>
          <View style={styles.recordCheck}><Icon name="checkmark" size={13} color="#ECF9EC" /></View>
          <View style={[styles.recordLine, row === 2 && styles.recordLineShort]} />
        </View>)}
      </View>
      <View style={styles.recordBadge}><Icon name="search" size={21} color={colors.error} /></View>
    </View>}
    <View style={[styles.copy, (compact || selectedVisual === 'none') && styles.copyCompact]}>
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
  rightVisual: { position: 'absolute', right: 8, bottom: 8, width: 176, height: 176,
    alignItems: 'center', justifyContent: 'center' },
  rightVisualCompact: { right: -14, bottom: -20, opacity: 0.28, transform: [{ scale: 0.75 }] },
  heartOrbit: { position: 'absolute', width: 166, height: 166, borderRadius: 83,
    borderWidth: 1, borderColor: 'rgba(231, 248, 231, 0.24)' },
  heartHalo: { width: 136, height: 136, borderRadius: 68, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(211, 240, 219, 0.18)', borderWidth: 1, borderColor: 'rgba(244, 255, 244, 0.38)' },
  heartCenter: { width: 94, height: 94, borderRadius: 47, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(244, 255, 244, 0.14)', borderWidth: 1, borderColor: 'rgba(244, 255, 244, 0.48)' },
  heartSparkle: { position: 'absolute', top: 1, right: 20 },
  heartDot: { position: 'absolute', left: 0, bottom: 30, width: 9, height: 9, borderRadius: 5,
    backgroundColor: '#CFDFB5' },
  pulseBack: { position: 'absolute', width: 134, height: 126, borderRadius: 26,
    backgroundColor: 'rgba(215, 240, 221, 0.14)', borderWidth: 1, borderColor: 'rgba(234, 250, 231, 0.36)',
    transform: [{ rotate: '15deg' }] },
  pulseCard: { width: 138, height: 126, borderRadius: 26, padding: 18, alignItems: 'center',
    justifyContent: 'space-between', backgroundColor: 'rgba(223, 244, 226, 0.25)',
    borderWidth: 1, borderColor: 'rgba(247, 255, 246, 0.62)', transform: [{ rotate: '5deg' }] },
  pulseHeader: { width: '100%', flexDirection: 'row', alignItems: 'center', gap: 7 },
  pulseIndicator: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#E6C79D' },
  pulseHeaderLine: { width: 38, height: 4, borderRadius: 2, backgroundColor: 'rgba(239, 254, 238, 0.44)' },
  pulseFooter: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pulseFooterLine: { width: 54, height: 4, borderRadius: 2, backgroundColor: 'rgba(239, 254, 238, 0.55)' },
  pulseFooterDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#C4E8D0' },
  pulseHeart: { position: 'absolute', top: 10, right: 4, width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F8EC',
    borderWidth: 1, borderColor: '#FFFFFF' },
  shieldBack: { position: 'absolute', width: 140, height: 140, borderRadius: 42,
    backgroundColor: 'rgba(212, 241, 222, 0.15)', borderWidth: 1,
    borderColor: 'rgba(240, 255, 243, 0.30)', transform: [{ rotate: '16deg' }] },
  shieldTile: { width: 120, height: 120, borderRadius: 38, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(228, 248, 229, 0.24)', borderWidth: 1,
    borderColor: 'rgba(247, 255, 246, 0.62)', transform: [{ rotate: '-7deg' }] },
  shieldHeart: { position: 'absolute', right: 3, top: 9, width: 38, height: 38, borderRadius: 19,
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F8EC',
    borderWidth: 1, borderColor: '#FFFFFF' },
  shieldSparkle: { position: 'absolute', left: 4, bottom: 8 },
  recordBack: { position: 'absolute', width: 142, height: 138, borderRadius: 26,
    backgroundColor: 'rgba(217, 241, 222, 0.14)', borderWidth: 1,
    borderColor: 'rgba(237, 252, 234, 0.36)', transform: [{ rotate: '-12deg' }] },
  recordCard: { width: 142, height: 138, borderRadius: 26, padding: 17, gap: 12,
    backgroundColor: 'rgba(226, 247, 230, 0.24)', borderWidth: 1,
    borderColor: 'rgba(248, 255, 246, 0.62)', transform: [{ rotate: '5deg' }] },
  recordHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  recordHeaderLine: { width: 43, height: 5, borderRadius: 3, backgroundColor: 'rgba(239, 254, 238, 0.58)' },
  recordHeaderDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#D9CAA8' },
  recordRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  recordCheck: { width: 20, height: 20, borderRadius: 7, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(232, 250, 231, 0.18)', borderWidth: 1,
    borderColor: 'rgba(247, 255, 246, 0.55)' },
  recordLine: { width: 57, height: 5, borderRadius: 3, backgroundColor: 'rgba(239, 254, 238, 0.55)' },
  recordLineShort: { width: 41 },
  recordBadge: { position: 'absolute', right: 3, top: 9, width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F8EC',
    borderWidth: 1, borderColor: '#FFFFFF' },
  pressed: { opacity: 0.92, transform: [{ scale: 0.99 }] },
});
