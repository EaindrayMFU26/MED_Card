import React from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import AppText from "../../../components/atoms/AppText";
import PrimaryButton from "../../../components/atoms/PrimaryButton";
import { theme } from "../../../core/theme/theme";
import { MainTabParamList, ROUTES } from "../../../core/navigation/routes";
import { useMedCardStore } from "../../medcard/store/medCardStore";

type Props = BottomTabScreenProps<MainTabParamList, typeof ROUTES.Home>;

export default function HomeScreen({ navigation }: Props) {
  const profile = useMedCardStore((state) => state.profile);
  const checklist = useMedCardStore((state) => state.checklist);
  const completedCount = checklist.filter((item) => item.checked).length;
  const totalCount = checklist.length || 1;
  const progress = Math.min(completedCount / totalCount, 1);
  const firstName = profile.fullName.trim().split(" ")[0] || "there";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <AppText variant="title">Hi {firstName},</AppText>
          <AppText variant="body" color={theme.colors.textSecondary}>
            Keep your medical info ready in seconds.
          </AppText>
        </View>

        <PrimaryButton
          label="Show My MedCard"
          onPress={() =>
            navigation.navigate(ROUTES.MedCard, { screen: ROUTES.MedCardShow })
          }
          style={styles.primaryButton}
        />

        <View style={styles.sectionCard}>
          <View style={styles.progressHeader}>
            <AppText variant="subtitle">Checklist Progress</AppText>
            <AppText variant="body" color={theme.colors.textSecondary}>
              {completedCount}/{totalCount} completed
            </AppText>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
        </View>

        <Pressable
          onPress={() =>
            navigation.navigate(ROUTES.MedCard, { screen: ROUTES.MedCardEdit })
          }
          style={styles.linkRow}
        >
          <AppText variant="body" color={theme.colors.primary}>
            Quick edit my card
          </AppText>
        </Pressable>
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
    gap: 20,
    paddingTop: theme.spacing.md
  },
  header: {
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.xs
  },
  primaryButton: {
    paddingVertical: theme.spacing.md + 4
  },
  sectionCard: {
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
  linkRow: {
    alignSelf: "flex-start"
  }
});
