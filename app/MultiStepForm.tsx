import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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
    'text': require('../assets/fonts/Lato/Lato-Light.ttf'),
      'heading': require('../assets/fonts/Lato/Lato-Bold.ttf'),
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
          <View style={styles.stepTwoContainer}>
            <Text style={styles.label}>What is your?</Text>
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
          <View style={styles.stepTwoContainer}>
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
          <View style={styles.stepTwoContainer}>
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
          <View style={styles.stepTwoContainer}>
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
          <View style={styles.stepTwoContainer}>
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
          <View>
            <Text style={styles.label}>Review your details</Text>
            {Object.entries(formData).map(([key, value]) => (
              <Text key={key} style={styles.reviewText}>
                {key}: {value}
              </Text>
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
    
    <ScrollView contentContainerStyle={styles.container}>
      
      {step === 1 && ( // Only render the icon in case 1
  <View>
  <View style={styles.row}>
    <TouchableOpacity
      onPress={() => navigation.navigate('WelcomeScreen')}
      style={styles.iconContainer}
    >
      <Icon name="chevron-left" size={30} color="#000" />
    </TouchableOpacity>
    <Text style={styles.text}>Sign up</Text>
  </View>
  <Text style={styles.description}>Register with a few details</Text>
</View>
)}

{step >= 2 && step <= 6 && ( // Only render the icon in case 1
  <View>
    <View style={styles.rowone}>
        <Text style={styles.text}>Sign up</Text>
    </View>
    <Text style={styles.description}>Register with a few details</Text>
  </View>
)}
      
      
      {renderStep()}
      
      <View style={styles.navigation}>
  {step > 1 &&  (
    <TouchableOpacity  onPress={handleBack}>
      <Text style={styles.back}>Back</Text>
      
    </TouchableOpacity>
  )}
  {step < 7 && step !== 1 && (
    <TouchableOpacity style={styles.navButton} onPress={handleNext}>
      <Icon name="chevron-right" size={30} color="#fff" />
    </TouchableOpacity>
  )}
</View>

    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    // padding: 15,
    height:'100%',
    width:'100%',
  },
  stepOneContainer: {
    flex: 1,
    marginBottom:'-100%',
    backgroundColor: '#5A2BD9',
    borderTopLeftRadius: 50, 
    borderTopRightRadius: 50,
    padding: 20,
    marginTop:'30%'
  },
  stepOneLabel: {
    fontSize: 30,
    fontFamily:'heading',
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  userTypeButton: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 15,
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
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily:'text',
  },
  selectedUserTypeButtonText: {
    color: '#5A2BD9', // Change text color when selected
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    paddingHorizontal: '5%',
  },
  iconContainer: {
    marginRight: 10,
  },
  text: {
    color: 'black',
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'text', // Use a valid font or remove if not required
  },
  description: {
    color: '#666666',
    fontWeight: '400',
    fontSize: 18,
    marginLeft: '5%',
    marginTop: 5,
    fontFamily: 'text',
  },

  stepTwoContainer:{
    flex:1,
    padding:30,
  },
  rowone: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    paddingHorizontal: '5%',
  },
  label: {
    textAlign:'center',
    fontSize: 30,
    fontFamily:'heading',
    fontWeight: 'bold',
    marginTop:'50%',
    marginBottom: '10%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    color:'#666666',
    borderRadius: 8,
    fontFamily:'text',
    fontSize:15,
    fontWeight:'ultralight',
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
  fontFamily:'text',
  color:'#000',
  marginTop:'30%'
  },
  selectedButton: {
    backgroundColor: '#6200ea',
  },
  buttonText: {
    color: '#000',
  },
  navigation: {
    flexDirection: 'row',
    padding:30,
    justifyContent: 'space-between',
    width:'100%',
    marginBottom:'20%',
  },
  navButton: {
    padding: 10,
    backgroundColor: '#6200ea',
    borderRadius: 40,
  },
  reviewText: {
    fontSize: 16,
    marginVertical: 5,
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
