import React, { useState } from 'react';
import {ToastAndroid, View,  Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from 'expo-router';
import Index from '.';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const InstituteScreen = () => {
  const [name, setName] = useState('');
  const [spousename, setSpouseName] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [dob, setDOB] = useState('');
  const [email, setEmail] = useState('');
  const [institutionname, setInstitutionName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [message, setMessage] = useState('');

  const [nameError, setNameError] = useState('');
  const [spouseNameError, setSpouseNameError] = useState('');
  const [mobilenumberError, setMobileNumberError] = useState('');
  const [dobError, setDOBError] = useState('');
  const [institutionnameError, setInstitutionNameError] = useState('');
  const [occupationError, setOccupationError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [loading, setLoading] = useState(false);
  const navigation :any = useNavigation();

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

  const handleCreateAccount = async () => {
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
    if (dob === '') {
      setDOBError('DOB is required.');
      valid = false;
    } else {
      // Regular expression to check for valid date format (YYYY-MM-DD)
      const dobRegex = /^\d{2}-\d{2}-\d{4}$/;
  
      // Check if DOB matches the format
      if (!dobRegex.test(dob)) {
        setDOBError('Invalid DOB format. Use DD-MM-YYYY.');
        valid = false;
      } else {
        // Parse the date and check age (e.g., user must be 18 or older)
        const dobDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
  
        if (age < 18 || (age === 18 && monthDiff < 0)) {
          setDOBError('You must be at least 18 years old.');
          valid = false;
        } else {
          // Clear the error if all checks pass
          setDOBError('');
        }
      }
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

    if (valid) {
      setLoading(true);
  
      // Using FormData to append form fields
      let data = new FormData();
      data.append('name', name);
      data.append('mobilenumber', mobilenumber);
      data.append('email', email);
      data.append('dob', dob);
      data.append('occupation', occupation);
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
          ToastAndroid.show('Request sent successfully!', ToastAndroid.SHORT);
          // Navigate to CongratsScreen on success
          navigation.reset({
            index: 0,
            routes: [{ name: 'CongratsScreen' }],
        });
        } else {
          setMessage(response.data.message || 'An error occurred. Please try again.');
        }
      } catch (error) {
        console.error('API error:', error);
        ToastAndroid.show('Failed to create account. Please try again.',ToastAndroid.LONG);
      } finally {
        setLoading(false);
      }
    } else {
      ToastAndroid.show('Please fill in all required fields.',ToastAndroid.SHORT);
    }
  };

    

  const redirectToLogin = () => {
    navigation.navigate('LoginScreen', {Index:0});
  };

  return (
    <View style={styles.container}>
       <StatusBar backgroundColor="#1e3a8a" barStyle="light-content" />
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
        placeholder="DD-MM-YYYY"
        value={dob}
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
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          secureTextEntry={!showPassword} // Toggle visibility based on state
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <FontAwesome
            name={showPassword ? 'eye' : 'eye-slash'} // Change the icon based on visibility state
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}> CREATE ACCOUNT </Text>
      </TouchableOpacity>

      <Text style={styles.singin}>
      Do you already have an account?{' '}
        <Text style={styles.link} onPress={redirectToLogin }>
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
    backgroundColor: '#f5f5f5', // Matches the login screen background color
  },
  text: {
    textAlign: 'left',
    marginBottom: 5,
    fontFamily: 'text',
    color: '#1e40af', // Adjust text color to a darker tone for better readability
    fontSize: 14, // Consistent font size for labels
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
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 12,
  },
  passwordInput: {
    flex: 1,
    fontFamily: 'text',
  },
  button: {
    backgroundColor: '#1e3a8a', // Primary blue button color
    paddingVertical: 15,
    borderRadius: 10, // Rounded button for a modern look
    alignItems: 'center',
    marginTop: '5%',
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
    // marginBottom: 5,
    fontSize: 10,
    fontFamily: 'text',
  },
});

export default InstituteScreen;
