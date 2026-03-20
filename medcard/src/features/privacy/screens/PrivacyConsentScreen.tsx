/**
 * Privacy Consent Screen
 * PDPA Compliance: Users must explicitly consent to data collection and storage
 */

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useMedCardStore } from '../../medcard/store/medCardStore';
import { theme } from '../../../core/theme/theme';
import AppText from '../../../components/atoms/AppText';
import Chip from '../../../components/atoms/Chip';
import ToggleRow from '../../../components/atoms/ToggleRow';
import PrimaryButton from '../../../components/atoms/PrimaryButton';

interface PrivacyConsentScreenProps {
  onConsentAccepted?: () => void;
}

export default function PrivacyConsentScreen({ onConsentAccepted }: PrivacyConsentScreenProps) {
  const [understood, setUnderstood] = useState(false);
  const setUserConsent = useMedCardStore((state) => state.setUserConsent);

  const handleAccept = () => {
    if (understood) {
      setUserConsent(true);
      onConsentAccepted?.();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <AppText style={styles.title}>Privacy & Data Protection</AppText>
        <AppText style={styles.subtitle}>Your data, your control</AppText>
      </View>

      <View style={styles.section}>
        <AppText style={styles.sectionTitle}>📍 Where Your Data Is Stored</AppText>
        <View style={styles.infoBox}>
          <AppText style={styles.infoText}>
            ✓ All your medical information is stored <Chip label="only on your device" tone="muted" />
          </AppText>
          <AppText style={styles.infoText}>
            ✓ Your data is <Chip label="encrypted with AES-256" tone="muted" /> security
          </AppText>
          <AppText style={styles.infoText}>
            ✗ No cloud sync (currently - we'll ask before adding this)
          </AppText>
        </View>
      </View>

      <View style={styles.section}>
        <AppText style={styles.sectionTitle}>🔒 What Data We Collect</AppText>
        <View style={styles.dataList}>
          <AppText style={styles.dataItem}>• Full name & date of birth</AppText>
          <AppText style={styles.dataItem}>• Blood type</AppText>
          <AppText style={styles.dataItem}>• Allergies & medications</AppText>
          <AppText style={styles.dataItem}>• Medical conditions</AppText>
          <AppText style={styles.dataItem}>• Emergency contact information</AppText>
          <AppText style={styles.dataItem}>• Medical notes & history</AppText>
        </View>
      </View>

      <View style={styles.section}>
        <AppText style={styles.sectionTitle}>👤 Your Rights (PDPA)</AppText>
        <View style={styles.rightsList}>
          <AppText style={styles.dataItem}>
            <AppText style={styles.bold}>Right to Access:</AppText> View all your stored data anytime
          </AppText>
          <AppText style={styles.dataItem}>
            <AppText style={styles.bold}>Right to Erasure:</AppText> Permanently delete all your data
          </AppText>
          <AppText style={styles.dataItem}>
            <AppText style={styles.bold}>Right to Export:</AppText> Download your data as a secure file
          </AppText>
        </View>
      </View>

      <View style={styles.section}>
        <AppText style={styles.sectionTitle}>⚠️ Important Notice</AppText>
        <View style={styles.warningBox}>
          <AppText style={styles.warningText}>
            This app stores sensitive health information. We take your privacy seriously and comply with PDPA regulations. However, device security is your responsibility—use a strong device PIN/biometric lock.
          </AppText>
        </View>
      </View>

      <View style={styles.consentSection}>
        <ToggleRow
          label="I understand and consent to store my medical information on this device"
          value={understood}
          onValueChange={setUnderstood}
        />
      </View>

      <PrimaryButton
        label={understood ? 'Get Started' : 'Accept to Continue'}
        onPress={handleAccept}
        disabled={!understood}
        style={styles.button}
      />

      <AppText style={styles.footer}>
        You can change your mind anytime in Settings → Privacy & Data
      </AppText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  header: {
    marginBottom: theme.spacing.lg,
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
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  infoBox: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    lineHeight: 20,
  },
  dataList: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: 8,
  },
  dataItem: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    lineHeight: 20,
  },
  rightsList: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  warningBox: {
    backgroundColor: '#FFF3CD',
    padding: theme.spacing.md,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
  consentSection: {
    marginVertical: theme.spacing.lg,
  },
  button: {
    marginBottom: theme.spacing.md,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  footer: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
});
