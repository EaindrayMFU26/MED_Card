import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';

import { MedCardStackParamList, ROUTES } from '../../../core/navigation/routes';

type Props = NativeStackScreenProps<MedCardStackParamList, typeof ROUTES.MedCardShow>;

export default function MedCardShowScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Quick Show</Text>
      <Button
        title="Edit MedCard"
        onPress={() => navigation.navigate(ROUTES.MedCardEdit)}
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
