import React, { useState } from 'react';
import { ScrollView, ToastAndroid, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, View } from 'react-native';
import { useNavigation } from 'expo-router';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false); // Changed to boolean
  const [passwordError, setPasswordError] = useState(false); // Changed to boolean
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigation: any = useNavigation();

  const [fontsLoaded] = useFonts({
    'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    let valid = true;

    // Email validation
    if (email === '') {
      setEmailError(true);
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    // Password validation
    if (password === '') {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    if (valid) {
      setLoading(true); // Show loading state
      try {
        const response = await axios.post('https://loanguru.in/loan_guru_app/api/login', {
          email,
          password,
        });

        if (response.data.success) {
          const { token } = response.data.data;
          setIsLoggedIn(true);
          await AsyncStorage.setItem('@storage_user_token', token);
          await AsyncStorage.setItem('@storage_user_data', JSON.stringify(response.data)); // Store user data
          await AsyncStorage.setItem('isLoggedIn', 'true');

          ToastAndroid.show('Login successfully!', ToastAndroid.SHORT);

          navigation.reset({
            index: 0,
            routes: [{ name: 'DashboardScreen' }],
          });
        } else {
          ToastAndroid.show('Login Failed', ToastAndroid.SHORT);
        }
      } catch (error) {
        console.error('Login Error:', error);
        ToastAndroid.show('Ensure your credentials are correct.', ToastAndroid.LONG);
      } finally {
        setLoading(false); // Hide loading state
      }
    }
  };

  const redirectToForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const redirectToCreateAccount = () => {
    navigation.navigate('MultiStepForm');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <SafeAreaView>
        <View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.navigate('WelcomeScreen')}
              style={styles.iconContainer}
            >
              <Icon name="chevron-left" size={30} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Sign in</Text>
          </View>
          <Text style={styles.description}>Login with your details</Text>
        </View>
        <View style={styles.stepOneContainer}>
          <Text style={styles.text}>Email ID</Text>
          <TextInput
            style={[styles.input, emailError && styles.inputError]}
            placeholder="Email"
            value={email}
            keyboardType="email-address"
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(false);
            }}
          />

          <Text style={styles.text}>Password</Text>
          <View style={[styles.passwordContainer, passwordError && styles.inputError]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={password}
              secureTextEntry={!showPassword} // Toggle password visibility
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError(false);
              }}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome
                name={showPassword ? 'eye' : 'eye-slash'} // Icon toggles based on state
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
          onPress={redirectToForgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Sign in'}</Text>
          </TouchableOpacity>

          <Text style={styles.singin}>
            If you don't have an account?{' '}
            <Text style={styles.link} onPress={redirectToCreateAccount}>
              Register
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  stepOneContainer: {
    flex: 1,
    alignSelf: 'center',
    width: '85%',
    marginTop: '50%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '8%',
    paddingHorizontal: '5%',
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
  description: {
    color: '#1E1E1E',
    fontWeight: '300',
    fontSize: 20,
    marginLeft: '13%',
    fontFamily: 'Lato',
  },
  text: {
    marginLeft: '5%',
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 19.2,
    color: '#9C9C9C',
    fontFamily: 'Lato',
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
  inputError: {
    borderColor: 'red', // Highlight error field with red border
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 10,
  },
  passwordInput: {
    flex: 1,
    color: '#1E1E1E',
    borderRadius: 8,
    fontFamily: 'Lato',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 28.8,
  },
  forgotPasswordText: {
    color: '#622CFD',
    marginTop: 20,
    textAlign: 'right',
    fontFamily: 'Lato',
    fontSize: 16,
    lineHeight: 19.2,
  },
  button: {
    backgroundColor: '#622CFD',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '20%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Lato',
    lineHeight: 24,
  },
  singin: {
    fontSize: 15,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 22.59,
    color: '#1E1E1E',
    fontFamily: 'Lato',
  },
  link: {
    color: '#622CFD',
    fontWeight: '300',
    lineHeight: 22.59,
    textDecorationLine: 'underline',
    fontFamily: 'Lato',
  },
});

export default LoginScreen;
