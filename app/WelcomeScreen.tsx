import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ImageBackground, SafeAreaView, Image } from 'react-native';
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
       <ImageBackground 
      source={require('../assets/images/background.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
       <Image
        source={require('@/assets/images/Frame.png')} // Replace with your image path
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.body}>
        <Text style={styles.title}>Your Trusted{"\n"}Partner For All{"\n"}Loan Needs</Text>
        <Text style={styles.description}>The best app for getting loan{"\n"}easy and secure</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.createAccountButton,
                    ]}
          onPressIn={() => setIsHoveredCreate(true)}
          onPressOut={() => setIsHoveredCreate(false)}
          onPress={() => navigation.navigate('CreateAccountScreen')}
        >
          <Text
            style={[
              styles.createAccountText,
            ]}
          > Get Started
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.loginButton,
          ]}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text
            style={[
              styles.loginText,
            ]}
          >
            Log In
          </Text>
        </TouchableOpacity>
        <Text style={styles.terms}>By creating account.you'er agree to out {"\n"}         <Text style={{fontWeight: "bold"}}>Privacy policy</Text> and <Text style={{fontWeight: "bold"}}>Term of use</Text></Text>

      </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',  
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image:{
  marginTop:"30%",
  marginLeft:"10%",
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    fontFamily: 'heading',
    marginRight:"20%",
    lineHeight: 48,
    // marginTop: 20,
    color:"#FFFFF",
  },
  description: {
    // textAlign: 'left',
    marginRight:"33%",
    fontSize: 15,
    fontFamily: 'text',
    // marginTop: 20,
    lineHeight: 25,
    color:"#FFFFF",
  },
  body: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:"15%",
  },
  createAccountButton: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    width:"80%",
  },
  createAccountText: {
    color: '#FFFFF',
    fontSize: 18,
    fontWeight: '500',
    fontFamily:'heading',
    textAlign:"center",
  },
  loginButton: {
    backgroundColor: '#fff',
    borderColor: '#1e3a8a',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    width:"60%",
  },
  loginText: {
    color: '#FFFFF',
    fontSize: 18,
    fontWeight: '500',
    fontFamily:'heading',
    textAlign:"center",
  },
  terms:{
    fontSize: 15,
    fontFamily: 'text',
    // marginTop: 20,
    lineHeight: 25,
    color:"#FFF",
  },
});

export default WelcomeScreen;
