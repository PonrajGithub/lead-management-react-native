import React, { useState } from 'react';
import { ScrollView,ToastAndroid, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, View } from 'react-native';
import { useNavigation } from 'expo-router';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
    navigation.navigate('MultiStepForm');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <SafeAreaView >        
      <View>
  <View style={styles.row}>
    <TouchableOpacity
      onPress={() => navigation.navigate('WelcomeScreen')}
      style={styles.iconContainer}
    >
      <Icon name="chevron-left" size={30} color="#000" />
    </TouchableOpacity>
    <Text style={styles.tittel}>Sign in</Text>
  </View>
  <Text style={styles.description}>Login with your details</Text>
</View>
        <View style={styles.stepOneContainer}>
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
              color="#000"
            />
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <TouchableOpacity onPress={redirectToForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Sign in'}</Text>
        </TouchableOpacity>

        <Text style={styles.singin}>
          If you don't have an account?{' '}
          <Text style={styles.link} onPress={redirectToCreateAccount}>
            Register
          </Text>
        </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

// styles...
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor:'#fff',
  },
  stepOneContainer: {
    flex: 1,
    alignSelf:'center',
    width:'85%',
    marginTop:'50%'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '8%',
    paddingHorizontal: '5%',
  },
  iconContainer: {
    marginRight: 10,
  },
  tittel: {
    color: 'black',
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'text', // Use a valid font or remove if not required
  },
  description: {
    color: '#666666',
    fontWeight: '400',
    fontSize: 18,
    // marginBottom:'70%',
    marginLeft: '10%',
    fontFamily: 'text',
  },
  text: {
    marginLeft:'5%',
    marginBottom: 8,
    fontSize:18,
    color:'#666666',
    fontFamily: 'text',
  },
  input: {
      borderWidth: 1,
      borderColor: '#000',
      color:'#666666',
      borderRadius: 8,
      fontFamily:'text',
      fontSize:15,
      fontWeight:'ultralight',
      padding: 10,
      marginBottom:30,
    },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
     borderWidth: 1,
      borderColor: '#000',
      color:'#666666',
      borderRadius: 8,
      fontFamily:'text',
      fontSize:15,
      fontWeight:'ultralight',
      padding: 10,
      // marginBottom:30,
  },
  passwordInput: {
    flex: 1,
    fontFamily: 'text',
  },
  forgotPasswordText: {
    color: '#622CFD',
    marginTop: 20,
    textAlign: 'right',
    fontFamily: 'text',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#622CFD',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '20%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, 
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
    color: '#666666', // Subtle blue for the text below the button
    fontFamily: 'text',
  },
  link: {
    color: '#622CFD', // Matching link color with the forgot password text
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontFamily: 'text',
  },
  errorText: {
    color: 'red',
    textAlign: 'right',
    // marginBottom: 5,
    fontSize: 13,
    fontFamily: 'text',
  },
});


export default LoginScreen;