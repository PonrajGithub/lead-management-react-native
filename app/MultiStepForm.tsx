import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ToastAndroid,
  ScrollView,
  Button,
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
    otp:'',
    email: '',
    institution_name: '',
    occupation: '',
    student_name: '',
    roll_number: '',
    course_class: '',
    company_name: '',
    designation: '',
    password: '',
    agreedToTerms: 'false',
  });

  const [modalVisible, setModalVisible] = useState(false);


  const [fontsLoaded] = useFonts({
    'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  const navigation: any = useNavigation();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const [otpVerified, setOtpVerified] = useState(false);
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
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Valid email is required.';
        }
        break;
      case 4:
        if (!formData.mobile_number.trim() || !/^\d{10}$/.test(formData.mobile_number)) {
          newErrors.mobile_number = 'Valid mobile number is required.';
        }
        if (!formData.otp.trim()) newErrors.otp = 'otp is required.';

        break;
      case 5: // Validate institution and occupation
         if (!formData.institution_name.trim()) newErrors.institution_name = 'Institution name is required.';
        if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required.';
        if (!formData.student_name.trim()) newErrors.student_name = 'Student name is required.';
        if (!formData.roll_number.trim()) newErrors.roll_number = 'roll number is required.';
        if (!formData.course_class.trim()) newErrors.course_class = 'course class is required.';
        break;
      case 6: // Validate company and designation
        if (!formData.company_name.trim()) newErrors.company_name = 'company name is required.';
        if (!formData.designation.trim()) newErrors.designation = 'designation is required.';
        break;
      case 7: // Validate password
        if (!formData.password.trim()) newErrors.password = 'Password is required.';
        break;
      case 8: // Validate terms and conditions
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        if (!formData.dob) newErrors.dob = 'Date of birth is required.';
        if (!formData.mobile_number.trim() || !/^\d{10}$/.test(formData.mobile_number)) {
          newErrors.mobile_number = 'Valid mobile number is required.';
        }
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Valid email is required.';
        }
        if ( formData?.user_type == 'Institute') {
          if (!formData.institution_name.trim()) newErrors.institution_name = 'Institution name is required.';
          if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required.'; 
          if (!formData.student_name.trim()) newErrors.student_name = 'Student name is required.';
          if (!formData.roll_number.trim()) newErrors.roll_number = 'roll number is required.';
          if (!formData.course_class.trim()) newErrors.course_class = 'course class is required.'; 
        }
        else {
          if ( formData?.user_type !== 'Institute') {
            if (!formData.company_name.trim()) newErrors.company_name = 'company name is required.';
            if (!formData.designation.trim()) newErrors.designation = 'designation is required.';
          }}
        if (!formData.agreedToTerms) {
          newErrors.agreedToTerms = 'You must agree to the Terms and Conditions.';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit function
  const handleSubmit = async () => {

    if (!validateStep()) {
      ToastAndroid.show('You must agree to the Terms and Conditions.', ToastAndroid.LONG);
      return;
    }

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
        await AsyncStorage.setItem('@storage_user_data', JSON.stringify(response.data));
        // Show success message
        ToastAndroid.show('Registration successful!', ToastAndroid.SHORT);


        // Navigate to the Congrats screen
        navigation.reset({ index: 0, routes: [{ name: 'CongratsScreen' }] });
      } else {
        throw new Error(response.data.message || 'Unknown error occurred.');
      }
    } catch (error: any) {
      // Show error message
      ToastAndroid.show('Server error please try again later', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };


  const handleNext = async () => {
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
        if (step == 4){
          setOtpVerified(false)
        }
      }
    }
  };
  const handleDateChange = (event: any, selectedDate: any) => {
    setShowPicker(false);
    if (selectedDate) {
      const today = new Date();
      const age = today.getFullYear() - selectedDate.getFullYear();
      const monthDiff = today.getMonth() - selectedDate.getMonth();
      const dayDiff = today.getDate() - selectedDate.getDate();

      // Adjust age calculation based on the month and day differences
      const is18OrOlder = age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));

      if (!is18OrOlder) {
        ToastAndroid.show('You must be 18 years or older!',ToastAndroid.SHORT);
        return;
      }

      const formattedDate = selectedDate.toLocaleDateString('en-GB'); // Format: dd/mm/yyyy
      handleChange('dob', formattedDate);
    }
  };

  
  const handleBack = async () => {
    if (step == 7 && formData?.user_type == 'Institute') {
      setStep(5)
    } else {
      if (step == 6 && formData?.user_type !== 'Institute') {
        setStep(4);
      } else {
        setStep((prev) => (prev > 1 ? prev - 1 : prev));
      }
      if (step == 4){
        setOtpVerified(false)
      }
    }
  };

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };


  const sendOtp = async () => {
    const { mobile_number } = formData;
  
    if (!mobile_number) {
      // Handle the case where mobile number is not entered
      ToastAndroid.show('Please enter your mobile number', ToastAndroid.SHORT);
      return;
    }
  
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append('phone', mobile_number);
  
      const response = await axios.post(
        'https://loanguru.in/loan_guru_app/api/smsotp', // The API endpoint for sending OTP via phone
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      // console.log(response?.data?.data?.code); // If OTP code is in the response
  
      if (response.data.success) {
        const receivedOtp = response?.data?.data?.code; // Assuming the OTP is returned here
        // setReceivedOtp(receivedOtp);
        ToastAndroid.show('OTP sent', ToastAndroid.SHORT);
         // Proceed to OTP verification screen or next step
      } else {
        ToastAndroid.show(response.data.message || 'Failed to send OTP', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show('An error occurred. Try again.', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };
  
  // const [showNavigationButtons, setShowNavigationButtons] = useState(false);

  const verifyOtp = async () => {
    const { mobile_number, otp } = formData;
  
    if (!otp || !mobile_number) {
      ToastAndroid.show('Please enter both OTP and mobile number', ToastAndroid.SHORT);
      return;
    }
  
    const data = new FormData();
    data.append('phone', mobile_number);
    data.append('otp', otp);
  
    const config = {
      method: 'post',
      url: 'https://loanguru.in/loan_guru_app/api/verifyotp',
      headers: {
        'Content-Type': 'multipart/form-data', // Correct content type
      },
      data: data, // Send FormData directly
    };
  
    try {
      const response = await axios(config);
      console.log(response.data, "RES ")
      // Check if response data exists and contains a success property
      if (response?.data?.status == "success") {
        ToastAndroid.show('OTP verified successfully', ToastAndroid.SHORT);
         // Set OTP verified to true
         console.log('OTP verified successfully, setting otpVerified to true');
         setOtpVerified(true);
        } else {
        ToastAndroid.show(response.data?.message || 'OTP verification failed', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      ToastAndroid.show('Invalid OTP', ToastAndroid.SHORT);
    }
  };
  
  
  
  useEffect(() => {
    if (step == 1) {
      setFormData({
        user_type: '',
        name: '',
        dob: '',
        mobile_number: '',
        otp:'',
        email: '',
        institution_name: '',
        occupation: '',
        student_name: '',
        roll_number: '',
        course_class: '',
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
                style={[styles.input, errors.name ? styles.errorInput  : null]}
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
                  style={[styles.input, errors.dob ? styles.errorInput : null]}
                  placeholder="dd/mm/yyyy"
                  value={formData.dob}
                  editable={false} // Disable direct editing
                />
              </TouchableOpacity>
              <TextInput
                style={[styles.input, errors.email ? styles.errorInput : null]}
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
              />
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
              style={[styles.input, errors.mobile_number ? styles.errorInput : null]}
              placeholder="Mobile number"
              keyboardType="phone-pad"
              value={formData.mobile_number}
              onChangeText={(text) => handleChange('mobile_number', text)}
            />
            <TouchableOpacity style={styles.otpButton} onPress={sendOtp}>
              <Text style={styles.otp}>SendOtp</Text>
            </TouchableOpacity>
            <TextInput
              style={[styles.inputOtp, errors.otp ? styles.errorInput : null]}
              keyboardType="phone-pad"
              placeholder="Otp"
              value={formData.otp}
              onChangeText={(text) => handleChange('otp', text)}
            />
            <TouchableOpacity style={styles.verifyButton} onPress={verifyOtp}>
              <Text style={styles.otp}>VerifyOtp</Text>
            </TouchableOpacity>
            
            {/* Conditionally render the Next button */}
            {otpVerified && (
              <View style={styles.navigationInstitution}>
                <TouchableOpacity onPress={handleBack}>
                  <Text style={styles.back}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleNext}>
                  <Icon name="chevron-right" size={30} color="#F5F5F5" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
        );
      case 5:
          return (
            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
              <View style={styles.InstituteContainer}>
                <Text style={styles.label}>Institute details</Text>
                <TextInput
                  style={[styles.input, errors.institution_name ? styles.errorInput : null]}
                  placeholder="Institution name"
                  value={formData.institution_name}
                  onChangeText={(text) => handleChange('institution_name', text)}
                />
                <TextInput
                  style={[styles.input, errors.occupation ? styles.errorInput : null]}
                  placeholder="Occupation"
                  value={formData.occupation}
                  onChangeText={(text) => handleChange('occupation', text)}
                />
                  <TextInput
                    style={[styles.input, errors.student_name ? styles.errorInput : null]}
                    placeholder="Student Name"
                    value={formData.student_name}
                    onChangeText={(text) => handleChange('student_name', text)}
                  />
                  <TextInput
                    style={[styles.input, errors.roll_number ? styles.errorInput : null]}
                    placeholder="Roll Number"
                    keyboardType="phone-pad"
                    value={formData.roll_number}
                    onChangeText={(text) => handleChange('roll_number', text)}
                  />
                   <TextInput
                    style={[styles.input, errors.course_class ? styles.errorInput : null]}
                    placeholder="Course / Class"
                    value={formData.course_class}
                    onChangeText={(text) => handleChange('course_class', text)}
                  />
                <View style={styles.navigationInstitution}>
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
                style={[styles.input, errors.company_name ? styles.errorInput : null]}
                placeholder="Company Name"
                value={formData.company_name}
                onChangeText={(text) => handleChange('company_name', text)}
              />
              <TextInput
                style={[styles.input, errors.designation ? styles.errorInput : null]}
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
                style={[styles.input, errors.password ? styles.errorInput : null]}
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
                </View>
              </View>

              {/* Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.labelReview}>Name</Text>
                <TextInput
                  style={[styles.inputReview, errors.name ? styles.errorInput : null]}
                  value={formData.name}
                  onChangeText={(value) => handleChange('name', value)}
                />
              </View>

              {/* Date of Birth */}
              <View style={styles.inputGroup}>
                <Text style={styles.labelReview}>Date of Birth</Text>
                <TextInput
                  style={[styles.inputReview, errors.dob ? styles.errorInput : null]}
                  value={formData.dob}
                  onChangeText={(value) => handleChange('dob', value)}
                />
              </View>

              {/* Mobile Number */}
              <View style={styles.inputGroup}>
                <Text style={styles.labelReview}>Mobile Number</Text>
                <TextInput
                  style={[styles.inputReview, errors.mobile_number ? styles.errorInput : null]}
                  keyboardType="phone-pad"
                  value={formData.mobile_number}
                  onChangeText={(value) => handleChange('mobile_number', value)}
                />
              </View>

              {/* Mail ID */}
              <View style={styles.inputGroup}>
                <Text style={styles.labelReview}>Mail ID</Text>
                <TextInput
                  style={[styles.inputReview, errors.email ? styles.errorInput : null]}
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={(value) => handleChange('email', value)}
                />
              </View>

              {/* Institution Name */}
              {formData?.user_type === 'Institute' && (
                <View>
                <View style={styles.inputGroup}>
                  <Text style={styles.labelReview}>Institution Name</Text>
                  <TextInput
                    style={[styles.inputReview, errors.institution_name ? styles.errorInput : null]}
                    value={formData.institution_name}
                    onChangeText={(value) => handleChange('institution_name', value)}
                  />
                </View>
                
                <View style={styles.inputGroup}>
                <Text style={styles.labelReview}>Occupation</Text>
                <TextInput
                  style={[styles.inputReview, errors.occupation ? styles.errorInput : null]}
                  value={formData.occupation}
                  onChangeText={(value) => handleChange('occupation', value)}
                />
              </View>
              </View>
              )}
              

              {/* Company Name */}
              {formData?.user_type !== 'Institute' && 
              <View>
              <View style={styles.inputGroup}>
                <Text style={styles.labelReview}>Company Name</Text>
                <TextInput
                  style={[styles.inputReview, errors.company_name ? styles.errorInput : null]}
                  value={formData.company_name}
                  onChangeText={(value) => handleChange('company_name', value)}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.labelReview}>Designation</Text>
                <TextInput
                  style={[
                    styles.inputReview,
                    errors.designation ? styles.errorInput   : null,  // Apply error style conditionally
                  ]}                  
                  value={formData.designation}
                  onChangeText={(value) => handleChange('designation', value)}
                />
              </View>
              </View>
              }

              {/* Terms & Conditions */}
              <View style={styles.termsContainer}>
        <Checkbox
          value={formData.agreedToTerms}
          onValueChange={(value) => handleChange('agreedToTerms', value)}
        />
        <Text style={styles.termsText}>
          I agree to{' '}
          <Text style={styles.termsLink} onPress={() => setModalVisible(true)}>
            Terms and Conditions
          </Text>
        </Text>
      </View>

      {/* Modal for Terms and Conditions */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back press
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Terms and Conditions</Text>
            <ScrollView>
            <Text style={styles.modalText}>
            Please read on to learn the rules and restrictions that govern your use of our Application/Services. These Terms and Conditions (the “Terms” or the “Agreement”) are a binding contract between you and Loan Guru . If you have any questions, comments, or concerns regarding these terms or the Services, please contact us at support@LoanGuru.in
You must agree to and accept all the Terms, or you don’t have the right to use the Services. Your using the Services in any way means that you agree to all of these Terms, and these Terms will remain in effect while you use the Services. These Terms include the provisions mentioned below, as well as those in the Privacy Policy.
•	You are aware and you accept that all information, content, materials, products on the application is protected and secured.
•	You understand and accept that you are allowed to track your financial life through the use of Application. You agree that you will be allowed to make any transaction through the Application when you complete the KYC process and provide the complete information including personal information in accordance with the Know your client (“KYC”) guidelines issued by Securities and Exchange Board of India or any other regulator/government authorities/agencies/AMCs from time to time.
•	You acknowledge that you will be responsible for maintaining the confidentiality of your account information and are fully responsible for all activities that occur under Your account and also agree to keep your login credentials safe and confidential at all times. You further agree to promptly inform Us immediately in case of any actual or suspected unauthorized use of Your Account. We cannot and will not be liable for any loss or damage arising from Your failure to comply with this provision.
•	You acknowledge that the software and hardware underlying the application as well as other Internet related software which are required for accessing the application are the legal property of either Loan Guru or its respective third-party vendors. The permission given by Loan Guru to access the application will not convey any proprietary or ownership rights in the above software/hardware.
•	You understand and accept that not all the products and services offered on or through the Application are available in all geographic areas and you may not be eligible for all the products or services offered by Loan Guru or third party providers on the Application. Loan Guru and such third party providers reserves the right to determine the availability and eligibility for any product or service offered on the application.
•	You understand and accept that Loan Guru is not responsible for the availability of content or other services on third party sites linked from the application. You are aware that access of hyperlinks to other internet sites are at your own risk and the content, accuracy, opinions expressed, and other links provided by these sites are not verified, monitored or endorsed by Loan Guru in any way. Loan Guru  does not make any warranties and expressly disclaims all warranties express or implied, including without limitation, those of merchantability and fitness for a particular purpose, title or non-infringement with respect to any information or services or products that are available or advertised or sold through these third-party platforms.
•	You agree that transactions made through Loan Guru  Application shall be through your own bank account only and the said transactions do not contravene any Act, Rules, Regulations, Notifications of Income tax Act, Anti money laundering laws, Anti-corruption laws or any other applicable laws.
•	You agree to provide your explicit consent to fetch your credit data from CRIF High Mark/Experian or any other credit Bureaus on a month to month basis.
•	You agree that you will not use the application for any purpose that is unlawful or prohibited by these Terms. You also agree you will not use the application in any manner that could damage, disable or impair the application or interfere with any other party’s use, legal rights, or enjoyment of the application. You hereby represent and warrant that you shall make use of the Application as a prudent, reasonable and law abiding citizen and you shall comply with relevant necessary laws.
•	Loan Guru reserves the right in its sole discretion to delete, block, restrict, disable, suspends your account or part thereof. If the User is found engaging in any fraudulent/illegal activities including but not limited to the following activities i.e abusing any of the representatives of the organization, indulge in fraudulent activities on the Application, using mass media and/or bots to engage with the platform, using mass media and/or bots to malign the organization’s reputation these activities may be referred to appropriate legal authority for a legal recourse.
•	Additionally, by continuing using the Application or Services of Loan Guru  you are confirming that:
•	(a) You are 18 years of age or older and where you are acting as Guardian on behalf of a minor, you have the necessary authority to register/sign up for the Services on behalf of the minor. If Loan Guru learns that we have collected personal information from a person under age 18, we will delete that information as quickly as possible. If you believe that a person under 18 may have provided us with personal information, please contact us at support@LoanGuru.in 
•	(b) You have read and understood the Privacy Policy published on the website and mobile applications of Loan Guru. The information you provide when you register on the Application is true and correct. In the event, your information is not accessible online and you wish to change or delete your personal information or other information that you may have provided, please contact us immediately at support@LoanGuru.in.
•	(c) You shall notify Loan Guru of any material change in your personal information and/or profile. Loan Guru would rely on the most recent information provided by you.
•	(d) You agree to be contacted by Loan Guru and its employees and partners over phone and/or E-mail and/or SMS or any other form of electronic communication in connection with your registration, advisory and transactions. This consent overrides any registration for DNC/NDNC. You agree and confirm that if your mobile number is registered in the Do Not Disturb (DND) list of TRAI, you may not receive SMS from Loan Guru. You agree to take steps to deregister from the DND list and shall not hold Loan Guru liable for non-receipt of SMS. You can always opt to stop receiving any or all such communications by writing to support@LoanGuru.in You can also delete your account at any point of time by writing to support@LoanGuru.in or by visiting the Delete Account section on the Application

            </Text>
            </ScrollView>
            <Button title="Close" onPress={() => setModalVisible(false)} color="#4CAF50" />
          </View>
        </View>
      </Modal>

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
  InstituteContainer:{
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 30,
    marginTop: '10%',
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
    top: '40%',
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
  otp:{
   fontFamily:'Lato',
   fontSize:16,
   color: '#ffffff',
   fontWeight:'600',
   textAlign: 'center'
  },
  verifyButton:{
    padding: 10,
    backgroundColor: '#622CFD',
    borderRadius: 50,
    height: 40,
    width: 100,
    position: 'relative',
    left: 120
  },
  otpButton:{
    padding: 10,
    backgroundColor: '#622CFD',
    borderRadius: 50,
    height: 40,
    width: 100,
    position: 'relative',
    left: 120
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
  navigationInstitution:{
    top: '20%',
    // bottom:'20%',
    flexDirection: 'row',
    padding: 30,
    justifyContent: 'space-between',
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
  inputOtp: {
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
    marginTop:20,
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
    fontSize: 18,
    fontFamily: 'Lato',
    color: '#333',
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
    color: '#0000FF',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    height:'60%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily:'Lato',
  },
  modalText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
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