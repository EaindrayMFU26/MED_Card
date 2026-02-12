import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList, ROUTES } from './routes';
import MainTabs from './MainTabs';
import SplashScreen from '../../features/onboarding/screens/SplashScreen';
import OnboardingScreen from '../../features/onboarding/screens/OnboardingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.Splash} component={SplashScreen} />
        <Stack.Screen name={ROUTES.Onboarding} component={OnboardingScreen} />
        <Stack.Screen name={ROUTES.MainTabs} component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
