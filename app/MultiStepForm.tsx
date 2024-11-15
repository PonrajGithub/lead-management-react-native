import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';


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

  const navigation: any = useNavigation();
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const isIOS = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';

  // Validation function
  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};
    switch (step) {
      case 2: // Validate name
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
        break;
      case 3: // Validate DOB
        if (!formData.dob) newErrors.dob = 'Date of birth is required.';
        break;
      case 4: // Validate contact details
        if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Mobile number is required.';
        if (!formData.email.trim()) newErrors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address.';
        break;
      case 5: // Validate institution and occupation
        if (!formData.institutionName.trim()) newErrors.institutionName = 'Institution name is required.';
        if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required.';
        break;
      case 6: // Validate password
        if (!formData.password.trim()) newErrors.password = 'Password is required.';
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit function
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://loanguru.in/loan_guru_app/api/register', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response.data);
      if (response.data.success) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'CongratsScreen' }],
        });
      } else {
        alert(response.data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('API error:', error);
      alert('Failed to create an account. Please try again.');
    } finally {
      setLoading(false);
    }
  };
 

  const handleNext = () => {
    if (validateStep()) {
      if (step === 7) {
        handleSubmit(); // Final step, submit data
      } else {
        setStep((prev) => prev + 1); // Proceed to next step
      }
    }
  };
  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-GB'); // Format: dd/mm/yyyy
      handleChange('dob', formattedDate);
    }
  };
  const handleBack = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleChange = (key: any, value: any )=> {
    setFormData((prev) => ({ ...prev, [key]: value }));
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
                        {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

          </View>
        );
      case 3:
        return (
          <View style={styles.stepOneContainer}>
      <Text style={styles.label}>What is your{"\n"}date of birth?</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="dd/mm/yyyy"
          value={formData.dob}
          editable={false} // Disable direct editing
        />
      </TouchableOpacity>
      {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()} // Optional: Restrict to past dates
        />
      )}
    </View>
        );
      case 4:
        return (
          <View style={styles.stepOneContainer}>
            <Text style={styles.label}>Contact details</Text>
            <TextInput
              style={styles.input}
              placeholder="Mobile number"
              keyboardType="phone-pad"
              value={formData.contactNumber}
              onChangeText={(text) => handleChange('contactNumber', text)}
            />
                        {errors.contactNumber && <Text style={styles.errorText}>{errors.contactNumber}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
            />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

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
                        {errors.institutionName && <Text style={styles.errorText}>{errors.institutionName}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Occupation"
              value={formData.occupation}
              onChangeText={(text) => handleChange('occupation', text)}
            />
            {errors.occupation && <Text style={styles.errorText}>{errors.occupation}</Text>}
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
             {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

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
 <ScrollView contentContainerStyle={styles.container}>
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
      onPress={handleBack}
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
  {step > 1 &&  (
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
    // justifyContent: 'center',
    height:'100%',
    width:'100%',
  },
  stepOneContainer: {
    // flex: 1,
    marginBottom:'-100%',
    height:'100%',
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
  stepContainer: {
    marginTop: '40%',
    padding: 20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  datePickerButton: {
    borderWidth: 2,
    borderColor: '#9C9C9C',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 18,
    color: '#1E1E1E',
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
  errorText: {
    color: 'red',
    textAlign: 'right',
    // marginBottom: 5,
    fontSize: 10,
    fontFamily: 'Lato',
  },
  stepTwoContainer:{
    // flex: 1,
    // marginBottom:'-100%',
    height:'100%',
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
    // flex: 1,
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
