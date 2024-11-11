import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const MultiStepForm = ({ }: any) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: '',
    fullName: '',
    dob: '',
    contactNumber: '',
    email: '',
    institutionName: '',
    occupation: '',
    password: '',
  });

  const [fontsLoaded] = useFonts({
    'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }
 
  const navigation : any = useNavigation();

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleChange = (key: any, value: any )=> {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log('Form Submitted', formData);
    navigation.reset({
      index: 0,
      routes: [{ name: 'CongratsScreen' }],
  });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepOneContainer}>
            
      <Text style={styles.stepOneLabel}>Select what kind {"\n"}of user you're</Text>
      {['Institute', 'Corporate', 'Others'].map((type) => (
        <TouchableOpacity
          key={type}
          style={[
            styles.userTypeButton,
            formData.userType === type && styles.selectedUserTypeButton,
          ]}
          onPress={() => {
            handleChange('userType', type); // Set the user type
            handleNext(); // Move to the next step
          }}
        >
          <Text
            style={[
              styles.userTypeButtonText,
              formData.userType === type && styles.selectedUserTypeButtonText,
            ]}
          >
            {type}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
        );
      case 2:
        return (
          <View style={styles.stepOneContainer}>
            <Text style={styles.label}>What is your name?</Text>
            <TextInput
              style={styles.input}
              placeholder="Full name"
              value={formData.fullName}
              onChangeText={(text) => handleChange('fullName', text)}
            />
          </View>
        );
      case 3:
        return (
          <View style={styles.stepOneContainer}>
            <Text style={styles.label}>What is your{"\n"}date of birth?</Text>
            <TextInput
              style={styles.input}
              placeholder="dd/mm/yyyy"
              value={formData.dob}
              onChangeText={(text) => handleChange('dob', text)}
            />
          </View>
        );
      case 4:
        return (
          <View style={styles.stepOneContainer}>
            <Text style={styles.label}>Contact details</Text>
            <TextInput
              style={styles.input}
              placeholder="Mobile number"
              value={formData.contactNumber}
              onChangeText={(text) => handleChange('contactNumber', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
            />
          </View>
        );
      case 5:
        return (
          <View style={styles.stepOneContainer}>
            <Text style={styles.label}>More details</Text>
            <TextInput
              style={styles.input}
              placeholder="Institution name"
              value={formData.institutionName}
              onChangeText={(text) => handleChange('institutionName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Occupation"
              value={formData.occupation}
              onChangeText={(text) => handleChange('occupation', text)}
            />
          </View>
        );
      case 6:
        return (
          <View style={styles.stepOneContainer}>
            <Text style={styles.label}>Yeah! Almost done {"\n"}{"\n"}Create your Log in{"\n"}details</Text>
            <TextInput
              style={styles.input}
              placeholder="Create Password"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => handleChange('password', text)}
            />
          </View>
        );
      case 7:
        return (
          <View style={styles.stepTwoContainer}>
            
            {Object.entries(formData).map(([key, value]) => (
               <View key={key} style={styles.reviewRow}>
               <Text style={styles.reviewKey}>{key}:</Text>
               <Text style={styles.reviewValue}>{value}</Text>
             </View>
            ))}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Create an Account</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/index.jpg')}
      resizeMode="cover"
      >
    
    <ScrollView contentContainerStyle={styles.container}>
      
      {step === 1 && ( // Only render the icon in case 1
  <View>
  <View style={styles.row}>
    <TouchableOpacity
      onPress={() => navigation.navigate('WelcomeScreen')}
    >
      <Icon name="chevron-left" size={40} color="#FFFFFF" />
    </TouchableOpacity>
    <Text style={styles.text}>Sign up</Text>
  </View>
  <Text style={styles.description}>Register with a few details</Text>
</View>
)}

{step >= 2 && step <= 6 && ( // Only render the icon in case 1
  <View>
    <View style={styles.rowone}>
        <Text style={styles.textone}>Sign up</Text>
    </View>
    <Text style={styles.descriptionone}>Register with a few details</Text>
  </View>
)}

{step === 7 && ( // Only render the icon in case 1
  <View>
  <View style={styles.row}>
    <TouchableOpacity
      onPress={() => navigation.navigate('WelcomeScreen')}
    >
      <Icon name="chevron-left" size={30} color="#FFFFFF" />
    </TouchableOpacity>
    <Text style={styles.text}>Review</Text>
  </View>
  <Text style={styles.description}>check your details are correct</Text>
</View>
)}
      
      
      {renderStep()}
      
      <View style={styles.navigation}>
  {step > 1 && step !== 7 && (
    <TouchableOpacity  onPress={handleBack}>
      <Text style={styles.back}>Back</Text>
      
    </TouchableOpacity>
  )}
  {step < 7 && step !== 1 && (
    <TouchableOpacity style={styles.navButton} onPress={handleNext}>
      <Icon name="chevron-right" size={30} color="#F5F5F5" />
    </TouchableOpacity>
  )}
</View>

    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // flex:1,
    justifyContent: 'center',
    height:'100%',
    width:'100%',
  },
  stepOneContainer: {
    flex: 1,
    marginBottom:'-100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50, 
    borderTopRightRadius: 50,
    padding: 20,
    marginTop:'40%',
  },
  stepOneLabel: {
    fontSize: 32,
    fontFamily:'Lato',
    fontWeight: '700',
    lineHeight:38.4,
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 30,
  },
  userTypeButton: {
    borderWidth: 2,
    borderColor: '#E3E2E2',
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 30,
    alignItems: 'center',
    alignSelf:'center',
    width:'90%',
  },
  selectedUserTypeButton: {
    backgroundColor: '#FFFFFF',
  },
  userTypeButtonText: {
    color: '#1E1E1E',
    fontSize: 24,
    fontFamily:'Lato',
    fontWeight:'600',
    lineHeight:28.8,
  },
  selectedUserTypeButtonText: {
    color: '#1E1E1E', // Change text color when selected
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    paddingHorizontal: '5%',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '600',
    fontFamily: 'Lato', 
  },
  description: {
    color: '#FFFFFF',
    fontWeight: '300',
    fontSize: 20,
    marginLeft: '12%',
    lineHeight:30,
    marginTop: 5,
    fontFamily: 'Lato',
  },
  rowone: {
    alignItems: 'flex-start',
    marginTop: '10%',
    paddingHorizontal: '5%',
  },
  textone: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '600',
    fontFamily: 'Lato', 
  },
  descriptionone: {
    color: '#FFFFFF',
    fontWeight: '300',
    fontSize: 20,
    marginLeft: '5%',
    lineHeight:30,
    marginTop: 5,
    fontFamily: 'Lato',
  },
  label: {
    fontSize: 32,
    fontFamily:'Lato',
    fontWeight: '700',
    lineHeight:38.4,
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 30,
    marginTop:'10%',
  },
  input: {
    borderWidth: 2,
    borderColor: '#9C9C9C',
    color:'#9C9C9C',
    borderRadius: 10,
    fontFamily:'Lato',
    fontSize:24,
    fontWeight:'600',
    lineHeight:28.8,
    padding: 10,
    marginBottom:30,
  },
  button: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  back:{
  fontFamily:'Lato',
  color:'#1E1E1E',
  marginTop:'30%',
  fontWeight:'400',
  fontSize:17,
  lineHeight:25.5,
  },
  selectedButton: {
    backgroundColor: '#6200ea',
  },
  buttonText: {
    color: '#000',
  },
  navigation: {
    flexDirection: 'row',
    // flex:1,
    padding:30,
    justifyContent: 'space-between',
    width:'100%',
    marginBottom:'10%',
  },
  navButton: {
    padding: 10,
    backgroundColor: '#622CFD',
    borderRadius: 40,
  },
  stepTwoContainer:{
    flex: 1,
    marginBottom:'-100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50, 
    borderTopRightRadius: 50,
    padding: 50,
    marginTop:'20%',
  },
  reviewText: {
    fontSize: 16,
    marginVertical: 5,
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  reviewKey: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  reviewValue: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'right',
    flex: 1,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MultiStepForm;
