import React, { useEffect, useMemo, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import AppText from "../../../components/atoms/AppText";
import Chip from "../../../components/atoms/Chip";
import InputField from "../../../components/atoms/InputField";
import PrimaryButton from "../../../components/atoms/PrimaryButton";
import InfoSectionCard from "../../../components/molecules/InfoSectionCard";
import { theme } from "../../../core/theme/theme";
import { MedCardStackParamList, ROUTES } from "../../../core/navigation/routes";
import { useMedCardStore } from "../store/medCardStore";

type Props = NativeStackScreenProps<MedCardStackParamList, typeof ROUTES.MedCardEdit>;

export default function MedCardEditScreen({ navigation }: Props) {
  const profile = useMedCardStore((state) => state.profile);
  const setProfile = useMedCardStore((state) => state.setProfile);
  const contact = profile.emergencyContacts[0];
  const [name, setName] = useState(profile.fullName);
  const [dob, setDob] = useState(profile.dateOfBirth);
  const [bloodType, setBloodType] = useState(profile.bloodType);
  const [allergies, setAllergies] = useState<string[]>([...profile.allergies]);
  const [conditions, setConditions] = useState<string[]>([...profile.conditions]);
  const [meds, setMeds] = useState(profile.medications.join(", "));
  const [emergencyName, setEmergencyName] = useState(contact?.name || "");
  const [emergencyRelation, setEmergencyRelation] = useState(contact?.relation || "");
  const [emergencyPhone, setEmergencyPhone] = useState(contact?.phone || "");
  const [notes, setNotes] = useState(profile.notes);
  const [allergyInput, setAllergyInput] = useState("");
  const [conditionInput, setConditionInput] = useState("");
  const [errors, setErrors] = useState<{ name?: string; dob?: string; emergency?: string }>(
    {}
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setName(profile.fullName);
    setDob(profile.dateOfBirth);
    setBloodType(profile.bloodType);
    setAllergies([...profile.allergies]);
    setConditions([...profile.conditions]);
    setMeds(profile.medications.join(", "));
    setEmergencyName(contact?.name || "");
    setEmergencyRelation(contact?.relation || "");
    setEmergencyPhone(contact?.phone || "");
    setNotes(profile.notes);
  }, [profile, contact]);

  const canSave = useMemo(
    () => name.trim().length > 0 && dob.trim().length > 0,
    [name, dob]
  );

  const addChip = (
    value: string,
    items: string[],
    setItems: (next: string[]) => void,
    setValue: (next: string) => void
  ) => {
    const trimmed = value.trim();
    if (!trimmed || items.includes(trimmed)) {
      setValue("");
      return;
    }
    setItems([...items, trimmed]);
    setValue("");
  };

  const removeChip = (value: string, items: string[], setItems: (next: string[]) => void) => {
    setItems(items.filter((item) => item !== value));
  };

  const handleSave = () => {
    const nextErrors: typeof errors = {};
    if (!name.trim()) {
      nextErrors.name = "Name is required";
    }
    if (!dob.trim()) {
      nextErrors.dob = "Date of birth is required";
    }
    if (!emergencyName.trim() || !emergencyPhone.trim()) {
      nextErrors.emergency = "Emergency contact name + phone are required";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSaved(false);
      return;
    }

    const medicationList = meds
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    setProfile({
      fullName: name.trim(),
      dateOfBirth: dob.trim(),
      bloodType: bloodType.trim(),
      allergies,
      conditions,
      medications: medicationList,
      emergencyContacts: [
        {
          name: emergencyName.trim(),
          phone: emergencyPhone.trim(),
          relation: emergencyRelation.trim() || "Contact"
        }
      ],
      notes: notes.trim()
    });
    setSaved(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <AppText variant="title">Edit MedCard</AppText>
          <AppText variant="body" color={theme.colors.textSecondary}>
            Update the details you want ready for quick access.
          </AppText>
        </View>

        <InfoSectionCard title="Identity">
          <View style={styles.fieldStack}>
            <InputField label="Full name" value={name} onChangeText={setName} />
            {errors.name ? (
              <AppText variant="caption" color={theme.colors.danger}>
                {errors.name}
              </AppText>
            ) : null}
            <InputField label="Date of birth" value={dob} onChangeText={setDob} />
            {errors.dob ? (
              <AppText variant="caption" color={theme.colors.danger}>
                {errors.dob}
              </AppText>
            ) : null}
            <InputField label="Blood type" value={bloodType} onChangeText={setBloodType} />
          </View>
        </InfoSectionCard>

        <InfoSectionCard title="Allergies">
          <View style={styles.fieldStack}>
            <InputField
              label="Add allergy"
              value={allergyInput}
              onChangeText={setAllergyInput}
            />
            <PrimaryButton
              label="Add allergy"
              onPress={() => addChip(allergyInput, allergies, setAllergies, setAllergyInput)}
            />
            <View style={styles.chipRow}>
              {allergies.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => removeChip(item, allergies, setAllergies)}
                >
                  <Chip label={`${item} x`} />
                </Pressable>
              ))}
            </View>
            <AppText variant="caption" color={theme.colors.textSecondary}>
              Tap a chip to remove it.
            </AppText>
          </View>
        </InfoSectionCard>

        <InfoSectionCard title="Conditions">
          <View style={styles.fieldStack}>
            <InputField
              label="Add condition"
              value={conditionInput}
              onChangeText={setConditionInput}
            />
            <PrimaryButton
              label="Add condition"
              onPress={() =>
                addChip(conditionInput, conditions, setConditions, setConditionInput)
              }
            />
            <View style={styles.chipRow}>
              {conditions.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => removeChip(item, conditions, setConditions)}
                >
                  <Chip label={`${item} x`} tone="muted" />
                </Pressable>
              ))}
            </View>
          </View>
        </InfoSectionCard>

        <InfoSectionCard title="Medications">
          <InputField
            label="Medications (comma-separated)"
            value={meds}
            onChangeText={setMeds}
            multiline
          />
        </InfoSectionCard>

        <InfoSectionCard title="Emergency Contact">
          <View style={styles.fieldStack}>
            <InputField
              label="Contact name"
              value={emergencyName}
              onChangeText={setEmergencyName}
            />
            <InputField
              label="Relationship"
              value={emergencyRelation}
              onChangeText={setEmergencyRelation}
            />
            <InputField
              label="Phone"
              value={emergencyPhone}
              onChangeText={setEmergencyPhone}
              keyboardType="phone-pad"
            />
            {errors.emergency ? (
              <AppText variant="caption" color={theme.colors.danger}>
                {errors.emergency}
              </AppText>
            ) : null}
          </View>
        </InfoSectionCard>

        <InfoSectionCard title="Notes">
          <InputField
            label="Care notes"
            value={notes}
            onChangeText={setNotes}
            multiline
          />
        </InfoSectionCard>

        {saved ? (
          <AppText variant="caption" color={theme.colors.success}>
            Changes saved locally.
          </AppText>
        ) : null}

        <PrimaryButton label="Save changes" onPress={handleSave} disabled={!canSave} />
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
  fieldStack: {
    gap: theme.spacing.sm
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm
  }
});
