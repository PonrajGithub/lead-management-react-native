import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuctionDetailScreen from './AuctionDetailScreen';
import AuctionScreen from './AuctionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AuctionScreen" component={AuctionScreen} />
        <Stack.Screen name="AuctionDetailScreen" component={AuctionDetailScreen} options={{ headerShown : false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
