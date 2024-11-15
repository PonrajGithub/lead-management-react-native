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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'),
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
        source={require('../assets/images/index.jpg')}
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
            Your Trusted{"\n"}Partner For All{"\n"}Loan Needs
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
         Already have an account?{' '}
        <Text style={styles.link} onPress={redirectToLogin }>
          Sign in here
          </Text>
          </Text>

          <Text style={styles.terms}>
            By creating an account, you're agreeing to our{"\n"}
            <Text
              style={{ fontWeight: "700",textDecorationLine: 'underline', }}
              onPress={() => setIsModalVisible(true)}
            >
              Privacy Policy
            </Text>{" "}
            and{" "}
            <Text style={{ fontWeight: "700" }}>Terms of Use</Text>
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
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    width:250,
    height:250,
    marginLeft:40
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    fontFamily: 'Lato',
    textAlign:'left',
    lineHeight: 48,
    color: "#FFFFFF",
  },
  description: {
    fontWeight:'300',
    fontSize: 20,
    fontFamily: 'Lato',
    marginTop: 20,
    lineHeight: 30,
    color: "#FFFFFF",
    textAlign:'left',
  },
  body: {
    flex: 3,
    paddingHorizontal:40
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
  },
  createAccountText: {
    color: '#622CFD',
    fontSize: 20,
    fontWeight:'600',
    lineHeight:24,
    fontFamily: 'Lato',
    textAlign: "center",

  },
  singin: {
    fontSize: 15,
    fontWeight: '300',
    textAlign: 'center',
    color: '#F5F5F5',
    lineHeight:22.59,
    fontFamily: 'Lato',
  },
  link: {
    color: '#F5F5F5', // Matching link color with the forgot password text
    fontWeight: '700',
    textDecorationLine: 'underline',
    fontFamily: 'Lato',
    
  },
  terms: {
    fontSize: 15,
    fontWeight: '300',
    textAlign: 'center',
    color: '#F5F5F5',
    lineHeight:22.59,
    fontFamily: 'Lato',
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
