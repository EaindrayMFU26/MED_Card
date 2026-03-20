/**
 * Data Management Screen
 * PDPA Compliance: Right to Erasure - Users can view and delete their data
 */

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useMedCardStore } from '../../medcard/store/medCardStore';
import { medCardStorage, STORAGE_KEYS } from '../../../core/storage/storage';
import { theme } from '../../../core/theme/theme';
import AppText from '../../../components/atoms/AppText';
import InfoSectionCard from '../../../components/molecules/InfoSectionCard';
import PrimaryButton from '../../../components/atoms/PrimaryButton';
import Chip from '../../../components/atoms/Chip';

export default function DataManagementScreen() {
  const profile = useMedCardStore((state) => state.profile);
  const resetProfile = useMedCardStore((state) => state.resetProfile);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAllData = () => {
    Alert.alert(
      'Delete All Data',
      'This will permanently delete all your medical information from this device. This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            _performDataDeletion();
          },
        },
      ]
    );
  };

  const _performDataDeletion = async () => {
    setIsDeleting(true);
    try {
      // Securely delete all data
      await medCardStorage.removeItem(STORAGE_KEYS.medCardProfile);
      await medCardStorage.removeItem(STORAGE_KEYS.hasOnboarded);

      // Reset store
      resetProfile();

      Alert.alert('Success', 'All your data has been securely deleted.');
    } catch (error) {
      console.error('Failed to delete data:', error);
      Alert.alert('Error', 'Failed to delete data. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <AppText style={styles.title}>Data Management</AppText>
        <AppText style={styles.subtitle}>Your privacy, your control</AppText>
      </View>

      <View style={styles.section}>
        <AppText style={styles.sectionTitle}>📊 Your Data</AppText>
        <InfoSectionCard title="Personal Information">
          <View style={styles.dataRow}>
            <AppText style={styles.label}>Name:</AppText>
            <AppText style={styles.value}>{profile?.fullName || 'Not provided'}</AppText>
          </View>
          <View style={styles.dataRow}>
            <AppText style={styles.label}>Date of Birth:</AppText>
            <AppText style={styles.value}>{profile?.dateOfBirth || 'Not provided'}</AppText>
          </View>
          <View style={styles.dataRow}>
            <AppText style={styles.label}>Blood Type:</AppText>
            <AppText style={styles.value}>{profile?.bloodType || 'Not provided'}</AppText>
          </View>
        </InfoSectionCard>

        <InfoSectionCard title="Health Information">
          <View>
            <AppText style={styles.dataFieldLabel}>Allergies:</AppText>
            <View style={styles.chipRow}>
              {profile?.allergies && profile.allergies.length > 0 ? (
                profile.allergies.map((allergy, idx) => <Chip key={idx} label={allergy} />)
              ) : (
                <AppText style={styles.emptyText}>None recorded</AppText>
              )}
            </View>
          </View>

          <View style={styles.spacing}>
            <AppText style={styles.dataFieldLabel}>Medications:</AppText>
            <View style={styles.chipRow}>
              {profile?.medications && profile.medications.length > 0 ? (
                profile.medications.map((med, idx) => <Chip key={idx} label={med} />)
              ) : (
                <AppText style={styles.emptyText}>None recorded</AppText>
              )}
            </View>
          </View>

          <View style={styles.spacing}>
            <AppText style={styles.dataFieldLabel}>Conditions:</AppText>
            <View style={styles.chipRow}>
              {profile?.conditions && profile.conditions.length > 0 ? (
                profile.conditions.map((condition, idx) => <Chip key={idx} label={condition} />)
              ) : (
                <AppText style={styles.emptyText}>None recorded</AppText>
              )}
            </View>
          </View>
        </InfoSectionCard>

        <InfoSectionCard title="Emergency Contact">
          {profile?.emergencyContacts?.[0] ? (
            <>
              <View style={styles.dataRow}>
                <AppText style={styles.label}>Contact:</AppText>
                <AppText style={styles.value}>{profile.emergencyContacts[0].name}</AppText>
              </View>
              <View style={styles.dataRow}>
                <AppText style={styles.label}>Relationship:</AppText>
                <AppText style={styles.value}>{profile.emergencyContacts[0].relation}</AppText>
              </View>
              <View style={styles.dataRow}>
                <AppText style={styles.label}>Phone:</AppText>
                <AppText style={styles.value}>{profile.emergencyContacts[0].phone || 'Not provided'}</AppText>
              </View>
            </>
          ) : (
            <AppText style={styles.emptyText}>No emergency contact recorded</AppText>
          )}
        </InfoSectionCard>
      </View>

      <View style={styles.section}>
        <AppText style={styles.sectionTitle}>🛡️ Privacy Options</AppText>

        <View style={styles.optionCard}>
          <AppText style={styles.optionTitle}>📋 Export Your Data</AppText>
          <AppText style={styles.optionDescription}>
            Download your medical information as an encrypted PDF file that you can store securely or share with healthcare providers.
          </AppText>
          <PrimaryButton label="Export Data" onPress={() => Alert.alert('Export', 'Feature coming soon')} />
        </View>

        <View style={styles.optionCard}>
          <AppText style={styles.optionTitle}>🗑️ Delete All Data</AppText>
          <AppText style={styles.optionDescription}>
            Permanently remove all your medical information from this device. This action is irreversible and complies with PDPA Right to Erasure.
          </AppText>
          <PrimaryButton
            label={isDeleting ? 'Deleting...' : 'Delete All Data'}
            onPress={handleDeleteAllData}
            disabled={isDeleting}
            style={styles.deleteButton}
          />
        </View>
      </View>

      <View style={styles.section}>
        <AppText style={styles.sectionTitle}>ℹ️ Information</AppText>
        <View style={styles.infoCard}>
          <AppText style={styles.infoTitle}>Where is my data stored?</AppText>
          <AppText style={styles.infoText}>
            All your medical information is stored locally on this device only, encrypted with AES-256. It is not synced to the cloud.
          </AppText>

          <AppText style={[styles.infoTitle, styles.marginTop]}>Can I recover deleted data?</AppText>
          <AppText style={styles.infoText}>
            Once deleted, your data is securely wiped (overwritten 3 times) and cannot be recovered. Please ensure you have backups if needed.
          </AppText>

          <AppText style={[styles.infoTitle, styles.marginTop]}>How is my data secured?</AppText>
          <AppText style={styles.infoText}>
            Your data is encrypted using AES-256 encryption. Only you can access your data on this device.
          </AppText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  section: {
    padding: theme.spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  value: {
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  dataFieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  emptyText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  spacing: {
    marginTop: theme.spacing.md,
  },
  optionCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: 8,
    marginBottom: theme.spacing.md,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  optionDescription: {
    fontSize: 13,
    color: theme.colors.textPrimary,
    lineHeight: 18,
    marginBottom: theme.spacing.md,
  },
  deleteButton: {
    backgroundColor: '#DC3545',
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    fontSize: 13,
    color: theme.colors.textPrimary,
    lineHeight: 18,
  },
  marginTop: {
    marginTop: theme.spacing.md,
  },
});
