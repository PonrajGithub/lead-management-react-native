import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from 'expo-router';

const CorporateScreen = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [designation, setDesignation] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [companyError, setCompanyError] = useState('');
  const [designationError, setDesignationError] = useState('');
  const [mobilenumberError, setMobileNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigation: any = useNavigation();

  const validateEmail = (email: string) => {
    // Simple regex to check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCreateAccount = () => {

    let valid = true;
  // Name validation
  if (name ===''){
    setNameError('Name is required');
    valid = false;
  }  else{
    setNameError('');
  }
  // Company
  if (company ===''){
    setCompanyError('Company Name is required');
    valid = false;
  }  else{
    setCompanyError('');
  }
   // Designation
  if (designation ===''){
    setDesignationError('Designation is required');
    valid = false;
  }  else{
    setDesignationError('');
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

  // Password validation
  if (password === '') {
    setPasswordError('Password is required.');
    valid = false;
  } else {
    setPasswordError('');
  }

  // If form is valid, proceed to login
  if (valid) {
    console.log({ name, company, designation, mobilenumber, email, password });
    navigation.navigate('CongratsScreen'); 
  } 
  };

  const redirectToLogin = () => {
    navigation.navigate('LoginScreen')
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6C2EB9" barStyle="light-content" />
      <Text style={styles.text}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
      <Text style={styles.text}>Company Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Company Name"
        value={company}
        onChangeText={setCompany}
      />
       {companyError ? <Text style={styles.errorText}>{companyError}</Text> : null}
      <Text style={styles.text}>Designation</Text>
       <TextInput
        style={styles.input}
        placeholder="Designation"
        value={designation}
        onChangeText={setDesignation}
      />
       {designationError ? <Text style={styles.errorText}>{designationError}</Text> : null}
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
        <Text style={styles.buttonText}> CREATE CORPORATE ACCOUNT </Text>
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
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
    textAlign:'right',
    marginBottom: 10,
    fontSize: 13,
  }
});

export default CorporateScreen;
