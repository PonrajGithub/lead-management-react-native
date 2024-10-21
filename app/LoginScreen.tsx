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
        <StatusBar backgroundColor="#6A1B9B" barStyle="light-content" />
        
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
              color="gray"
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
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  title: {
    fontSize: 24,
    // fontWeight: 'bold',
    marginBottom: 20,
    marginTop:'30%',
    textAlign: 'center',
    color: '#0061F0',
    fontFamily:'heading',
  },
  content: {
    fontSize: 15,
    // fontWeight: 'medium',
    marginBottom: '20%',
    fontFamily:'text'
  },
  text: {
    textAlign: 'left',
    marginBottom: 5,
    fontFamily:'text',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    marginBottom: 15,
    fontFamily:'text'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
  },
  forgotPasswordText: {
    color: '#007bff',
    marginBottom: 20,
    textAlign: 'right',
    fontFamily:'text'
  },
  button: {
    backgroundColor: '#0061F0',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop:'20%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily:'heading'
  },
  singin: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 15,
    fontFamily:'text'
  },
  link: {
    color: '#0061F0',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontFamily:'text',
  },
  errorText: {
    color: 'red',
    textAlign: 'right',
    marginBottom: 5,
    fontSize: 13,
    fontFamily:'text',
  },
});

export default LoginScreen;
