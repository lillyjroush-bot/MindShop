import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SavesScreen from './screens/SavesScreen';
import ReviewScreen from './screens/ReviewScreen';
import RecapScreen from './screens/RecapScreen';
import SavesIcon from './components/icons/SavesIcon';
import ReviewIcon from './components/icons/ReviewIcon';
import RecapIcon from './components/icons/RecapIcon';
import { colors } from './constants/theme';
import { SAMPLE_ITEMS, DEFAULT_LISTS } from './data/sampleData';

const Tab = createBottomTabNavigator();

const ICONS = {
  Saves:  SavesIcon,
  Review: ReviewIcon,
  Recap:  RecapIcon,
};

export default function App() {
  const [items, setItems] = useState(SAMPLE_ITEMS);
  const [lists, setLists] = useState(DEFAULT_LISTS);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.white,
              borderTopColor: colors.gray2,
              borderTopWidth: 1,
              paddingHorizontal: 6,
              paddingTop: 6,
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
            tabBarIcon: ({ color }) => {
              const Icon = ICONS[route.name];
              return Icon ? <Icon color={color} size={20} /> : null;
            },
          })}
        >
          <Tab.Screen name="Saves">
            {() => <SavesScreen items={items} setItems={setItems} lists={lists} setLists={setLists} />}
          </Tab.Screen>
          <Tab.Screen name="Review">
            {() => <ReviewScreen items={items} setItems={setItems} />}
          </Tab.Screen>
          <Tab.Screen name="Recap">
            {() => <RecapScreen items={items} lists={lists} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
