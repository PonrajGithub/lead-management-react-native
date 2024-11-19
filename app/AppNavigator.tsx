// AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Loan from './Loan';
import WebViewScreen from './WebViewScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Loan" component={Loan} options={{ headerShown: false }} />
        <Stack.Screen name="WebViewScreen" component={WebViewScreen} options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
