import React, { useState } from 'react';
import {ToastAndroid, View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import axios from 'axios';
import { useNavigation } from 'expo-router';
import Index from '.';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';


const OtherScreen = () => {
  const [name, setName] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [company_name, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');
  const [password, setPassword] = useState('');
  


  const [nameError, setNameError] = useState('');
  const [mobilenumberError, setMobileNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [company_nameError, setCompany_nameError] = useState('');
  const [designationError, setDesignationError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const[loading, setLoading] = useState(false);
  const navigation: any = useNavigation();
  const [fontsLoaded] = useFonts({
    'text': require('../assets/fonts/static/Rubik-Regular.ttf'),
    'heading': require('../assets/fonts/static/Rubik-Bold.ttf'), 
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const validateEmail = (email: string) => {
    // Simple regex to check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCreateAccount = async () => {

    let valid = true;
  // Name validation
  if (name ===''){
    setNameError('Name is required');
    valid = false;
  }  else{
    setNameError('');
  }

  // MobileNumber validation
  if (mobilenumber === ''){
    setMobileNumberError('MobileNumber is required');
    valid = false;
  } else {
    setMobileNumberError('');
  }

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

   // Company
   if (company_name ===''){
    setCompany_nameError('Company Name is required');
    valid = false;
  }  else{
    setCompany_nameError('');
  }
   // Designation
  if (designation ===''){
    setDesignationError('Designation is required');
    valid = false;
  }  else{
    setDesignationError('');
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
    setLoading(true);

    // Using FormData to append form fields
    let data = new FormData();
    data.append('name', name);
    data.append('mobilenumber', mobilenumber);
    data.append('email', email);
    data.append('company_name', company_name);
    data.append('designation', designation);
    data.append('password', password);

    try {
      // Making the POST request and awaiting the response
      const response = await axios.post('https://loanguru.in/loan_guru_app/api/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for FormData
        },
      });

      console.log(response.data);
      if (response.data.success) {
        ToastAndroid.show('Account created successfully!',ToastAndroid.LONG);
        // Navigate to CongratsScreen on success
        navigation.reset({
          index: 0,
          routes: [{ name: 'CongratsScreen' }],
      });
      } else {
        ToastAndroid.show(response.data.message || 'An error occurred. Please try again.',ToastAndroid.LONG);
      }
    } catch (error) {
      console.error('API error:', error);
      ToastAndroid.show('Failed to create account. Please try again.',ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  } else {
    ToastAndroid.show('Please fill in all required fields.',ToastAndroid.LONG);
  }
};

  const redirectToLogin = () => {
    navigation.navigate('LoginScreen')
  }

  return (
    <View style={styles.container}>
       <StatusBar backgroundColor="#6A1B9B" barStyle="light-content" />
        <Text style={styles.text}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
      <Text style={styles.text}>Mobile Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobilenumber}
        keyboardType="phone-pad"
        onChangeText={setMobileNumber}
      />
      {mobilenumberError ? <Text style={styles.errorText}>{mobilenumberError}</Text> : null}
      <Text style={styles.text}>Email Id</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <Text style={styles.text}>Company Name</Text>
       <TextInput
        style={styles.input}
        placeholder="Company Name"
        value={company_name}
        onChangeText={setCompanyName}
      />
      {company_nameError ? <Text style={styles.errorText}>{company_nameError}</Text> : null}
      <Text style={styles.text}>Designation</Text>
       <TextInput
        style={styles.input}
        placeholder="Designation"
        value={designation}
        onChangeText={setDesignation}
      />      
       {designationError ? <Text style={styles.errorText}>{designationError}</Text> : null}
      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      /> 
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}> CREATE ACCOUNT </Text>
      </TouchableOpacity>
      <Text style={styles.singin}>
      Do you already have a account?{' '}
        <Text style={styles.link} onPress={redirectToLogin}>
          Sign in here
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
  text:{
   textAlign:'left',
   marginBottom:5,
   fontFamily:'text'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    marginBottom: 15,
    fontFamily:'text',
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
    // fontWeight: 'bold',
    fontFamily:'heading'
  },
  singin: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 15,
    fontFamily:'text',
  },
  link: {
    color: '#0061F0',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontFamily:'text'
  },
  errorText: {
    color: 'red',
    textAlign:'right',
    marginBottom:5,
    fontSize: 13,
    fontFamily:'text',
  },
});

export default OtherScreen;
