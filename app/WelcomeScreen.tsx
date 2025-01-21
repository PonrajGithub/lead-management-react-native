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
          <Text style={styles.description}>
            The best app for getting loan{"\n"}easy and secure
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.createAccountButton]}
            onPressIn={() => setIsHoveredCreate(true)}
            onPressOut={() => setIsHoveredCreate(false)}
            onPress={() => navigation.navigate('LoginScreen')}
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
                Your privacy policy content goes here...
                  Data Collection: We collect personal information such as name, contact details, and financial data to assess your loan application and provide services.

Purpose: Your information is used to evaluate loan eligibility, process applications, and improve service quality.

Data Sharing: We may share your data with credit bureaus, financial institutions, or regulatory authorities, as required by law.

Consent: By applying for a loan, you consent to the collection and use of your data as outlined in this policy.

Security: We implement stringent security measures to protect your data from unauthorized access and breaches.

Third-Party Services: Some services may involve trusted third-party providers, who are contractually obligated to safeguard your data.

Cookies and Tracking: Our website or app may use cookies to enhance your user experience.

Marketing Communications: We may contact you with promotional offers. You can opt-out at any time.

Retention: Your data is retained only as long as necessary for legal, regulatory, or business purposes.

Access and Correction: You can request access to your personal data and correct any inaccuracies.

Data Collection: We collect personal information such as name, contact details, and financial data to assess your loan application and provide services.

Purpose: Your information is used to evaluate loan eligibility, process applications, and improve service quality.

Data Sharing: We may share your data with credit bureaus, financial institutions, or regulatory authorities, as required by law.

Consent: By applying for a loan, you consent to the collection and use of your data as outlined in this policy.

Security: We implement stringent security measures to protect your data from unauthorized access and breaches.

Third-Party Services: Some services may involve trusted third-party providers, who are contractually obligated to safeguard your data.

Cookies and Tracking: Our website or app may use cookies to enhance your user experience.

Marketing Communications: We may contact you with promotional offers. You can opt-out at any time.

Retention: Your data is retained only as long as necessary for legal, regulatory, or business purposes.

Access and Correction: You can request access to your personal data and correct any inaccuracies.
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
    fontSize: 30,
  },
  modalTitle: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 24,
  },
});

export default WelcomeScreen;
