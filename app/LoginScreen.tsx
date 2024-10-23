import React, { useState } from 'react';
import { ScrollView,ToastAndroid, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, Alert, View } from 'react-native';
import { useNavigation } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';  // Import FontAwesome or another icon set
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigation: any = useNavigation();

  const [fontsLoaded] = useFonts({
    'text': require('../assets/fonts/static/Rubik-Regular.ttf'),
    'heading': require('../assets/fonts/static/Rubik-Bold.ttf'), 
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
      setEmailError('Email is required.');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email.');
      valid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (password === '') {
      setPasswordError('Password is required.');
      valid = false;
    } else {
      setPasswordError('');
    }

    

    if (valid) {
      setLoading(true); // Show loading state
      try {
        const response = await axios.post('https://loanguru.in/loan_guru_app/api/login', {
          email,
          password
        });
        
        // console.log('Login Response:', response.data); // Log the response to check its structure
    
        if (response.data.success) {
          const { token } = response.data.data;
          setIsLoggedIn(true);          await AsyncStorage.setItem('@storage_user_token', token); 
          // console.log('Token stored successfully:', token);
          await AsyncStorage.setItem('@storage_user_data', JSON.stringify(response.data)); // Store user data
          await AsyncStorage.setItem('isLoggedIn', 'true');
          
          ToastAndroid.show('Login successfully!', ToastAndroid.SHORT);


          navigation.reset({
            index: 0,
            routes: [{ name: 'DashboardScreen' }],  
        });
        } else {
          ToastAndroid.show('Login Failed', response.data.message || 'Invalid credentials');
        }
      } catch (error) {
        console.error('Login Error:', error);
        ToastAndroid.show('An error occurred during login. Please try again.',ToastAndroid.LONG);
      }finally {
        setLoading(false); // Hide loading state
      }


      const checkStorage = async () => {
        const token = await AsyncStorage.getItem('@storage_user_token');
        // console.log('Debug: Token from AsyncStorage:', token);
      };
      
      checkStorage();
    }
  };
  
  const redirectToForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const redirectToCreateAccount = () => {
    navigation.navigate('CreateAccountScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#1e3a8a" barStyle="light-content" />
        
        <Text style={styles.title}>Sign into your Account</Text>
        <Text style={styles.content}>Login into your account</Text>
        
        <Text style={styles.text}>Email ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        
        <Text style={styles.text}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            secureTextEntry={!showPassword}  // Toggle password visibility
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome
              name={showPassword ? 'eye' : 'eye-slash'}  // Icon toggles based on state
              size={20}
              color="#000"
            />
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <TouchableOpacity onPress={redirectToForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'LOG IN'}</Text>
        </TouchableOpacity>

        <Text style={styles.singin}>
          Do you not have an account?{' '}
          <Text style={styles.link} onPress={redirectToCreateAccount}>
            Sign up here
          </Text>
        </Text>
      </SafeAreaView>
    </ScrollView>
  );
};

// styles...
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f2f6ff', // Light background for the entire screen
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28, // Slightly larger title
    marginBottom: 20,
    marginTop: '30%',
    textAlign: 'center',
    color: '#1e3a8a', // Darker blue for contrast
    fontFamily: 'heading',
  },
  content: {
    fontSize: 16,
    marginBottom: '20%',
    textAlign: 'center',
    color: '#64748b', // Lighter gray-blue for subheading
    fontFamily: 'text',
  },
  text: {
    textAlign: 'left',
    marginBottom: 8,
    color: '#1e40af', // Darker blue for input labels
    fontFamily: 'text',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10, // More rounded input fields
    marginBottom: 15,
    backgroundColor: '#fff', // White background for inputs
    fontFamily: 'text',
    shadowColor: '#000', // Soft shadow for depth
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Android shadow
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  passwordInput: {
    flex: 1,
    fontFamily: 'text',
  },
  forgotPasswordText: {
    color: '#0066cc', // Brighter blue for clickable links
    marginBottom: 20,
    textAlign: 'right',
    fontFamily: 'text',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#1e3a8a', // Primary blue button color
    paddingVertical: 15,
    borderRadius: 10, // Rounded button for a modern look
    alignItems: 'center',
    marginTop: '20%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // Shadow to elevate the button
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'heading',
  },
  singin: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 15,
    color: '#64748b', // Subtle blue for the text below the button
    fontFamily: 'text',
  },
  link: {
    color: '#0066cc', // Matching link color with the forgot password text
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontFamily: 'text',
  },
  errorText: {
    color: 'red',
    textAlign: 'right',
    marginBottom: 5,
    fontSize: 13,
    fontFamily: 'text',
  },
});


export default LoginScreen;
