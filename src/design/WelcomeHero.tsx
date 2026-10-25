import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { AppText, Icon } from '../components/ui';
import { gradient } from './screen';

export function WelcomeHero({ expanded, compact }: { expanded: boolean; compact: boolean }) {
  return (
    <View style={[styles.hero, expanded && styles.expanded]}>
      <View pointerEvents="none" style={styles.reflection} />
      <View style={[styles.copy, expanded && styles.copyExpanded, compact && styles.copyCompact]}>
        <AppText variant="sectionLabel" color="#C4E1D0" style={styles.eyebrow}>JUNTOS, EN CADA ETAPA</AppText>
        <AppText variant="h1" color="#F5FAF2" style={[styles.title, expanded && styles.titleExpanded]}>
          Su bienestar,{ '\n' }en buenas manos.
        </AppText>
        {expanded && <AppText color="#D5E7DD" style={styles.description}>
          Conoce sus señales, acompaña sus cuidados y encuentra apoyo cuando lo necesites.
        </AppText>}
      </View>
      <Image source={require('../../assets/companions.svg')} contentFit="contain" accessible={false}
        style={[styles.illustration, expanded && styles.illustrationExpanded, compact && styles.illustrationCompact]} />
      {expanded && <View style={styles.note}>
        <View style={styles.noteIcon}><Icon name="heart-outline" size={20} color="#E2EFDA" /></View>
        <View style={styles.noteCopy}>
          <AppText variant="label" color="#F5FAF2">Un pequeño gesto. Un gran cuidado.</AppText>
          <AppText variant="caption" color="#D5E7DD">Todo empieza por estar a su lado.</AppText>
        </View>
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 158, padding: 22, borderRadius: 26, overflow: 'hidden',
    backgroundColor: '#245C49', ...gradient('linear-gradient(135deg, #173E32, #34795E)'),
    borderWidth: 1, borderColor: '#508B70', boxShadow: '0 12px 32px rgba(28, 75, 55, 0.13)',
    justifyContent: 'center',
  },
  expanded: { flex: 1, minHeight: 600, padding: 36, justifyContent: 'flex-start', borderRadius: 32 },
  reflection: {
    position: 'absolute', width: 370, height: 370, borderRadius: 185, top: -205, left: -110,
    backgroundColor: 'rgba(217, 243, 217, 0.045)', borderWidth: 1, borderColor: 'rgba(238, 255, 239, 0.12)',
  },
  copy: { gap: 12, maxWidth: '75%', zIndex: 1 },
  copyCompact: { maxWidth: '100%' },
  copyExpanded: { maxWidth: '100%', gap: 20 },
  eyebrow: { fontSize: 9, letterSpacing: 1.5 },
  title: { fontSize: 25, lineHeight: 31, letterSpacing: -0.85 },
  titleExpanded: { fontSize: 42, lineHeight: 49, letterSpacing: -1.6 },
  description: { maxWidth: 340, lineHeight: 25 },
  illustration: { position: 'absolute', width: 154, height: 154, right: -22, bottom: -8, opacity: 0.92 },
  illustrationCompact: { width: 124, height: 124, right: -35, bottom: -26, opacity: 0.25 },
  illustrationExpanded: { width: 290, height: 290, right: 20, bottom: 86, opacity: 1 },
  note: {
    marginTop: 'auto', paddingTop: 320, flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  noteIcon: {
    width: 42, height: 42, borderRadius: 15, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(230, 248, 228, 0.08)', borderWidth: 1, borderColor: 'rgba(230, 248, 228, 0.18)',
  },
  noteCopy: { flex: 1, gap: 4 },
});
