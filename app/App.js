import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MenuProvider } from "react-native-popup-menu";
import { Ionicons } from '@expo/vector-icons';
import Chats from './screens/Chats';
import Settings from "./screens/Settings";
import { AuthenticatedUserProvider, AuthenticatedUserContext } from "./contexts/AuthenticatedUserContext";
import { UnreadMessagesProvider, UnreadMessagesContext } from "./contexts/UnreadMessagesContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { unreadCount, setUnreadCount } = useContext(UnreadMessagesContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = route.name === 'Chats' ? 'chatbubbles' : 'settings';
          iconName += focused ? '' : '-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
        presentation: 'modal',
      })}
    >
      <Tab.Screen name="Chats" options={{ tabBarBadge: unreadCount > 0 ? unreadCount : null }}>
        {() => <Chats setUnreadCount={setUnreadCount} />}
      </Tab.Screen>
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};


const App = () => {
  return (
    <MenuProvider>
      <AuthenticatedUserProvider>
        <UnreadMessagesProvider>
          <h1>PlaceHolder</h1>
        </UnreadMessagesProvider>
      </AuthenticatedUserProvider>
    </MenuProvider>
  );
};

export default App;
