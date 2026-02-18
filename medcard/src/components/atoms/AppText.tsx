import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

import { theme } from "../../core/theme/theme";

type TextVariant = keyof typeof theme.text;

type AppTextProps = TextProps & {
  variant?: TextVariant;
  color?: string;
};

export default function AppText({
  variant = "body",
  color = theme.colors.textPrimary,
  style,
  children,
  ...props
}: AppTextProps) {
  return (
    <Text style={[styles.base, theme.text[variant], { color }, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: theme.colors.textPrimary
  }
});
