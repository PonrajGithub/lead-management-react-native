import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from 'expo-router';

const CreateAccountScreen = () => {
  // const [accountType, setAccountType] = useState('');
  const [name, setName] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [accountTypeError, setAccountTypeError] = useState('');
  const [nameError, setNameError] = useState('');
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
    // Account type validation
    // if (accountType === '') {
    //   setAccountTypeError('Please select account type.');
    //   valid = false;
    // } else {
    //   setAccountTypeError('');
    // }

    
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

  // Password validation
  if (password === '') {
    setPasswordError('Password is required.');
    valid = false;
  } else {
    setPasswordError('');
  }

  // If form is valid, proceed to login
  if (valid) {
    console.log({ name ,mobilenumber, email, password });
    navigation.navigate('CongratsScreen'); 
  } 
  };

  const redirectToLogin = () => {
    navigation.navigate('LoginScreen')
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6C2EB9" barStyle="light-content" />
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.content}>open a account with a few details</Text>
{/* 
      <Picker
        selectedValue={accountType}
        style={styles.picker}
        onValueChange={(itemValue) => setAccountType(itemValue)}
      >
        <Picker.Item label="Select Account Type" value="" />
        <Picker.Item label="Institute" value="Institute" />
        <Picker.Item label="Corporate" value="Corporate" />
        <Picker.Item label="Others" value="Others" />
      </Picker>
      {accountTypeError ? <Text style={styles.errorText}>{accountTypeError}</Text> : null} */}

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobilenumber}
        keyboardType="phone-pad"
        onChangeText={setMobileNumber}
      />
      {mobilenumberError ? <Text style={styles.errorText}>{mobilenumberError}</Text> : null}

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

      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}> CREATE YOUR ACCOUNT </Text>
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
  // picker: {
  //   height: 50,
  //   width: '100%',
  //   borderColor: '#dcdcdc',
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   marginBottom: 15,
  //   justifyContent: 'center',
  // },
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

export default CreateAccountScreen;
