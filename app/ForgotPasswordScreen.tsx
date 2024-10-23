import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const ForgotPasswordScreen = () => {
  const [mobilenumber, setMobileNumber] = useState('');
  const [mobilenumberError, setMobileNumberError] = useState('');
  const navigation: any = useNavigation();

  const redirectToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const [fontsLoaded] = useFonts({
    'text': require('../assets/fonts/static/Rubik-Regular.ttf'),
    'heading': require('../assets/fonts/static/Rubik-Bold.ttf'), 
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
 

  return (
    <View style={styles.container}>
       <StatusBar backgroundColor="#1e3a8a" barStyle="light-content" />
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.content}>please Enter your phone number  to reset your password</Text>
      
      <Text style={styles.text}>Mobile Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobilenumber}
        keyboardType="phone-pad"
        onChangeText={setMobileNumber}
      />
      {mobilenumberError ? <Text style={styles.errorText}>{mobilenumberError}</Text> : null}

      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <Text style={styles.singin}>
        Do you already have an account?{' '}
        <Text style={styles.link} onPress={redirectToLogin}>
          Sign in here
        </Text>
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
  text:{
    textAlign: 'left',
    marginBottom: 8,
    color: '#1e40af', // Darker blue for input labels
    fontFamily: 'text',
  },
  content: {
    fontSize: 16,
    marginBottom: '20%',
    textAlign: 'center',
    color: '#64748b', // Lighter gray-blue for subheading
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
    elevation: 3,
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

export default ForgotPasswordScreen;
