import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import AppText from "../atoms/AppText";
import { theme } from "../../core/theme/theme";

type InfoSectionCardProps = ViewProps & {
  title: string;
  children: React.ReactNode;
};

export default function InfoSectionCard({
  title,
  children,
  style,
  ...props
}: InfoSectionCardProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      <AppText variant="subtitle">{title}</AppText>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16
  }
});
