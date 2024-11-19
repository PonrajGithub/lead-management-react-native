// navigationTypes.ts
import { createStackNavigator } from '@react-navigation/stack';

export type StackParamList = {
  index: undefined; // No parameters for index
  register: undefined; // No parameters for register
  CreateAccount: undefined; // No parameters for CreateAccount
  Welcome: undefined; // No parameters for Welcome
  Login:undefined;
  profile: { userId: string }; // Example with parameters
  Loan: undefined; // No params for Loan screen
  WebViewScreen: { link: string }; // Params for WebViewScreen

};

const Stack = createStackNavigator<StackParamList>();
