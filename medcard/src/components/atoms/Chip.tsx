import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "./AppText";
import { theme } from "../../core/theme/theme";

type ChipTone = "default" | "accent" | "muted";

type ChipProps = {
  label: string;
  tone?: ChipTone;
};

const toneStyles: Record<ChipTone, { backgroundColor: string; color: string }> = {
  default: {
    backgroundColor: theme.colors.primaryMuted,
    color: theme.colors.primary
  },
  accent: {
    backgroundColor: theme.colors.accent,
    color: theme.colors.surface
  },
  muted: {
    backgroundColor: theme.colors.border,
    color: theme.colors.textSecondary
  }
};

export default function Chip({ label, tone = "default" }: ChipProps) {
  const palette = toneStyles[tone];
  return (
    <View style={[styles.container, { backgroundColor: palette.backgroundColor }]}>
      <AppText variant="caption" color={palette.color} style={styles.label}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.lg,
    maxWidth: "100%"
  },
  label: {
    flexShrink: 1
  }
});
