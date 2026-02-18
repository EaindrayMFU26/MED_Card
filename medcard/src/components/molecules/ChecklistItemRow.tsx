import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import AppText from "../atoms/AppText";
import { theme } from "../../core/theme/theme";

type ChecklistItemRowProps = {
  label: string;
  required?: boolean;
  checked: boolean;
  onToggle: () => void;
};

export default function ChecklistItemRow({
  label,
  required = false,
  checked,
  onToggle
}: ChecklistItemRowProps) {
  return (
    <Pressable onPress={onToggle} style={styles.row}>
      <View style={[styles.box, checked && styles.boxChecked]} />
      <View style={styles.textStack}>
        <AppText variant="body">{label}</AppText>
        {required ? (
          <AppText variant="caption" color={theme.colors.textSecondary}>
            Required
          </AppText>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: theme.spacing.md
  },
  box: {
    width: 18,
    height: 18,
    borderRadius: theme.radius.sm,
    borderWidth: 2,
    borderColor: theme.colors.primary
  },
  boxChecked: {
    backgroundColor: theme.colors.primary
  },
  textStack: {
    gap: theme.spacing.xs,
    flexShrink: 1,
    flex: 1
  }
});
