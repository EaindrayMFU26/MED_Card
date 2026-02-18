import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import AppText from "../../../components/atoms/AppText";
import Chip from "../../../components/atoms/Chip";
import PrimaryButton from "../../../components/atoms/PrimaryButton";
import EmergencyContactCard from "../../../components/molecules/EmergencyContactCard";
import InfoSectionCard from "../../../components/molecules/InfoSectionCard";
import MedCardHeader from "../../../components/molecules/MedCardHeader";
import { theme } from "../../../core/theme/theme";
import { MedCardStackParamList, ROUTES } from "../../../core/navigation/routes";
import { useMedCardStore } from "../store/medCardStore";

type Props = NativeStackScreenProps<MedCardStackParamList, typeof ROUTES.MedCardShow>;

export default function MedCardShowScreen({ navigation }: Props) {
  const profile = useMedCardStore((state) => state.profile);
  const emergencyContact = profile.emergencyContacts[0];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <MedCardHeader
          name={profile.fullName || "Name"}
          dob={profile.dateOfBirth || "DOB"}
          bloodType={profile.bloodType || "--"}
        />

        <InfoSectionCard title="Allergies">
          <View style={styles.chipRow}>
            {profile.allergies.length > 0 ? (
              profile.allergies.map((allergy) => (
                <Chip key={allergy} label={allergy} />
              ))
            ) : (
              <AppText variant="body" color={theme.colors.textSecondary}>
                None listed
              </AppText>
            )}
          </View>
        </InfoSectionCard>

        <InfoSectionCard title="Conditions">
          <View style={styles.chipRow}>
            {profile.conditions.length > 0 ? (
              profile.conditions.map((condition) => (
                <Chip key={condition} label={condition} tone="muted" />
              ))
            ) : (
              <AppText variant="body" color={theme.colors.textSecondary}>
                None listed
              </AppText>
            )}
          </View>
        </InfoSectionCard>

        <InfoSectionCard title="Medications">
          <View style={styles.listStack}>
            {profile.medications.length > 0 ? (
              profile.medications.map((med) => (
                <AppText key={med} variant="body">
                  - {med}
                </AppText>
              ))
            ) : (
              <AppText variant="body" color={theme.colors.textSecondary}>
                None listed
              </AppText>
            )}
          </View>
        </InfoSectionCard>

        <EmergencyContactCard
          name={emergencyContact?.name || "Emergency contact"}
          relationship={emergencyContact?.relation || ""}
          phone={emergencyContact?.phone || ""}
        />

        <PrimaryButton 
          label="Call Emergency Contact" 
          onPress={() => {}} 
          style={styles.callButton} 
        />

        <Pressable 
          onPress={() => navigation.navigate(ROUTES.MedCardEdit)}
          style={({ pressed }) => [
            styles.editButton,
            pressed && styles.editButtonPressed
          ]}
        >
          <AppText variant="subtitle" color={theme.colors.primary}>
            Edit MedCard
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
    gap: 12
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm
  },
  listStack: {
    gap: theme.spacing.xs
  },
  callButton: {
    backgroundColor: theme.colors.danger,
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.sm
  },
  editButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    alignItems: "center"
  },
  editButtonPressed: {
    opacity: 0.7
  }
});
