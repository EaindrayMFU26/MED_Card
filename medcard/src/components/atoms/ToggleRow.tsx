import React from "react";
import { StyleSheet, Switch, View } from "react-native";

import AppText from "./AppText";
import { theme } from "../../core/theme/theme";

type ToggleRowProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export default function ToggleRow({
  label,
  value,
  onValueChange
}: ToggleRowProps) {
  return (
    <View style={styles.row}>
      <AppText variant="body">{label}</AppText>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: theme.colors.border,
          true: theme.colors.primaryMuted
        }}
        thumbColor={value ? theme.colors.primary : theme.colors.textSecondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing.md
  }
});
