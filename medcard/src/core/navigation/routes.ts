import { NavigatorScreenParams } from '@react-navigation/native';

export const ROUTES = {
  Splash: 'Splash',
  Onboarding: 'Onboarding',
  MainTabs: 'MainTabs',
  Home: 'Home',
  Checklist: 'Checklist',
  MedCard: 'MedCard',
  Settings: 'Settings',
  MedCardShow: 'MedCardShow',
  MedCardEdit: 'MedCardEdit',
} as const;

export type RootStackParamList = {
  [ROUTES.Splash]: undefined;
  [ROUTES.Onboarding]: undefined;
  [ROUTES.MainTabs]: undefined;
};

export type MainTabParamList = {
  [ROUTES.Home]: undefined;
  [ROUTES.Checklist]: undefined;
  [ROUTES.MedCard]: NavigatorScreenParams<MedCardStackParamList> | undefined;
  [ROUTES.Settings]: undefined;
};

export type MedCardStackParamList = {
  [ROUTES.MedCardShow]: undefined;
  [ROUTES.MedCardEdit]: undefined;
};
