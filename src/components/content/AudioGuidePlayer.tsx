import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, shadows, spacing } from '../../theme';
import { AppText, GlassSurface, Icon, ProgressBar } from '../ui';

export type AudioGuideChapter = {
  title: string;
  durationSeconds?: number;
};

export type AudioGuidePlayerProps = {
  title?: string;
  subtitle?: string;
  progress: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  chapters?: AudioGuideChapter[];
  currentIndex?: number;
  onSelectChapter?: (index: number) => void;
  speed?: number;
  onCycleSpeed?: () => void;
  elapsedSeconds?: number;
  totalDurationSeconds?: number;
  tone?: 'default' | 'urgent';
  defaultExpanded?: boolean;
};

export type AudioGuideDockProps = {
  chapterTitle: string;
  partLabel: string;
  isPlaying: boolean;
  canPrevious?: boolean;
  canNext?: boolean;
  onPlayPause: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  tone?: 'default' | 'urgent';
};

export function formatAudioTime(seconds: number): string {
  const safe = Math.max(0, Math.round(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export function AudioGuidePlayer({
  title = 'Escuchar guía por secciones',
  subtitle,
  progress,
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  chapters = [],
  currentIndex = 0,
  onSelectChapter,
  speed = 1,
  onCycleSpeed,
  elapsedSeconds,
  totalDurationSeconds,
  tone = 'default',
  defaultExpanded = false,
}: AudioGuidePlayerProps) {
  const [chaptersOpen, setChaptersOpen] = useState(defaultExpanded);

  const isUrgent = tone === 'urgent';
  const accent = isUrgent ? colors.error : colors.primary;
  const accentSoft = isUrgent ? colors.errorSoft : colors.primarySoft;

  const totalChapters = chapters.length;
  const safeIndex = totalChapters > 0 ? Math.min(Math.max(currentIndex, 0), totalChapters - 1) : 0;
  const activeChapter = chapters[safeIndex];
  const hasStarted = isPlaying || safeIndex > 0 || progress > 0;

  const estimatedMinutes = totalDurationSeconds
    ? Math.max(1, Math.ceil(totalDurationSeconds / 60))
    : undefined;

  const eyebrowText = totalChapters > 0
    ? hasStarted
      ? `Capítulo ${safeIndex + 1} de ${totalChapters}`
      : `${totalChapters} capítulos${estimatedMinutes ? ` · ~${estimatedMinutes} min` : ''}`
    : isPlaying
      ? 'Reproduciendo guía'
      : 'Audio de la guía';

  const headingText = totalChapters > 0 && hasStarted && activeChapter
    ? activeChapter.title
    : subtitle ?? title;

  const canGoPrev = Boolean(onPrevious) && (totalChapters === 0 || safeIndex > 0);
  const canGoNext = Boolean(onNext) && (totalChapters === 0 || safeIndex < totalChapters - 1);

  return (
    <GlassSurface style={styles.card}>
      <View style={styles.main}>
        <View style={styles.topRow}>
          <View style={[styles.iconBox, { backgroundColor: accentSoft }]}>
            <Icon name="headset-outline" size={20} color={accent} />
          </View>

          <View style={styles.info}>
            <AppText variant="label" color={accent} style={styles.eyebrow} numberOfLines={1}>
              {eyebrowText}
            </AppText>
            <AppText variant="body" weight="semibold" numberOfLines={1} style={styles.heading}>
              {headingText}
            </AppText>
          </View>

          {onCycleSpeed && (
            <Pressable
              onPress={onCycleSpeed}
              accessibilityRole="button"
              accessibilityLabel={`Velocidad de lectura ${speed}x. Pulsa para cambiar`}
              hitSlop={6}
              style={({ pressed }) => [styles.speedPill, pressed && styles.pressed]}
            >
              <AppText variant="caption" weight="bold" style={styles.tabular}>
                {speed}×
              </AppText>
            </Pressable>
          )}

          <Pressable
            onPress={onPlayPause}
            accessibilityRole="button"
            accessibilityLabel={isPlaying ? 'Detener la lectura' : 'Escuchar la guía'}
            hitSlop={6}
            style={({ pressed }) => [
              styles.playButton,
              { backgroundColor: accent },
              !isUrgent && shadows.button,
              pressed && styles.pressed,
            ]}
          >
            <Icon name={isPlaying ? 'stop' : 'play'} size={19} color={colors.white} />
          </Pressable>
        </View>

        <View style={styles.progressBlock}>
          <ProgressBar
            progress={progress}
            height={5}
            color={accent}
            accessibilityLabel="Progreso del audio"
          />

          {(elapsedSeconds !== undefined || totalDurationSeconds !== undefined || onPrevious || onNext) && (
            <View style={styles.metaRow}>
              <AppText variant="caption" color={colors.textSecondary} style={styles.tabular}>
                {elapsedSeconds !== undefined ? formatAudioTime(elapsedSeconds) : `${Math.round(progress * 100)}%`}
              </AppText>

              {(onPrevious || onNext) && totalChapters === 0 && (
                <View style={styles.inlineNav}>
                  <Pressable
                    onPress={onPrevious}
                    disabled={!canGoPrev}
                    accessibilityRole="button"
                    accessibilityLabel="Parte anterior"
                    hitSlop={8}
                    style={({ pressed }) => [styles.miniNavBtn, !canGoPrev && styles.disabled, pressed && styles.pressed]}
                  >
                    <Icon name="play-skip-back" size={16} color={colors.text} />
                  </Pressable>
                  <Pressable
                    onPress={onNext}
                    disabled={!canGoNext}
                    accessibilityRole="button"
                    accessibilityLabel="Parte siguiente"
                    hitSlop={8}
                    style={({ pressed }) => [styles.miniNavBtn, !canGoNext && styles.disabled, pressed && styles.pressed]}
                  >
                    <Icon name="play-skip-forward" size={16} color={colors.text} />
                  </Pressable>
                </View>
              )}

              <AppText variant="caption" color={colors.textSecondary} style={styles.tabular}>
                {totalDurationSeconds !== undefined ? `~${formatAudioTime(totalDurationSeconds)}` : ''}
              </AppText>
            </View>
          )}
        </View>
      </View>

      {totalChapters > 0 && (
        <>
          <Pressable
            onPress={() => setChaptersOpen((open) => !open)}
            accessibilityRole="button"
            accessibilityState={{ expanded: chaptersOpen }}
            accessibilityLabel={chaptersOpen ? 'Ocultar capítulos' : `Ver ${totalChapters} capítulos de la guía`}
            style={({ pressed }) => [styles.chaptersToggle, pressed && styles.pressed]}
          >
            <AppText variant="caption" weight="bold" color={accent}>
              {chaptersOpen ? 'Ocultar capítulos' : `Ver ${totalChapters} capítulos de la guía`}
            </AppText>
            <Icon name={chaptersOpen ? 'chevron-up' : 'chevron-down'} size={16} color={accent} />
          </Pressable>

          {chaptersOpen && (
            <View style={styles.chaptersList}>
              {chapters.map((chapter, idx) => {
                const isCurrent = idx === safeIndex;
                return (
                  <Pressable
                    key={`${idx}-${chapter.title}`}
                    onPress={() => onSelectChapter?.(idx)}
                    disabled={!onSelectChapter}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isCurrent }}
                    accessibilityLabel={`Capítulo ${idx + 1}: ${chapter.title}`}
                    style={({ pressed }) => [
                      styles.chapterRow,
                      idx > 0 && styles.chapterBorder,
                      isCurrent && { backgroundColor: accentSoft },
                      pressed && styles.pressed,
                    ]}
                  >
                    <View
                      style={[
                        styles.chapterNum,
                        isCurrent && { backgroundColor: accent, borderColor: accent },
                      ]}
                    >
                      <AppText
                        variant="caption"
                        weight="bold"
                        color={isCurrent ? colors.white : colors.textSecondary}
                        style={styles.chapterNumText}
                      >
                        {idx + 1}
                      </AppText>
                    </View>
                    <AppText
                      variant="bodySmall"
                      weight={isCurrent ? 'semibold' : 'regular'}
                      color={isCurrent ? colors.text : colors.textSecondary}
                      numberOfLines={1}
                      style={styles.chapterTitle}
                    >
                      {chapter.title}
                    </AppText>
                    {chapter.durationSeconds !== undefined && (
                      <AppText variant="caption" color={colors.textSecondary} style={styles.tabular}>
                        {formatAudioTime(chapter.durationSeconds)}
                      </AppText>
                    )}
                  </Pressable>
                );
              })}
            </View>
          )}
        </>
      )}
    </GlassSurface>
  );
}

export function AudioGuideDock({
  chapterTitle,
  partLabel,
  isPlaying,
  canPrevious = true,
  canNext = true,
  onPlayPause,
  onPrevious,
  onNext,
  tone = 'default',
}: AudioGuideDockProps) {
  const isUrgent = tone === 'urgent';
  const accent = isUrgent ? colors.error : colors.primary;
  const accentSoft = isUrgent ? colors.errorSoft : colors.primarySoft;

  return (
    <GlassSurface elevated style={[styles.dock, shadows.raised]}>
      <View style={[styles.dockIcon, { backgroundColor: accentSoft }]}>
        <Icon name="headset-outline" size={18} color={accent} />
      </View>

      <View style={styles.dockInfo}>
        <AppText variant="label" color={accent} style={styles.dockEyebrow} numberOfLines={1}>
          {partLabel}
        </AppText>
        <AppText variant="bodySmall" weight="semibold" numberOfLines={1}>
          {chapterTitle}
        </AppText>
      </View>

      <View style={styles.dockControls}>
        {onPrevious && (
          <Pressable
            onPress={onPrevious}
            disabled={!canPrevious}
            accessibilityRole="button"
            accessibilityLabel="Parte anterior"
            hitSlop={6}
            style={({ pressed }) => [
              styles.dockSmallBtn,
              { backgroundColor: accentSoft },
              !canPrevious && styles.disabled,
              pressed && styles.pressed,
            ]}
          >
            <Icon name="play-skip-back" size={15} color={colors.text} />
          </Pressable>
        )}

        <Pressable
          onPress={onPlayPause}
          accessibilityRole="button"
          accessibilityLabel={isPlaying ? 'Detener lectura' : 'Reproducir lectura'}
          hitSlop={6}
          style={({ pressed }) => [
            styles.dockMainBtn,
            { backgroundColor: accent },
            !isUrgent && shadows.button,
            pressed && styles.pressed,
          ]}
        >
          <Icon name={isPlaying ? 'stop' : 'play'} size={16} color={colors.white} />
        </Pressable>

        {onNext && (
          <Pressable
            onPress={onNext}
            disabled={!canNext}
            accessibilityRole="button"
            accessibilityLabel="Parte siguiente"
            hitSlop={6}
            style={({ pressed }) => [
              styles.dockSmallBtn,
              { backgroundColor: accentSoft },
              !canNext && styles.disabled,
              pressed && styles.pressed,
            ]}
          >
            <Icon name="play-skip-forward" size={15} color={colors.text} />
          </Pressable>
        )}
      </View>
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    overflow: 'hidden',
  },
  main: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  info: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  eyebrow: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  heading: {
    fontSize: 15.5,
    lineHeight: 21,
  },
  speedPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  playButton: {
    width: 46,
    height: 46,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  progressBlock: {
    gap: spacing.xs + 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inlineNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  miniNavBtn: {
    minWidth: 32,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabular: {
    fontVariant: ['tabular-nums'],
  },
  chaptersToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: 11,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.glassSoft,
  },
  chaptersList: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  chapterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
    paddingVertical: 11,
    minHeight: 44,
  },
  chapterBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  chapterNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  chapterNumText: {
    fontSize: 11.5,
    lineHeight: 14,
  },
  chapterTitle: {
    flex: 1,
  },
  dock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 2,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
  },
  dockIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  dockInfo: {
    flex: 1,
    minWidth: 0,
  },
  dockEyebrow: {
    fontSize: 10.5,
    lineHeight: 13,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  dockControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dockSmallBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dockMainBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.72,
  },
  disabled: {
    opacity: 0.35,
  },
});
