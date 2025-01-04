import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator();

const Index: React.FC = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen}
          options={{
            title: 'Chat',  // Thay đổi tiêu đề
            headerStyle: {
              backgroundColor: '#f4511e',  // Màu nền của header
            },
            headerTintColor: '#fff',  // Màu chữ của tiêu đề
            headerTitleStyle: {
              fontWeight: 'bold',  // Kiểu chữ đậm
              fontSize: 24,        // Cỡ chữ
            },
            headerTitleAlign: 'center',  // Đưa tiêu đề vào giữa
          }}
        />
      </Stack.Navigator>
  );
};

export default Index;
