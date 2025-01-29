import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="FirstScreen" options={{ headerShown: false }} />
      <Stack.Screen name="SecondScreen" options={{ headerShown: false }} />
      <Stack.Screen name="ThirdScreen" options={{ headerShown: false }} />
      <Stack.Screen name="WelcomeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="MultiStepForm" options={{ headerShown: false }} />
      <Stack.Screen name="CongratsScreen" options={{ headerShown: false }} />
      <Stack.Screen name="DashboardScreen" options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPasswordScreen" options={{ headerShown: false }} />
      <Stack.Screen name="WebViewScreen" options={{ headerShown: false }} />
      <Stack.Screen name='ReferralPartner' options={{ headerShown: false}} />
      <Stack.Screen name='AddReferral' options={{ headerShown: false}} />
      <Stack.Screen name='Profile' options={{ headerShown : false}} />
      <Stack.Screen name='VerifyOtpScreen' options={{ headerShown : false}}/>
      <Stack.Screen name='AuctionScreen' options={{ headerShown : false}}/>
      <Stack.Screen name='AuctionDetailScreen' options={{ headerShown : false}}/>
    </Stack>
  );
}
