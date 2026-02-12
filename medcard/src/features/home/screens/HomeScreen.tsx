import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';

import { MainTabParamList, ROUTES } from '../../../core/navigation/routes';

type Props = BottomTabScreenProps<MainTabParamList, typeof ROUTES.Home>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button
        title="Show MedCard"
        onPress={() =>
          navigation.navigate(ROUTES.MedCard, { screen: ROUTES.MedCardShow })
        }
      />
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
