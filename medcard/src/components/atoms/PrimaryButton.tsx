import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";

import AppText from "./AppText";
import { theme } from "../../core/theme/theme";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
};

export default function PrimaryButton({
  label,
  onPress,
  disabled = false,
  style
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.buttonPressed,
        disabled && styles.buttonDisabled,
        style
      ]}
    >
      <AppText variant="subtitle" color={theme.colors.surface}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    alignItems: "center"
  },
  buttonPressed: {
    opacity: 0.85
  },
  buttonDisabled: {
    opacity: 0.6
  }
});
