import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';

import { ROUTES, RootStackParamList } from '../../../core/navigation/routes';
import { medCardStorage, STORAGE_KEYS } from '../../../core/storage/storage';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.Onboarding>;

export default function OnboardingScreen({ navigation }: Props) {
  const handleFinish = async () => {
    await medCardStorage.setItem(STORAGE_KEYS.hasOnboarded, 'true');
    navigation.replace(ROUTES.MainTabs);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Onboarding</Text>
      <Button title="Finish Onboarding" onPress={handleFinish} />
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
});
