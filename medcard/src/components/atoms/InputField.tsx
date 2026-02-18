import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

import AppText from "./AppText";
import { theme } from "../../core/theme/theme";

type InputFieldProps = TextInputProps & {
  label?: string;
};

export default function InputField({ label, style, ...props }: InputFieldProps) {
  return (
    <View style={styles.container}>
      {label ? (
        <AppText variant="caption" color={theme.colors.textSecondary}>
          {label}
        </AppText>
      ) : null}
      <TextInput
        placeholderTextColor={theme.colors.textSecondary}
        style={[styles.input, style]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xs
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    color: theme.colors.textPrimary
  }
});
