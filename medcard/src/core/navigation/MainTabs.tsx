import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainTabParamList, MedCardStackParamList, ROUTES } from './routes';
import HomeScreen from '../../features/home/screens/HomeScreen';
import ChecklistScreen from '../../features/checklist/screens/ChecklistScreen';
import SettingsScreen from '../../features/settings/screens/SettingsScreen';
import MedCardShowScreen from '../../features/medcard/screens/MedCardShowScreen';
import MedCardEditScreen from '../../features/medcard/screens/MedCardEditScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const MedCardStack = createNativeStackNavigator<MedCardStackParamList>();

function MedCardStackNavigator() {
  return (
    <MedCardStack.Navigator>
      <MedCardStack.Screen
        name={ROUTES.MedCardShow}
        component={MedCardShowScreen}
        options={{ title: 'Quick Show' }}
      />
      <MedCardStack.Screen
        name={ROUTES.MedCardEdit}
        component={MedCardEditScreen}
        options={{ title: 'Edit MedCard' }}
      />
    </MedCardStack.Navigator>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={ROUTES.Home} component={HomeScreen} />
      <Tab.Screen name={ROUTES.Checklist} component={ChecklistScreen} />
      <Tab.Screen
        name={ROUTES.MedCard}
        component={MedCardStackNavigator}
        options={{ headerShown: false, title: 'MedCard' }}
      />
      <Tab.Screen name={ROUTES.Settings} component={SettingsScreen} />
    </Tab.Navigator>
  );
}
