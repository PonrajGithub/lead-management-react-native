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
import { Dropdown } from 'react-native-element-dropdown';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = () => {
  const navigation: any = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    adhaarCard: '',
    bankName: '',
    bankAddress: '',
    ifscCode: '',
    accountNumber: '',
    reference: '',
    address: '',
  });

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [references] = useState([
    { label: 'Youtube', value: 'youtube' },
    { label: 'Facebook', value: 'facebook' },
    { label: 'Google', value: 'google' },
    { label: 'SMS', value: 'sms' },
    { label: 'Friend', value: 'friend' },
    { label: 'Other', value: 'Other' },
  ]);

  
  const [errors, setErrors] = useState({
      name: false,
      contactNumber: false,
      adhaarCard: false,
      bankName: false,
      bankAddress: false,
      ifscCode: false,
      accountNumber: false,
      reference: false,
      address: false,
    });

  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  const handleInputChange = (field : any , value : any)  => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: false });
  };

  const handleSubmit = () => {
    const { name, contactNumber, adhaarCard, bankName, bankAddress, ifscCode, accountNumber, reference, address } = formData;

    let newErrors = {
      name: !name,
      contactNumber: !contactNumber,
      adhaarCard: !adhaarCard,
      bankName: !bankName,
      bankAddress: !bankAddress,
      ifscCode: !ifscCode,
      accountNumber: !accountNumber,
      reference: !reference,
      address: !address,
    };

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      ToastAndroid.show('Please fill out all required fields.', ToastAndroid.SHORT);
      return;
    }
    if (Object.keys(newErrors).some((error) => error)) {
          ToastAndroid.show('Please fill out all required fields.', ToastAndroid.SHORT);
          return;
        }

    ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);
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
          <Text style={styles.title}>Profile</Text>                            
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
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, errors.address && styles.errorInput]}
            placeholder="Enter address"
            value={formData.address}
            onChangeText={(value) => handleInputChange('address', value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Adhaar Card Number</Text>
          <TextInput
            style={[styles.input, errors.adhaarCard && styles.errorInput]}
            placeholder="Enter Adhaar card number"
            keyboardType="numeric"
            value={formData.adhaarCard}
            onChangeText={(value) => handleInputChange('adhaarCard', value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bank Name</Text>
          <TextInput
            style={[styles.input, errors.bankName && styles.errorInput]}
            placeholder="Enter bank name"
            value={formData.bankName}
            onChangeText={(value) => handleInputChange('bankName', value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bank Address with Area Pincode</Text>
          <TextInput
            style={[styles.input, errors.bankAddress && styles.errorInput]}
            placeholder="Enter bank address"
            value={formData.bankAddress}
            onChangeText={(value) => handleInputChange('bankAddress', value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>IFSC Code</Text>
          <TextInput
            style={[styles.input, errors.ifscCode && styles.errorInput]}
            placeholder="Enter IFSC code"
            value={formData.ifscCode}
            onChangeText={(value) => handleInputChange('ifscCode', value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Account Number</Text>
          <TextInput
            style={[styles.input, errors.accountNumber && styles.errorInput]}
            placeholder="Enter account number"
            keyboardType="numeric"
            value={formData.accountNumber}
            onChangeText={(value) => handleInputChange('accountNumber', value)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Reference</Text>
          <Dropdown
            value={formData.reference}
            data={references}
            labelField="label"
            valueField="value"
            onChange={(item) => handleInputChange('reference', item.value)}
            placeholder="Select Reference"
            style={[
              styles.dropdown,
              errors.reference && styles.errorInput,
            ]}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Update</Text>
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
    flexGrow: 1, // Ensures the ScrollView takes full height and scrolls when necessary
  },
  StepContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 30,
    marginTop: '5%',
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
  dropdown: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 10,
    padding:10,
    fontSize: 16,
    fontFamily: 'Lato',
    backgroundColor: '#F9F9F9',
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

export default Profile;
