import React, { useMemo } from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import AppText from "../../../components/atoms/AppText";
import PrimaryButton from "../../../components/atoms/PrimaryButton";
import ChecklistItemRow from "../../../components/molecules/ChecklistItemRow";
import InfoSectionCard from "../../../components/molecules/InfoSectionCard";
import { theme } from "../../../core/theme/theme";
import { MainTabParamList, ROUTES } from "../../../core/navigation/routes";
import { useMedCardStore } from "../../medcard/store/medCardStore";

type Props = BottomTabScreenProps<MainTabParamList, typeof ROUTES.Checklist>;

export default function ChecklistScreen({ navigation }: Props) {
  const checklist = useMedCardStore((state) => state.checklist);
  const toggleChecklistItem = useMedCardStore((state) => state.toggleChecklistItem);
  const totalCount = checklist.length || 1;
  const completedCount = checklist.filter((item) => item.checked).length;
  const progress = useMemo(
    () => Math.min(completedCount / totalCount, 1),
    [completedCount, totalCount]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <AppText variant="body" color={theme.colors.textSecondary}>
            Keep everything ready for your visit.
          </AppText>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <AppText variant="subtitle">Progress</AppText>
            <AppText variant="body" color={theme.colors.textSecondary}>
              {completedCount}/{totalCount} completed
            </AppText>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
        </View>

        <View style={styles.listStack}>
          {checklist.map((item) => (
            <ChecklistItemRow
              key={item.id}
              label={item.label}
              required={item.required}
              checked={item.checked}
              onToggle={() => toggleChecklistItem(item.id)}
            />
          ))}
        </View>

        {completedCount === totalCount ? (
          <InfoSectionCard title="Completed!">
            <AppText variant="body">You are all set for your visit.</AppText>
          </InfoSectionCard>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  content: {
    padding: 16,
    gap: 12
  },
  header: {
    gap: theme.spacing.xs
  },
  progressCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.sm
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  progressTrack: {
    height: 8,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.primaryMuted,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    backgroundColor: theme.colors.primary
  },
  listStack: {
    gap: theme.spacing.md
  }
});
