import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';

const ForgotPasswordScreen = () => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false); 
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // Step to handle process flow

  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  // Function to request OTP
  const requestOtp = async () => {
    if (!email) {
      ToastAndroid.show('Please enter your email.',ToastAndroid.SHORT);
      return;
    }

    let formData = new FormData();
    formData.append('email', email);
    setLoading(true);
    try {
      const response = await axios.post(
        'https://loanguru.in/loan_guru_app/api/forget',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.status === 200) {
        console.log('OTP:', response.data?.otp || 'No OTP received');
        ToastAndroid.show('OTP sent to your email.',ToastAndroid.SHORT);
        setStep(2);
      } else {
        ToastAndroid.show('Failed to send OTP. Please try again.',ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Oops! Please enter valid mail.',ToastAndroid.SHORT);
    }
    finally {
      setLoading(false); // Hide loading state
    }
  };

  // Function to reset the password
  const resetPassword = async () => {
    if (!otp || !newPassword) {
      ToastAndroid.show('Please fill in all fields.',ToastAndroid.SHORT);
      return;
    }

    let formData = new FormData();
    formData.append('code', otp);
    formData.append('password', newPassword);

    try {
      const response = await axios.post(
        'https://loanguru.in/loan_guru_app/api/reset',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.status === 200) {
        ToastAndroid.show('Password reset successful.Please log in.',ToastAndroid.SHORT);
        navigation.navigate('LoginScreen');
      } else {
        ToastAndroid.show('Invalid OTP or failed to reset password.',ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Oops! Something went wrong. Please retry.',ToastAndroid.SHORT);
    }
  };

  return (
    <ImageBackground
    source={require('../assets/images/index.jpg')}
    style={styles.container}
    resizeMode="cover"
  >
      <View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            // style={styles.iconContainer}
          >
            <Icon name="chevron-left" size={30} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>ForgotPassword</Text>
        </View>
      </View>
        {step === 1 && (
        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          <View style={styles.stepContainer}>
            <Text style={styles.label}>Enter your email</Text>
            <TextInput
              style={[styles.input, emailError && styles.inputError]}
              placeholder="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError(false);
              }}
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button} onPress={requestOtp} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send OPT'}</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        )}

        {step === 2 && (
       <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          <View style={styles.stepContainer}>
            <Text style={styles.label}>Enter OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
            />
            <Text style={styles.label}>New Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome
                name={showPassword ? 'eye' : 'eye-slash'} // Icon toggles based on state
                size={20}
                color="#000"
              />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={resetPassword}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        )}
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  content:{
    flex:1
  },
  scrollContent:{
    flexGrow: 1,
    justifyContent: 'center',
  },
  stepContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 30,
    marginTop: '50%',
    flex: 1,
    display: "flex",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '8%',
    paddingHorizontal: '3%',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 43.2,
    fontFamily: 'Lato',
  },
  label: {
    fontSize: 32,
    fontFamily: 'Lato',
    fontWeight: '600',
    lineHeight: 38.4,
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: '5%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    color: '#1E1E1E',
    borderRadius: 8,
    fontFamily: 'Lato',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 28.8,
    padding: 10,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    fontFamily: 'Lato',
    padding: 10,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    color: '#1E1E1E',
    fontFamily: 'Lato',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28.8,
  },
  button: {
    backgroundColor: '#622CFD',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop:'10%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  inputError:{
    color:'red'
  }
});

export default ForgotPasswordScreen;
