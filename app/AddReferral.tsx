import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  ImageBackground,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'; // Install this package using `npm install react-native-dropdown-picker`
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddReferral = () => {
  const navigation: any = useNavigation();

  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    location: '',
    loanType: '',
    loanAmount: '',
    note: '',
  });

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [loanTypes] = useState([
    { label: 'Home Loan', value: 'Home Loan' },
    { label: 'Car Loan', value: 'Car Loan' },
    { label: 'Personal Loan', value: 'Personal Loan' },
    { label: 'Education Loan', value: 'Education Loan' },
  ]);

  const [errors, setErrors] = useState({
    name: false,
    contactNumber: false,
    email: false,
    location: false,
    loanType: false,
    loanAmount: false,
  });

  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: false });
  };

  const handleSubmit = () => {
    const { name, contactNumber, email, location, loanType, loanAmount } = formData;

    let newErrors = {
      name: !name,
      contactNumber: !contactNumber,
      email: !email,
      location: !location,
      loanType: !loanType,
      loanAmount: !loanAmount,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      ToastAndroid.show('Please fill out all required fields.', ToastAndroid.SHORT);
      return;
    }

    ToastAndroid.show('Referral Partner Added successfully!', ToastAndroid.SHORT);
    navigation.goBack();
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
     <ImageBackground
                  source={require('../assets/images/index.jpg')}
                  style={styles.container}
                  resizeMode="cover">
           <View style={styles.row}>
                                  <TouchableOpacity
                                    onPress={() => navigation.navigate('ReferralPartner')} >
                                    <Icon name="chevron-left" size={40} color="#FFF" />
                                  </TouchableOpacity>
                                  <Text style={styles.title}> Add Referral</Text>
                      </View>  
    <ScrollView contentContainerStyle={styles.StepContainer}>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={[styles.input, errors.name && styles.errorInput]}
          placeholder="Enter name"
          value={formData.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={[styles.input, errors.contactNumber && styles.errorInput]}
          placeholder="Enter contact number"
          keyboardType="phone-pad"
          value={formData.contactNumber}
          onChangeText={(value) => handleInputChange('contactNumber', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, errors.email && styles.errorInput]}
          placeholder="Enter email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={[styles.input, errors.location && styles.errorInput]}
          placeholder="Enter location"
          value={formData.location}
          onChangeText={(value) => handleInputChange('location', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Loan Type</Text>
        <DropDownPicker
          open={dropDownOpen}
          value={formData.loanType}
          items={loanTypes}
          setOpen={setDropDownOpen}
          setValue={(value : any) => handleInputChange('loanType', value())}
          placeholder="Select Loan Type"
          style={[
            styles.dropdown,
            errors.loanType && styles.errorInput,
          ]}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Loan Amount</Text>
        <TextInput
          style={[styles.input, errors.loanAmount && styles.errorInput]}
          placeholder="Enter loan amount"
          keyboardType="numeric"
          value={formData.loanAmount}
          onChangeText={(value) => handleInputChange('loanAmount', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Note</Text>
        <TextInput
          style={[styles.input, styles.noteInput]}
          placeholder="Enter note (optional)"
          multiline
          value={formData.note}
          onChangeText={(value) => handleInputChange('note', value)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1, 
  },
  StepContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 30,
        marginTop:'5%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    marginLeft:'3%',
  },
  title: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: '700',
    fontFamily: 'Lato',
    marginLeft:'15%'
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4A4A4A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    fontFamily: 'Lato',
    backgroundColor: '#F9F9F9',
  },
  noteInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  dropdown: {
    borderColor: '#CCC',
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
  },
  dropdownContainer: {
    borderColor: '#CCC',
  },
  errorInput: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: '#622CFD',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Lato',
  },
});

export default AddReferral;
