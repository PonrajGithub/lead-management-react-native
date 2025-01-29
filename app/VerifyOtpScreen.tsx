import { useNavigation } from 'expo-router';
import React, { useState , useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';


const VerifyOtpScreen = () => {
  const navigation:any = useNavigation();
  const [mobile_number, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mobile_numberError, setMobileError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const sendOtp = async () => {
    if (!mobile_number) {
      setMobileError(true);
      ToastAndroid.show('Please enter a valid mobile number', ToastAndroid.SHORT);
      return;
    }
  
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('phone', mobile_number);
  
      const response = await axios.post(
        'https://loanguru.in/loan_guru_app/api/smsloginotp',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      // Updated condition to check if the message is "OTP sent successfully."
      if (response?.data?.message === "OTP sent successfully.") {
        ToastAndroid.show('OTP sent successfully', ToastAndroid.SHORT);
        console.log('Response Data:', response.data);
        console.log('Current Step Before:', step);
        setStep(2);
        console.log('Current Step After:', step);
      } else {
        ToastAndroid.show(response?.data?.message || 'Failed to send OTP', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('An error occurred. Please try again.', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };
  
  const verifyOtp = async () => {
    if (!otp) {
      ToastAndroid.show('Please enter the OTP', ToastAndroid.SHORT);
      return;
    }
  
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('phone', mobile_number);
      formData.append('otp', otp);
  
      const response = await axios.post(
        'https://loanguru.in/loan_guru_app/api/loginWithOtp',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      // Check if the response status is success
      if (response?.data?.status === 'success') {
        const { token, user_id, name, phone } = response.data.data;
  
        // Store token and user data in AsyncStorage
        await AsyncStorage.setItem('@storage_user_token', token);
        await AsyncStorage.setItem('@storage_user_data', JSON.stringify(response.data.data));
        await AsyncStorage.setItem('isLoggedIn', 'true');
  
        setIsLoggedIn(true);
        ToastAndroid.show('OTP verified successfully', ToastAndroid.SHORT);
        navigation.navigate('DashboardScreen'); // Navigate to dashboard
      } else {
        ToastAndroid.show(response?.data?.message || 'Failed to verify OTP', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('An error occurred. Please try again.', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
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
          >
            <Icon name="chevron-left" size={30} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Mobile Verify</Text>
        </View>
      </View>
      {step === 1 && (
        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          <View style={styles.stepContainer}>
            <Text style={styles.label}>Enter your Mobile Number</Text>
            <TextInput
              style={[styles.input, mobile_numberError && styles.inputError]}
              placeholder="Mobile number"
              value={mobile_number}
              keyboardType="phone-pad"
              onChangeText={(text) => {
                setMobile(text);
                setMobileError(false);
              }}
            />
            <TouchableOpacity style={styles.button} onPress={sendOtp} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send OTP'}</Text>
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
            <TouchableOpacity style={styles.button} onPress={verifyOtp} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify OTP'}</Text>
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

export default VerifyOtpScreen;
