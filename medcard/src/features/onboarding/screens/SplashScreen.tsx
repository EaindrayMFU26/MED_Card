import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ROUTES, RootStackParamList } from '../../../core/navigation/routes';
import { medCardStorage, STORAGE_KEYS } from '../../../core/storage/storage';
import { ONBOARDING } from '../../../core/constants/appConstants';
import PrimaryButton from '../../../components/atoms/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.Splash>;

export default function SplashScreen({ navigation }: Props) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const checkOnboarding = async () => {
      try {
        const hasOnboarded = await medCardStorage.getItem(STORAGE_KEYS.hasOnboarded);

        // Check if component is still mounted
        if (abortController.signal.aborted) {
          return;
        }

        if (hasOnboarded === ONBOARDING.completedFlag) {
          navigation.replace(ROUTES.MainTabs);
        } else {
          navigation.replace(ROUTES.Onboarding);
        }
      } catch (err) {
        console.error('Failed to check onboarding status:', err);
        if (!abortController.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Failed to load app');
        }
      }
    };

    // Add small delay to ensure smooth transition
    const timeoutId = setTimeout(() => {
      checkOnboarding();
    }, 500);

    return () => {
      abortController.abort();
      clearTimeout(timeoutId);
    };
  }, [navigation]);

  const handleRetry = () => {
    setError(null);
    navigation.replace(ROUTES.Splash);
  };

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>⚠️ Error</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <PrimaryButton label="Retry" onPress={handleRetry} style={styles.retryButton} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Splash</Text>
      <Text style={styles.body}>Checking your onboarding status...</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#DC3545',
  },
  errorMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  body: {
    fontSize: 14,
    color: '#475569',
  },
});
