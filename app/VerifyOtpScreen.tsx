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
  const [userName, setUserName] = useState('');
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
    if (!mobile_number || mobile_number.length !== 10) {
  setMobileError(true);
  ToastAndroid.show('Please enter a valid 10-digit Indian mobile number', ToastAndroid.SHORT);
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
      ToastAndroid.show('Something went wrong. Please try again.', ToastAndroid.SHORT);
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
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
  
      console.log('Verify OTP Response:', JSON.stringify(response.data, null, 2)); // Debugging API response
  
      if (response?.data?.status === 'success' && response?.data?.data) {
        const { token, user_id, name } = response.data.data; // Adjust based on actual response
        console.log('Extracted User Data:', { user_id, name });
  
        if (!token || !name) {
          throw new Error("Missing required user data (token or name).");
        }
  
        // Store user details securely
        await AsyncStorage.setItem('@storage_user_token', token);
        await AsyncStorage.setItem('@storage_user_data', JSON.stringify({ user_id, name }));
        await AsyncStorage.setItem('isLoggedIn', 'true');
  
        if (name === "New User") {
          console.log("Navigating to Step 3 for name update");
          setStep(3); // Ask for name update
        } else {
          ToastAndroid.show('OTP verified successfully', ToastAndroid.SHORT);
           navigation.reset({
            index: 0,
            routes: [{ name: 'DashboardScreen' }],
          });
        }
      } else {
        ToastAndroid.show('Invalid OTP or user data missing.', ToastAndroid.SHORT);
      }
    } catch (error) {
      // console.error('OTP Verification Error:', error?.response?.data || error.message);
      ToastAndroid.show('Something went wrong. Please try again.', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  const updateUserName = async () => {
    if (!userName.trim()) {
      ToastAndroid.show("Name can't be empty", ToastAndroid.SHORT);
      return;
    }
  
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('@storage_user_token');
      if (!token) {
        ToastAndroid.show('User authentication failed.', ToastAndroid.SHORT);
        setLoading(false); // Stop loading if no token
        return;
      }
  
      const formData = new FormData();
      formData.append("name", userName);
  
      const response = await axios.post(
        "https://loanguru.in/loan_guru_app/api/updatename",
        formData,
        { 
          headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "multipart/form-data" 
          } 
        }
      );
  
      if (response.data.status === "success") {
        ToastAndroid.show('Name updated successfully!', ToastAndroid.SHORT);
         navigation.reset({
            index: 0,
            routes: [{ name: 'DashboardScreen' }],
          }); // Ensure navigation is correct
      } else {
        ToastAndroid.show(response.data.message || 'Failed to update name.', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Something went wrong. Please try again.', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };
  

const redirectToMobileVerify = () =>{
  navigation.navigate('LoginScreen');
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
            onPress={() => navigation.navigate('WelcomeScreen')}
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
            <View style={styles.inputRow}>
            <Text style={styles.prefix}>+91</Text>
            <TextInput
              style={[styles.inputOne, mobile_numberError && styles.inputError, { flex: 1, borderLeftWidth: 0 }]}
              placeholder="Enter mobile number"
              value={mobile_number}
              keyboardType="number-pad"
              maxLength={10}
              onChangeText={(text) => {
                const filteredText = text.replace(/[^0-9]/g, '');
                setMobile(filteredText);
                setMobileError(false);
              }}
            />
          </View>

            <TouchableOpacity style={styles.button} onPress={sendOtp} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send OTP'}</Text>
            </TouchableOpacity>

            <View style={styles.inlineContainer}>
             <TouchableOpacity onPress={redirectToMobileVerify}>
                          <Text style={styles.linkText}>Login with User Name</Text>
                        </TouchableOpacity>
            </View>
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
      {step === 3 && (
        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          <View style={styles.stepContainer}>
            <Text style={styles.label}>Enter Your Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={userName}
              onChangeText={setUserName}
            />
            <TouchableOpacity style={styles.button} onPress={updateUserName} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Updating...' : 'Continue'}</Text>
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
  inputOne:{
    color: '#1E1E1E',
    borderRadius: 8,
    fontFamily: 'Lato',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28.8,
    padding: 10,
    // marginBottom: 20,

  },
  inputRow: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#000',
  borderRadius: 8,
  marginBottom: 20,
  paddingHorizontal: 10,
},
prefix: {
  fontSize: 20,
  fontWeight: '600',
  fontFamily: 'Lato',
  marginRight: 8,
  color: '#1E1E1E',
},

  inlineContainer: {
    flexDirection: 'row',
    justifyContent:'flex-end',     
    margin: 10,
    // alignItems:'flex-end',
  },
  linkText: {
    color: '#622CFD',
    marginTop: 20,
    textAlign: 'right',
    fontFamily: 'Lato',
    fontSize: 16,
    lineHeight: 19.2,
    textDecorationLine: 'underline', 
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
    marginTop:'5%',
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
