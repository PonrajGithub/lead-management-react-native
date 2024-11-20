import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Footer from './Footer'; // Your footer component
import WebViewScreen from './WebViewScreen'; // WebView component

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Footer">
        <Stack.Screen name="Footer" component={Footer} options={{ headerShown: false }} />
        <Stack.Screen name="WebViewScreen" component={WebViewScreen} options={{ title: 'loan' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
