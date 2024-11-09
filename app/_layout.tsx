import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="WelcomeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="FirstScreen" options={{ headerShown: false }} />
      <Stack.Screen name="SecondScreen" options={{ headerShown: false }} />
      <Stack.Screen name="ThirdScreen" options={{ headerShown: false }} />
      {/* <Stack.Screen name="CreateAccountScreen" options={{ headerShown: false }} />
      <Stack.Screen name="InstituteScreen" options={{ headerShown: false }} />
      <Stack.Screen name="CorporateScreen" options={{ headerShown: false }} />
      <Stack.Screen name="OtherScreen" options={{ headerShown: false }} /> */}
      <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="CongratsScreen" options={{ headerShown: false }} />
      <Stack.Screen name="DashboardScreen" options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPasswordScreen" options={{ headerShown: false }} />
      <Stack.Screen name="MultiStepForm" options={{ headerShown: false }} />

    </Stack>
  );
}
