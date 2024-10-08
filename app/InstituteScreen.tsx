import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from 'expo-router';

const InstituteScreen = () => {
  const [name, setName] = useState('');
  const [spousename, setSpouseName] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [dob, setDOB] = useState('');
  const [email, setEmail] = useState('');
  const [institutionname, setInstitutionName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [spouseNameError, setSpouseNameError] = useState('');
  const [mobilenumberError, setMobileNumberError] = useState('');
  const [dobError, setDOBError] = useState('');
  const [institutionnameError, setInstitutionNameError] = useState('');
  const [occupationError, setOccupationError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigation :any = useNavigation();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCreateAccount = () => {
    let valid = true;

    // Name validation
    if (name === '') {
      setNameError('Name is required.');
      valid = false;
    } else {
      setNameError('');
    }

    // Spouse name
    if(spousename === ''){
      setSpouseNameError('Spouse Name is required');
      valid = false;
    } else {
      setSpouseNameError('');
    }

    // Mobile Number validation
    if (mobilenumber === '') {
      setMobileNumberError('Mobile number is required.');
      valid = false;
    } else {
      setMobileNumberError('');
    }

    // DOB
    if( dob === '') {
      setDOBError('DOB is required.');
      valid = false;
    } else{
      setDOBError('');
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

    // Institution name validation
    if (institutionname === '') {
      setInstitutionNameError('Institution name is required.');
      valid = false;
    } else {
      setInstitutionNameError('');
    }

    // Occupation validation
    if (occupation === '') {
      setOccupationError('Occupation is required.');
      valid = false;
    } else {
      setOccupationError('');
    }

    // If form is valid, proceed to next step
    if (valid) {
      console.log({ name, spousename, mobilenumber, dob, email, institutionname, occupation, password });
      navigation.navigate('CongratsScreen');
    }
  };

  const redirectToLogin = () => {
    navigation.navigate('LoginScreen');
  };

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
      <Text style={styles.text}>Spouse Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Spouse Name"
        value={spousename}
        onChangeText={setSpouseName}
      />
      {spouseNameError ? <Text style={styles.errorText}>{spouseNameError}</Text> : null}
      <Text style={styles.text}>Mobile Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobilenumber}
        keyboardType="phone-pad"
        onChangeText={setMobileNumber}
      />
      {mobilenumberError ? <Text style={styles.errorText}>{mobilenumberError}</Text> : null}
      <Text style={styles.text}>DOB</Text>
      <TextInput
        style={styles.input}
        placeholder="DOB"
        value={dob}
        keyboardType="phone-pad"
        onChangeText={setDOB}
      />
      {dobError ? <Text style={styles.errorText}>{dobError}</Text> : null}
      <Text style={styles.text}>Email Id</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <Text style={styles.text}>Institution Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Institution Name"
        value={institutionname}
        onChangeText={setInstitutionName}
      />
      {institutionnameError ? <Text style={styles.errorText}>{institutionnameError}</Text> : null}
      <Text style={styles.text}>Occupation</Text>
      <TextInput
        style={styles.input}
        placeholder="Occupation"
        value={occupation}
        onChangeText={setOccupation}
      />
      {occupationError ? <Text style={styles.errorText}>{occupationError}</Text> : null}
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
        <Text style={styles.buttonText}>CREATE INSTITUTE ACCOUNT</Text>
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
    textAlign:'right',
    marginBottom: 10,
    fontSize: 13,
  },
});

export default InstituteScreen;
