import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../atoms/AppText";
import InfoSectionCard from "./InfoSectionCard";
import { theme } from "../../core/theme/theme";

type EmergencyContactCardProps = {
  name: string;
  relationship: string;
  phone: string;
};

export default function EmergencyContactCard({
  name,
  relationship,
  phone
}: EmergencyContactCardProps) {
  return (
    <InfoSectionCard title="Emergency Contact">
      <View style={styles.row}>
        <View style={styles.stack}>
          <AppText variant="subtitle">{name}</AppText>
          <AppText variant="caption" color={theme.colors.textSecondary}>
            {relationship}
          </AppText>
        </View>
        <AppText variant="body" style={styles.phone}>
          {phone}
        </AppText>
      </View>
    </InfoSectionCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing.md,
    flexWrap: "wrap"
  },
  stack: {
    gap: theme.spacing.xs,
    flexShrink: 1
  },
  phone: {
    flexShrink: 1,
    textAlign: "right"
  }
});
