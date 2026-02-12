import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { ROUTES, RootStackParamList } from '../../../core/navigation/routes';
import { medCardStorage, STORAGE_KEYS } from '../../../core/storage/storage';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.Splash>;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    let isActive = true;

    const checkOnboarding = async () => {
      const hasOnboarded = await medCardStorage.getItem(
        STORAGE_KEYS.hasOnboarded
      );
      if (!isActive) {
        return;
      }

      if (hasOnboarded === 'true') {
        navigation.replace(ROUTES.MainTabs);
        return;
      }

      navigation.replace(ROUTES.Onboarding);
    };

    checkOnboarding();

    return () => {
      isActive = false;
    };
  }, [navigation]);

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
