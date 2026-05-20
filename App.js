import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import SavesScreen from './screens/SavesScreen';
import ReviewScreen from './screens/ReviewScreen';
import RecapScreen from './screens/RecapScreen';
import SavesIcon from './components/icons/SavesIcon';
import ReviewIcon from './components/icons/ReviewIcon';
import RecapIcon from './components/icons/RecapIcon';
import { colors } from './constants/theme';

const Tab = createBottomTabNavigator();

const ICONS = {
  Saves:  SavesIcon,
  Review: ReviewIcon,
  Recap:  RecapIcon,
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.white,
            borderTopColor: colors.gray2,
            borderTopWidth: 1,
            height: 62,
            paddingBottom: 10,
            paddingTop: 8,
            paddingHorizontal: 6,
          },
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: colors.gray3,
          tabBarActiveBackgroundColor: colors.black,
          tabBarInactiveBackgroundColor: colors.white,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            letterSpacing: 0.2,
          },
          tabBarItemStyle: {
            borderRadius: 10,
            marginHorizontal: 3,
            marginVertical: 3,
          },
          tabBarIcon: ({ color, size }) => {
            const Icon = ICONS[route.name];
            return Icon ? <Icon color={color} size={20} /> : null;
          },
        })}
      >
        <Tab.Screen name="Saves" component={SavesScreen} />
        <Tab.Screen name="Review" component={ReviewScreen} />
        <Tab.Screen name="Recap" component={RecapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
