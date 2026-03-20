import React, { useMemo, useState } from "react";
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
import { useMedCardForm } from "../../hooks/useMedCardForm";
import { MEDICATIONS_SEPARATOR } from "../../../core/constants/appConstants";

type Props = NativeStackScreenProps<MedCardStackParamList, typeof ROUTES.MedCardEdit>;

export default function MedCardEditScreen({ navigation }: Props) {
  const profile = useMedCardStore((state) => state.profile);
  const {
    formData,
    setFormData,
    errors,
    addChip,
    removeChip,
    handleSave,
  } = useMedCardForm(profile);
  const [allergyInput, setAllergyInput] = useState("");
  const [conditionInput, setConditionInput] = useState("");

  const canSave = useMemo(
    () => formData.name.trim().length > 0 && formData.dob.trim().length > 0,
    [formData.name, formData.dob]
  );

  const onSavePress = async () => {
    const success = await handleSave();
    if (success) {
      navigation.goBack();
    }
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
            <InputField
              label="Full name"
              value={formData.name}
              onChangeText={(name) => setFormData({ name })}
            />
            {errors.name ? (
              <AppText variant="caption" color={theme.colors.danger}>
                {errors.name}
              </AppText>
            ) : null}
            <InputField
              label="Date of birth (YYYY-MM-DD)"
              value={formData.dob}
              onChangeText={(dob) => setFormData({ dob })}
              placeholder="1990-01-01"
            />
            {errors.dob ? (
              <AppText variant="caption" color={theme.colors.danger}>
                {errors.dob}
              </AppText>
            ) : null}
            <InputField
              label="Blood type"
              value={formData.bloodType}
              onChangeText={(bloodType) => setFormData({ bloodType })}
            />
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
              onPress={() => {
                addChip("allergies", allergyInput);
                setAllergyInput("");
              }}
            />
            <View style={styles.chipRow}>
              {formData.allergies.map((item, index) => (
                <Pressable
                  key={item}
                  onPress={() => removeChip("allergies", index)}
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
              onPress={() => {
                addChip("conditions", conditionInput);
                setConditionInput("");
              }}
            />
            <View style={styles.chipRow}>
              {formData.conditions.map((item, index) => (
                <Pressable
                  key={item}
                  onPress={() => removeChip("conditions", index)}
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
            value={formData.medications.join(`${MEDICATIONS_SEPARATOR} `)}
            onChangeText={(value) =>
              setFormData({
                medications: value
                  .split(MEDICATIONS_SEPARATOR)
                  .map((item) => item.trim())
                  .filter(Boolean),
              })
            }
            multiline
          />
        </InfoSectionCard>

        <InfoSectionCard title="Emergency Contact">
          <View style={styles.fieldStack}>
            <InputField
              label="Contact name"
              value={formData.emergencyName}
              onChangeText={(emergencyName) => setFormData({ emergencyName })}
            />
            <InputField
              label="Relationship"
              value={formData.emergencyRelation}
              onChangeText={(emergencyRelation) => setFormData({ emergencyRelation })}
            />
            <InputField
              label="Phone"
              value={formData.emergencyPhone}
              onChangeText={(emergencyPhone) => setFormData({ emergencyPhone })}
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
            value={formData.notes}
            onChangeText={(notes) => setFormData({ notes })}
            multiline
          />
        </InfoSectionCard>

        {errors.submit ? (
          <AppText variant="caption" color={theme.colors.danger}>
            {errors.submit}
          </AppText>
        ) : null}

        <PrimaryButton label="Save changes" onPress={onSavePress} disabled={!canSave} />
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
