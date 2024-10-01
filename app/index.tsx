import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';


const WelcomeScreen = ({ }: any) => {
  const navigation: any = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6C2EB9" barStyle="light-content" />
      <View style={styles.header} />
      <View style={styles.body}>
        <Text style={styles.welcomeText}>Welcome to Loanguru</Text>
        <Text style={styles.subText}>Your trusted partner for all loan needs.</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.createAccountButton} 
          onPress={() => navigation.navigate('CreateAccountScreen')} 
        >
          <Text style={styles.createAccountText}>CREATE YOUR FREE ACCOUNT</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => navigation.navigate('LoginScreen')} 
        >
          <Text style={styles.loginText}>LOG INTO YOUR ACCOUNT</Text>
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
  header: {
    height: 50,
    backgroundColor: '#6C2EB9', // Purple top bar
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
  },
  subText: {
    fontSize: 16,
    color: '#777',
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
});

export default WelcomeScreen;
