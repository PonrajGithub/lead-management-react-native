import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ForgotPasswordScreen = () => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // Step to handle process flow

  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  // Function to request OTP
  const requestOtp = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    try {
      const response = await fetch('https://yourapi.com/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        Alert.alert('Success', 'OTP sent to your email.');
        setStep(2);
      } else {
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  // Function to reset the password
  const resetPassword = async () => {
    if (!otp || !newPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('https://yourapi.com/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Password reset successful. Please log in.');
        navigation.navigate('LoginScreen');
      } else {
        Alert.alert('Error', 'Invalid OTP or failed to reset password.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}
              style={styles.iconContainer}
            >
              <Icon name="chevron-left" size={30} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Sign in</Text>
          </View>
        </View>
      <View style={styles.content}>
        {step === 1 && (
          <>
            <Text style={styles.label}>Enter your email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button} onPress={requestOtp}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.label}>Enter OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
            />
            <Text style={styles.label}>New Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text>{showPassword ? 'Hide' : 'Show'}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={resetPassword}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '8%',
    paddingHorizontal: '3%',
  },
  iconContainer: {
    // marginRight: 10,
  },
  title: {
    color: '#1E1E1E',
    fontSize: 36,
    fontWeight: '600',
    lineHeight: 43.2,
    fontFamily: 'Lato',
  },
  content: {
    marginTop: 40,
    padding:30
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    color: '#1E1E1E',
    borderRadius: 8,
    fontFamily: 'Lato',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 28.8,
    padding: 10,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
  },
  button: {
    backgroundColor: '#622CFD',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
