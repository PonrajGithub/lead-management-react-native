import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigation: any = useNavigation();

  const validateEmail = (email: string) => {
    // Simple regex to check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
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

    // If form is valid, proceed to login
    if (valid) {
      console.log({ email, password });
      navigation.navigate('index'); // Navigate to 'index' or another valid screen
    }
  };

  const redirectToCreateAccount = () => {
    navigation.navigate('CreateAccountScreen')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign into your Account</Text>
      <Text style={styles.content}>login into your account </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />
       {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}> LOG IN</Text>
      </TouchableOpacity>
      <Text style={styles.singin}>
      Do you not have a account?{' '}
        <Text style={styles.link} onPress={redirectToCreateAccount}>
          Sign up here
        </Text>
        </Text>
    </View>
  );
};

// styles...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color : '#0061F0',
  },
  content: {
    fontSize : 15,
    fontWeight : 'medium',
    marginBottom : 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#0061F0',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  singin :{
    fontSize : 15,
    fontWeight : 'medium',
  },
  link :{
    color: '#0061F0', 
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 13,
  }
});

export default LoginScreen;
