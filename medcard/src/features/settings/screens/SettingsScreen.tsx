import React, { useState } from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import AppText from "../../../components/atoms/AppText";
import PrimaryButton from "../../../components/atoms/PrimaryButton";
import ToggleRow from "../../../components/atoms/ToggleRow";
import InfoSectionCard from "../../../components/molecules/InfoSectionCard";
import { theme } from "../../../core/theme/theme";
import { MainTabParamList, ROUTES } from "../../../core/navigation/routes";
import { useMedCardStore } from "../../medcard/store/medCardStore";

type Props = BottomTabScreenProps<MainTabParamList, typeof ROUTES.Settings>;

export default function SettingsScreen({ navigation }: Props) {
  const [lockScreen, setLockScreen] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const resetProfile = useMedCardStore((state) => state.resetProfile);
  const resetChecklist = useMedCardStore((state) => state.resetChecklist);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <AppText variant="title">Settings</AppText>
          <AppText variant="body" color={theme.colors.textSecondary}>
            Personalize how your MedCard appears.
          </AppText>
        </View>

        <InfoSectionCard title="Display">
          <View style={styles.fieldStack}>
            <ToggleRow
              label="Lock screen quick access"
              value={lockScreen}
              onValueChange={setLockScreen}
            />
            <ToggleRow
              label="Large text mode"
              value={largeText}
              onValueChange={setLargeText}
            />
          </View>
        </InfoSectionCard>

        <InfoSectionCard title="Data">
          <PrimaryButton
            label="Reset mock data"
            onPress={() => {
              resetProfile();
              resetChecklist();
            }}
          />
        </InfoSectionCard>

        <PrimaryButton label="Back Home" onPress={() => navigation.navigate(ROUTES.Home)} />
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
    padding: theme.spacing.md,
    gap: theme.spacing.md
  },
  header: {
    gap: theme.spacing.xs
  },
  fieldStack: {
    gap: theme.spacing.md
  }
});
