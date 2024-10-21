import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const WelcomeScreen = ({ }: any) => {
  const navigation: any = useNavigation();
  const [isHoveredCreate, setIsHoveredCreate] = useState(false);
  const [isHoveredLogin, setIsHoveredLogin] = useState(false);
  const [fontsLoaded] = useFonts({
    'text': require('../assets/fonts/static/Rubik-Regular.ttf'),
    'heading': require('../assets/fonts/static/Rubik-Bold.ttf'), 
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6A1B9B" barStyle="light-content" />
      <View style={styles.body}>
        <Text style={styles.welcomeText}>Welcome to Loanguru</Text>
        <Text style={styles.subText}>Your trusted partner for all loan needs.</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.createAccountButton,
            isHoveredCreate && styles.buttonHovered,
          ]}
          onPressIn={() => setIsHoveredCreate(true)}
          onPressOut={() => setIsHoveredCreate(false)}
          onPress={() => navigation.navigate('CreateAccountScreen')}
        >
          <Text
            style={[
              styles.createAccountText,
              isHoveredCreate && styles.textHovered,
            ]}
          >
            CREATE YOUR FREE ACCOUNT
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.loginButton,
            isHoveredLogin && styles.buttonHovered,
          ]}
          onPressIn={() => setIsHoveredLogin(true)}
          onPressOut={() => setIsHoveredLogin(false)}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text
            style={[
              styles.loginText,
              isHoveredLogin && styles.textHovered,
            ]}
          >
            LOG INTO YOUR ACCOUNT
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    fontFamily:'heading'
  },
  subText: {
    fontSize: 16,
    color: '#777',
    fontFamily:'text'
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  createAccountButton: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
  },
  createAccountText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily:'heading'
  },
  loginButton: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  loginText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonHovered: {
    backgroundColor: '#0061F0', 
  },
  textHovered: {
    color: '#fff', 
  },
});

export default WelcomeScreen;
