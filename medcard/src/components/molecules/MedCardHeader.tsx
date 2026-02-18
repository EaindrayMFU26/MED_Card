import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../atoms/AppText";
import Chip from "../atoms/Chip";
import { theme } from "../../core/theme/theme";

type MedCardHeaderProps = {
  name: string;
  dob: string;
  bloodType: string;
};

export default function MedCardHeader({
  name,
  dob,
  bloodType
}: MedCardHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AppText variant="title" style={styles.name}>
          {name}
        </AppText>
        <Chip label={bloodType} tone="accent" />
      </View>
      <AppText variant="caption" color={theme.colors.textSecondary}>
        DOB: {dob}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xs
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing.md,
    flexWrap: "wrap"
  },
  name: {
    flexShrink: 1
  }
});
