import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';

import { MainTabParamList, ROUTES } from '../../../core/navigation/routes';

type Props = BottomTabScreenProps<MainTabParamList, typeof ROUTES.Checklist>;

export default function ChecklistScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Checklist</Text>
      <Button title="Back Home" onPress={() => navigation.navigate(ROUTES.Home)} />
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
