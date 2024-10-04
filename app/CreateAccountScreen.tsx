import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from 'expo-router';
import InstituteScreen  from './InstituteScreen';
import CorporateScreen from './CorporateScreen';
import OtherScreen from './OtherScreen';

const CreateAccountScreen = () => {
  const [accountType, setAccountType] = useState('');

  const [accountTypeError, setAccountTypeError] = useState('');
 

  const navigation: any = useNavigation();

  const handelAccountType = (itemValue: any ) => {
    setAccountType(itemValue);
  };


  const handleCreateAccount = () => {

    let valid = true;
    // Account type validation
    if (accountType === '') {
      setAccountTypeError('Please select account type.');
      valid = false;
    } else {
      setAccountTypeError('');
    }

  }
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <StatusBar backgroundColor="#6C2EB9" barStyle="light-content" />
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.content}>open a account with a few details</Text>

      <Picker
        selectedValue={accountType}
        style={styles.picker}
        onValueChange={(itemValue) => handelAccountType(itemValue)}
      >
        <Picker.Item label="Others" value="" />
        <Picker.Item label="Institute" value="Institute" />
        <Picker.Item label="Corporate" value="Corporate" />
        <Picker.Item label="Others" value="Others" />
      </Picker>
      {accountTypeError ? <Text style={styles.errorText}>{accountTypeError}</Text> : null}
      {accountType == "Institute" ? <InstituteScreen /> : accountType == 'Corporate' ? <CorporateScreen /> : <OtherScreen /> }      
      
    </View>
    </ScrollView>
  );
};

// styles...

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'center',
    color : '#0061F0',
  },
  content: {
    fontSize : 15,
    fontWeight : 'medium',
    marginTop:30,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    height: 50,
    width: '100%',
    borderRadius: 8,
    marginTop:30,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 13,
  }
});

export default CreateAccountScreen;
