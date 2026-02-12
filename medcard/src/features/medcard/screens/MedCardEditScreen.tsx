import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';

import { MedCardStackParamList, ROUTES } from '../../../core/navigation/routes';

type Props = NativeStackScreenProps<MedCardStackParamList, typeof ROUTES.MedCardEdit>;

export default function MedCardEditScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit MedCard</Text>
      <Button
        title="Back to Quick Show"
        onPress={() => navigation.navigate(ROUTES.MedCardShow)}
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
