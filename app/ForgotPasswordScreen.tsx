import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

const ForgotPasswordScreen = () => {
  const [mobilenumber, setMobileNumber] = useState('');
  const [mobilenumberError, setMobileNumberError] = useState('');
  const navigation: any = useNavigation();

  const redirectToLogin = () => {
    navigation.navigate('LoginScreen');
  };
 

  return (
    <View style={styles.container}>
       <StatusBar backgroundColor="#6A1B9B" barStyle="light-content" />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color : '#0061F0',
  },
  text:{
    marginBottom:10,
  },
  content: {
    fontSize: 16,
    marginBottom: 100,
    textAlign:'left',
    lineHeight:30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
});

export default ForgotPasswordScreen;
