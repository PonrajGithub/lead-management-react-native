import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import Checkbox from 'expo-checkbox';




const MultiStepForm = ({ }: any) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    user_type: '',
    name: '',
    dob: '',
    mobile_number: '',
    email: '',
    institution_name: '',
    occupation: '',
    company_name: '',
    designation: '',
    password: '',
    agreedToTerms: 'false',
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
      case 2:
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        break;
      case 3: // Validate DOB
        if (!formData.dob) newErrors.dob = 'Date of birth is required.';
        break;
      case 4:
        if (!formData.mobile_number.trim() || !/^\d{10}$/.test(formData.mobile_number)) {
          newErrors.mobile_number = 'Valid mobile number is required.';
        }
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Valid email is required.';
        }
        break;
      case 5: // Validate institution and occupation
        if (!formData.institution_name.trim()) newErrors.institution_name = 'Institution name is required.';
        if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required.';
        break;
      case 6: // Validate company and designation
        if (!formData.company_name.trim()) newErrors.company_name = 'company name is required.';
        if (!formData.designation.trim()) newErrors.designation = 'designation is required.';
        break;
      case 7: // Validate password
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
      const response = await axios.post(
        'https://loanguru.in/loan_guru_app/api/register',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.data.success) {
        const { token } = response.data.data;
        await AsyncStorage.setItem('@storage_user_token', token);

        // Show success message
        ToastAndroid.show('Registration successful!', ToastAndroid.SHORT);


        // Navigate to the Congrats screen
        navigation.reset({ index: 0, routes: [{ name: 'CongratsScreen' }] });
      } else {
        throw new Error(response.data.message || 'Unknown error occurred.');
      }
    } catch (error: any) {
      // Show error message
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };


  const handleNext = () => {
    if (validateStep()) {
      if (step === 8) {
        handleSubmit(); // Final step, submit data
      } else {
        if (step == 5 && formData?.user_type == 'Institute') {
          setStep(7)
        } else {
          if (step == 4 && formData?.user_type !== 'Institute') {
            setStep(6);
          } else {
            setStep((prev) => prev + 1); // Proceed to next step
          }
        }
      }
    }
  };
  const handleDateChange = (event: any, selectedDate: any) => {
    setShowPicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-GB'); // Format: dd/mm/yyyy
      handleChange('dob', formattedDate);
    }
  };
  const handleBack = () => {
    if (step == 7 && formData?.user_type == 'Institute') {
      setStep(5)
    } else {
      if (step == 6 && formData?.user_type !== 'Institute') {
        setStep(4);
      } else {
        setStep((prev) => (prev > 1 ? prev - 1 : prev));
      }
    }
  };

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (step == 1) {
      setFormData({
        user_type: '',
        name: '',
        dob: '',
        mobile_number: '',
        email: '',
        institution_name: '',
        occupation: '',
        company_name: '',
        designation: '',
        password: '',
        agreedToTerms: 'false',
      })
    }
  }, [step, setFormData])


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.label}>Select your user type</Text>
            {['Institute', 'Corporate', 'Others'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.userTypeButton,
                  formData.user_type === type && styles.selectedUserTypeButton,
                ]}
                onPress={() => {
                  handleChange('user_type', type);
                  handleNext();
                }}
              >
                <Text
                  style={[
                    styles.userTypeButtonText,
                    formData.user_type === type && styles.selectedUserTypeButtonText,
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
          <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
            <View style={styles.stepContainer}>
              <Text style={styles.label}>What is your name?</Text>
              <TextInput
                style={[styles.input, errors.name && styles.errorInput]}
                placeholder="Name"
                value={formData.name}
                onChangeText={(text) => handleChange('name', text)}
              />
              <View style={styles.navigation}>
                <TouchableOpacity onPress={handleBack}>
                  <Text style={styles.back}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleNext}>
                  <Icon name="chevron-right" size={30} color="#F5F5F5" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );
      case 3:
        return (
          <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
            <View style={styles.stepContainer}>
              <Text style={styles.label}>What is your{"\n"}date of birth?</Text>
              <TouchableOpacity onPress={() => setShowPicker(true)}>
                <TextInput
                  style={[styles.input, errors.dob && styles.errorInput]}
                  placeholder="dd/mm/yyyy"
                  value={formData.dob}
                  editable={false} // Disable direct editing
                />
              </TouchableOpacity>
              {showPicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  maximumDate={new Date()} // Optional: Restrict to past dates
                />
              )}
              <View style={styles.navigationDob}>
                <TouchableOpacity onPress={handleBack}>
                  <Text style={styles.back}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleNext}>
                  <Icon name="chevron-right" size={30} color="#F5F5F5" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );
      case 4:
        return (
          <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
            <View style={styles.stepContainer}>
              <Text style={styles.label}>Contact details</Text>
              <TextInput
                style={[styles.input, errors.mobile_number && styles.errorInput]}
                placeholder="Mobile number"
                keyboardType="phone-pad"
                value={formData.mobile_number}
                onChangeText={(text) => handleChange('mobile_number', text)}
              />
              <TextInput
                style={[styles.input, errors.email && styles.errorInput]}
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
              />
              <View style={styles.navigationCom}>
                <TouchableOpacity onPress={handleBack}>
                  <Text style={styles.back}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleNext}>
                  <Icon name="chevron-right" size={30} color="#F5F5F5" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );
      case 5:
        return (
          <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
            <View style={styles.stepContainer}>
              <Text style={styles.label}>Institute details</Text>
              <TextInput
                style={[styles.input, errors.institution_name && styles.errorInput]}
                placeholder="Institution name"
                value={formData.institution_name}
                onChangeText={(text) => handleChange('institution_name', text)}
              />
              <TextInput
                style={[styles.input, errors.occupation && styles.errorInput]}
                placeholder="Occupation"
                value={formData.occupation}
                onChangeText={(text) => handleChange('occupation', text)}
              />
              <View style={styles.navigationCom}>
                <TouchableOpacity onPress={handleBack}>
                  <Text style={styles.back}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleNext}>
                  <Icon name="chevron-right" size={30} color="#F5F5F5" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );
      case 6: // New Case for Company Name and Designation
        return (
          <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
            <View style={styles.stepContainer}>
              <Text style={styles.label}>Company details</Text>
              <TextInput
                style={[styles.input, errors.company_name && styles.errorInput]}
                placeholder="Company Name"
                value={formData.company_name}
                onChangeText={(text) => handleChange('company_name', text)}
              />
              <TextInput
                style={[styles.input, errors.designation && styles.errorInput]}
                placeholder="Designation"
                value={formData.designation}
                onChangeText={(text) => handleChange('designation', text)}
              />
              <View style={styles.navigationCom}>
                <TouchableOpacity onPress={handleBack}>
                  <Text style={styles.back}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleNext}>
                  <Icon name="chevron-right" size={30} color="#F5F5F5" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );
      case 7:
        return (
          <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
            <View style={styles.stepContainer}>
              <Text style={styles.label}>Yeah! Almost done {"\n"}{"\n"}Create your Log in{"\n"}details</Text>
              <TextInput
                style={[styles.input, errors.password && styles.errorInput]}
                placeholder="Create Password"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
              />
              <View style={styles.navigationPass}>
                <TouchableOpacity onPress={handleBack}>
                  <Text style={styles.back}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleNext}>
                  <Icon name="chevron-right" size={30} color="#F5F5F5" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );
      case 8:
        return (

          <View style={styles.stepTwoContainer}>
            <Text style={styles.text}>Review</Text>
            <Text style={styles.description}>Check your details are correct</Text>


            <ScrollView style={styles.contentOne} contentContainerStyle={styles.scrollContentOne}>
              {/* Account Type */}
              <View style={styles.inputGroup}>
                <Text style={styles.labelReview}>Account Type</Text>
                <View style={styles.accountTypeContainer}>
                  <Text style={styles.accountTypeText}>{formData.user_type}</Text>
                  <TouchableOpacity
                    onPress={() => console.log('Change Account Type')}
                    style={styles.changeButton}
                  >
                    <Text style={styles.changeButtonText}>Change</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.labelReview}>Name</Text>
                <TextInput
                  style={styles.inputReview}
                  value={formData.name}
                  onChangeText={(value) => handleChange('name', value)}
                />
              </View>

              {/* Date of Birth */}
              <View style={styles.inputGroup}>
                <Text style={styles.labelReview}>Date of Birth</Text>
                <TextInput
                  style={styles.inputReview}
                  value={formData.dob}
                  onChangeText={(value) => handleChange('dob', value)}
                />
              </View>

              {/* Mobile Number */}
              <View style={styles.inputGroup}>
                <Text style={styles.labelReview}>Mobile Number</Text>
                <TextInput
                  style={styles.inputReview}
                  keyboardType="phone-pad"
                  value={formData.mobile_number}
                  onChangeText={(value) => handleChange('mobile_number', value)}
                />
              </View>

              {/* Mail ID */}
              <View style={styles.inputGroup}>
                <Text style={styles.labelReview}>Mail ID</Text>
                <TextInput
                  style={styles.inputReview}
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={(value) => handleChange('email', value)}
                />
              </View>

              {/* Institution Name */}
              {formData?.user_type === 'Institute' && (
                <View style={styles.inputGroup}>
                  <Text style={styles.labelReview}>Institution Name</Text>
                  <TextInput
                    style={styles.inputReview}
                    value={formData.institution_name}
                    onChangeText={(value) => handleChange('institution_name', value)}
                  />
                </View>
              )}

              {/* Company Name */}
              {formData?.user_type !== 'Institute' && <View style={styles.inputGroup}>
                <Text style={styles.labelReview}>Company Name</Text>
                <TextInput
                  style={styles.inputReview}
                  value={formData.company_name}
                  onChangeText={(value) => handleChange('company_name', value)}
                />
              </View>}

              {/* Terms & Conditions */}
              <View style={styles.termsContainer}>
                <Checkbox
                  value={formData.agreedToTerms}
                  onValueChange={(value) => handleChange('agreedToTerms', value)}
                />
                <Text style={styles.termsText}>
                  I agree to{' '}
                  <Text style={styles.termsLink} onPress={() => alert('Show Terms')}>
                    Terms and Conditions
                  </Text>
                </Text>
              </View>

              {/* Create Account Button */}
              <TouchableOpacity
                style={styles.createAccountButton}
                onPress={handleSubmit}
              >
                <Text style={styles.createAccountButtonText}>Create an Account</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/index.jpg')}
      style={styles.container}
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

      {step >= 2 && step <= 7 && ( // Only render the icon in case 1
        <View>
          <View style={styles.rowOne}>
            <Text style={styles.textOne}>Sign up</Text>
          </View>
          <Text style={styles.descriptionOne}>Register with a few details</Text>
        </View>
      )}

      {step === 8 && ( // Only render the icon in case 1
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

    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    // justifyContent: 'center',
    // backgroundColor: '#F5F5F5',
  },
  stepContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 30,
    marginTop: '40%',
    flex: 1,
    display: "flex",
  },
  navigation: {
    top: '60%',
    // bottom:'20%',
    flexDirection: 'row',
    padding: 30,
    justifyContent: 'space-between',
  },
  navigationDob: {
    top: '50%',
    // bottom:'20%',
    flexDirection: 'row',
    padding: 30,
    justifyContent: 'space-between',
  },
  navigationCom: {
    top: '40%',
    // bottom:'20%',
    flexDirection: 'row',
    padding: 30,
    justifyContent: 'space-between',
  },
  navigationPass: {
    top: '30%',
    // bottom:'20%',
    flexDirection: 'row',
    padding: 30,
    justifyContent: 'space-between',
  },
  navButton: {
    padding: 10,
    backgroundColor: '#622CFD',
    borderRadius: 40,
    height: 50,
    width: 50,
  },
  back: {
    fontFamily: 'Lato',
    color: '#1E1E1E',
    marginTop: '30%',
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 25.5,
  },
  stepOneLabel: {
    fontSize: 32,
    fontFamily: 'Lato',
    fontWeight: '700',
    lineHeight: 38.4,
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 30,
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
    alignSelf: 'center',
    width: '90%',
  },
  selectedUserTypeButton: {
    backgroundColor: '#FFFFFF',
  },
  userTypeButtonText: {
    color: '#1E1E1E',
    fontSize: 24,
    fontFamily: 'Lato',
    fontWeight: '600',
    lineHeight: 28.8,
  },
  selectedUserTypeButtonText: {
    color: '#1E1E1E',
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
    lineHeight: 30,
    marginTop: 5,
    fontFamily: 'Lato',
  },
  rowOne: {
    alignItems: 'flex-start',
    marginTop: '10%',
    paddingHorizontal: '5%',
  },
  textOne: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '600',
    fontFamily: 'Lato',
  },
  descriptionOne: {
    color: '#FFFFFF',
    fontWeight: '300',
    fontSize: 20,
    marginLeft: '5%',
    lineHeight: 30,
    marginTop: 5,
    fontFamily: 'Lato',
  },
  label: {
    fontSize: 32,
    fontFamily: 'Lato',
    fontWeight: '700',
    lineHeight: 38.4,
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: '10%',
  },
  input: {
    borderWidth: 2,
    borderColor: '#9C9C9C',
    color: '#9C9C9C',
    borderRadius: 10,
    fontFamily: 'Lato',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 28.8,
    padding: 10,
    marginBottom: 20,
  },
  errorInput: {
    borderColor: 'red',
  },
  button: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
  },
  errorText: {
    color: 'red',
    textAlign: 'right',
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'Lato',
  },
  stepTwoContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 30,
    flex: 1,
    display: "flex",
  },
  contentOne: {
    flex: 1,
    // padding: 20,
  },
  scrollContentOne: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    // padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
    //  justifyContent: 'center', 
  },
  inputGroup: {
    // flex:1,
    marginBottom: 20,
  },
  labelReview: {
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '300',
    lineHeight: 18.4,
    color: '#1E1E1E',
  },
  inputReview: {
    borderWidth: 1,
    borderColor: '#9C9C9C',
    color: '#1E1E1E',
    borderRadius: 10,
    fontFamily: 'Lato',
    fontSize: 20,
    fontWeight: '300',
    lineHeight: 20.8,
    padding: 7,
  },
  accountTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  accountTypeText: {
    fontSize: 14,
    color: '#333',
  },
  changeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#6A0DAD',
    borderRadius: 5,
  },
  changeButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  termsText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  termsLink: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  createAccountButton: {
    backgroundColor: '#622CFD',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  createAccountButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MultiStepForm;
