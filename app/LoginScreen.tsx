import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation: any = useNavigation();

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
        
        // Assuming the API sends back a success response with user data
        if (response.data.success) {
          console.log('Login Successful:', response.data);

            await AsyncStorage.setItem('@storage_user_data', JSON.stringify(response.data));
            await AsyncStorage.setItem('isLoggedIn', 'true');
          
            navigation.navigate('DashboardScreen'); 

          
        } else {
          Alert.alert('Login Failed', response.data.message || 'Invalid credentials');
        }
      } catch (error) {
        console.error('Login Error:', error);
        Alert.alert('Error', 'An error occurred during login. Please try again.');
      } finally {
        setLoading(false); // Hide loading state
      }
    }
  };
  
  
  const redirectToForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const redirectToCreateAccount = () => {
    navigation.navigate('CreateAccountScreen', { index: 0 });
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
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
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
  header: {
    height: 50,
    backgroundColor: '#6C2EB9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 120,
    textAlign: 'center',
    color: '#0061F0',
  },
  content: {
    fontSize: 15,
    fontWeight: 'medium',
    marginBottom: 150,
  },
  text: {
    textAlign: 'left',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: '#007bff',
    marginBottom: 20,
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#0061F0',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  singin: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 15,
  },
  link: {
    color: '#0061F0',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    textAlign: 'right',
    marginBottom: 5,
    fontSize: 13,
  },
});

export default LoginScreen;
