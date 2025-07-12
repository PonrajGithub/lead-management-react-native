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
  Dimensions,
} from 'react-native';
import { useNavigation } from 'expo-router';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

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
    navigation.navigate('MultiStepForm', { Index: 0 });
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
          {/* <Text style={styles.description}>
            Loan process made simple
          </Text> */}
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.createAccountButton]}
            onPressIn={() => setIsHoveredCreate(true)}
            onPressOut={() => setIsHoveredCreate(false)}
            onPress={() => navigation.navigate('VerifyOtpScreen')}
          >
            <Text style={[styles.createAccountText]}>Get Started</Text>
          </TouchableOpacity>

          <Text style={styles.singin}>
            Already have an account?{' '}
            <Text style={styles.link} onPress={redirectToLogin}>
              Sign up here
            </Text>
          </Text>

          <Text style={styles.terms}>
            By creating an account, you're agreeing to our{"\n"}
            <Text
              style={{ fontWeight: "700", textDecorationLine: 'underline' }}
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
                <Text style={styles.closeButtonText} onPress={() => setIsModalVisible(false)}>X</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Privacy Policy</Text>
              <ScrollView>
                <Text style={styles.modalText}>
                We are committed to keep your data secure, your private information private, and being transparent about our practices. We adhere to the best practices to secure information collected from you.
M.S. Loan Guru Private Limited, a private limited company, incorporated under the provisions of the Companies Act, 2013, having its registered office at No. 11/10, Kaveri street, saligramam, Chennai - 600093 and its Affiliates/Subsidiaries/Associates including but not limited to M.S. Loan Guru Private Limited ,(hereinafter referred as "We", "Us", "Our", or "Company" or "Loan Guru " or “Loan Guru) owns, operates and manages a website having domain name https://www.Loanguru.in and related software application for use on wireless computing devices such as smartphones and tablets and also for use on desktop or laptop computers under the name and style of "Loan Guru " (collectively hereinafter referred to as "Platform" or "Application").
The Platform facilitates and enables the User in availing certain online products and services from the Platform, including, inter alia, loans, investment and wealth management services, insurances, other marketplace products to the Users ("Services"), in accordance with the terms and conditions of use/Service of the Platform, as available at https://www.Loanguru.in/terms-of-services ("Terms of Use").
For the purposes of this privacy policy (hereinafter referred to as "Privacy Policy" or "Policy"), wherever the context so requires, references to the terms "User(s)", "You" or "Your", shall mean and include the user, registered on the Platform, who uses or access the Platform or avails the Service(s) (as defined below) of the Platform in accordance with the Terms of Use.
This Privacy Policy is published in compliance with the Information Technology Act, 2000, and applicable amendments, rules, regulations and guidelines enacted thereunder from time to time (“IT Act”) with specific mention of regulation 4 of the Information Technology (Reasonable Security Practices and Procedures and Sensitive personal information) Rules, 2011, and any other national and state laws which relate the processing of data. This Privacy Policy is an electronic record in terms of the IT Act and this electronic record is generated by a computer system and does not require any physical or digital signatures. Any new features and/or services that are added to our current service at any point in the future shall also be subject to the terms set out in this Policy along with any other future relevant legislations to be incorporated as per the laws of the land. This Privacy Policy shall apply to any person who visits, browses, uses or accesses the Platform or use any Services on the Platform.
This Privacy Policy, inter alia, states: (i) the type of information collected from the Users, including personal information and sensitive personal data or information (as defined below), relating to an individual; (ii) the purpose, means and modes of collection, usage, processing, retention and destruction of such information; (iii) how and to whom We will disclose such information; and (iv) how We will protect the Users’ personal information when they access the Platform.
Loan Guru does not knowingly collect or solicit personal information from anyone under the age of 18. If you are under 18, please do not attempt to register for the Services or send any personal information about yourself to Loan Guru. If Loan Guru learns that we have collected personal information from a person under age 18, we will delete that information as quickly as possible. If you believe that a person under 18 may have provided us with personal information, please contact us at support@loanguru.in

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
    width: width * 0.6, // Responsive image size
    height: height * 0.25,
    marginLeft: width * 0.1,
  },
  title: {
    fontSize: width * 0.1, // Adjust font size dynamically
    fontWeight: '700',
    fontFamily: 'Lato',
    textAlign: 'left',
    lineHeight: width * 0.12,
    color: "#FFFFFF",
  },
  description: {
    fontWeight: '300',
    fontSize: width * 0.05,
    fontFamily: 'Lato',
    marginTop: height * 0.02,
    lineHeight: width * 0.07,
    color: "#FFFFFF",
    textAlign: 'left',
  },
  body: {
    flex: 3,
    paddingHorizontal: width * 0.1,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  createAccountButton: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.2,
    borderRadius: 10,
    marginBottom: height * 0.02,
    width: "80%",
  },
  createAccountText: {
    color: '#622CFD',
    fontSize: width * 0.05,
    fontWeight: '600',
    lineHeight: width * 0.06,
    fontFamily: 'Lato',
    textAlign: "center",
  },
  singin: {
    fontSize: width * 0.04,
    fontWeight: '300',
    textAlign: 'center',
    color: '#F5F5F5',
    lineHeight: height * 0.03,
    fontFamily: 'Lato',
  },
  link: {
    color: '#F5F5F5',
    fontWeight: '700',
    textDecorationLine: 'underline',
    fontFamily: 'Lato',
  },
  terms: {
    fontSize: width * 0.04,
    fontWeight: '300',
    textAlign: 'center',
    color: '#F5F5F5',
    lineHeight: height * 0.03,
    fontFamily: 'Lato',
    marginTop: height * 0.03,
    marginBottom: height * 0.05,
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
    fontSize: 25,
  },
  modalTitle: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
    fontFamily:'Lato',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    fontFamily:'Lato',
    padding:10,
  },
});

export default WelcomeScreen;
