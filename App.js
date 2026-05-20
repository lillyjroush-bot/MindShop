import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import SavesScreen from './screens/SavesScreen';
import ReviewScreen from './screens/ReviewScreen';
import RecapScreen from './screens/RecapScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopColor: '#e8e5e1',
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#b0a89e',
          tabBarActiveBackgroundColor: '#111110',
          tabBarInactiveBackgroundColor: '#ffffff',
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            letterSpacing: 0.2,
          },
          tabBarIcon: () => null,
          tabBarItemStyle: {
            borderRadius: 8,
            marginHorizontal: 4,
            marginVertical: 4,
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
