import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import { useNavigation } from 'expo-router';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const WelcomeScreen = ({ }: any) => {
  const navigation: any = useNavigation();
  const [isHoveredCreate, setIsHoveredCreate] = useState(false);
  const [isHoveredLogin, setIsHoveredLogin] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    'text': require('../assets/fonts/Lato/Lato-Light.ttf'),
      'heading': require('../assets/fonts/Lato/Lato-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  
  const redirectToLogin = () => {
    navigation.navigate('LoginScreen', {Index:0});
  };


  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/background.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <Image
          source={require('../assets/images/loan.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.body}>
          <Text style={styles.title}>
            Your Trusted Partner{"\n"} For All Loan Needs
          </Text>
          <Text style={styles.description}>
            The best app for getting loan{"\n"}easy and secure
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.createAccountButton]}
            onPressIn={() => setIsHoveredCreate(true)}
            onPressOut={() => setIsHoveredCreate(false)}
            onPress={() => navigation.navigate('MultiStepForm')}
          >
            <Text style={[styles.createAccountText]}>Get Started</Text>
          </TouchableOpacity>
          
          <Text style={styles.singin}>
         Do you already have an account?{' '}
        <Text style={styles.link} onPress={redirectToLogin }>
          Sign in here
          </Text>
          </Text>

          <Text style={styles.terms}>
            By creating an account, you're agreeing to our{"\n"}
            <Text
              style={{ fontWeight: "bold",textDecorationLine: 'underline', }}
              onPress={() => setIsModalVisible(true)}
            >
              Privacy Policy
            </Text>{" "}
            and{" "}
            <Text style={{ fontWeight: "bold" }}>Terms of Use</Text>
          </Text>
        </View>

        {/* Privacy Policy Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
               
              >
                <Text style={styles.closeButtonText}  onPress={() => setIsModalVisible(false)}>×</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Privacy Policy</Text>
              <ScrollView>
                <Text style={styles.modalText}>
                  Your privacy policy content goes here...
                </Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f5f5f5',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    marginLeft: "10%",
    width:250,
    height:250,
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    fontFamily: 'heading',
    // marginRight: "20%",
    textAlign:'center',
    lineHeight: 48,
    color: "#fff",
  },
  description: {
    // marginBottom:80,
    fontSize: 18,
    fontFamily: 'text',
    marginTop: 20,
    lineHeight: 30,
    color: "#FFF",
    textAlign:'center',
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
    marginBottom: "15%",
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
    width: "80%",
    height: '35%',
  },
  createAccountText: {
    color: '#622CFD',
    fontSize: 18,
    fontFamily: 'heading',
    textAlign: "center",
  },
  singin: {
    fontSize: 15,
    fontWeight: 'semibold',
    textAlign: 'center',
    // marginBottom: 30,
    color: '#fff', // Subtle blue for the text below the button
    fontFamily: 'text',
  },
  link: {
    color: '#fffff', // Matching link color with the forgot password text
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontFamily: 'text',
    
  },
  terms: {
    fontSize: 15,
    fontFamily: 'text',
    lineHeight: 25,
    color: "#FFF",
    marginTop:'10%',
    marginBottom: 30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    position: 'absolute',
    right: 10,
    marginTop:-17,
    fontSize:28,
    cursor: 'pointer',
  },
  modalTitle: {
    fontSize: 22,
    textAlign:'center',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 24,
    fontWeight:"semibold",
  },
});

export default WelcomeScreen;
