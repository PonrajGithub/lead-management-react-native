import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ForgotPasswordScreen = () => {
  const [password, setPassword] = useState(''); // Define password state
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const navigation: any = useNavigation();

  const redirectToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Render nothing while fonts load (AppLoading deprecated)
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
     
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Icon name="chevron-left" size={36} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>ForgotPassword</Text>
         </View>

      {/* Form Section */}
      <View style={styles.stepOneContainer}>
        <Text style={styles.text}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            secureTextEntry={!showPassword} // Toggle password visibility
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome
              name={showPassword ? 'eye' : 'eye-slash'} // Icon toggles based on state
              size={20}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>

  
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  stepOneContainer: {
    alignSelf: 'center',
    width: '85%',
    marginTop: '50%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '8%',
    paddingHorizontal: '5%',
  },
  title: {
    color: '#1E1E1E',
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 43.2,
    fontFamily: 'Lato',
  },
  description: {
    color: '#1E1E1E',
    fontWeight: '300',
    fontSize: 20,
    marginLeft: '15%',
    fontFamily: 'Lato',
  },
  text: {
    marginLeft: '5%',
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 19.2,
    color: '#9C9C9C',
    fontFamily: 'Lato',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 10,
  },
  passwordInput: {
    flex: 1,
    color: '#1E1E1E',
    borderRadius: 8,
    fontFamily: 'Lato',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 28.8,
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
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Lato',
    lineHeight: 24,
  },
 
});

export default ForgotPasswordScreen;
