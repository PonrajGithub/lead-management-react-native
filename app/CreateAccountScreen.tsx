import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from 'expo-router';
import InstituteScreen from './InstituteScreen';
import CorporateScreen from './CorporateScreen';
import OtherScreen from './OtherScreen';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const CreateAccountScreen = () => {
  const [accountType, setAccountType] = useState(null);
  const [open, setOpen] = useState(false); // For controlling dropdown state
  const [items, setItems] = useState([
    { label: 'Institute', value: 'Institute' },
    { label: 'Corporate', value: 'Corporate' },
    { label: 'Others', value: 'Others' },
  ]);

  const navigation: any = useNavigation();

  const [fontsLoaded] = useFonts({
    'text': require('../assets/fonts/static/Rubik-Regular.ttf'),
    'heading': require('../assets/fonts/static/Rubik-Bold.ttf'), 
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setAccountType(null);
    });
    return unsubscribe;
 }, [navigation]);

  return (
      <View style={styles.container}>
         <StatusBar backgroundColor="#6A1B9B" barStyle="light-content" />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.content}>Open an account with a few details</Text>
        {/* <Text style={styles.text}>Select User Type</Text> */}
        <DropDownPicker
          open={open}
          value={accountType}
          items={items}
          setOpen={setOpen}
          setValue={setAccountType}
          setItems={setItems}
          placeholder="Select account type"
          style={styles.picker}
          dropDownContainerStyle={styles.dropdownContainer}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Conditionally render screens only if an account type is selected */}
        {accountType === '' ? null : accountType === 'Institute' ? (
          <InstituteScreen />
        ) : accountType === 'Corporate' ? (
          <CorporateScreen />
        ) : accountType === 'Others' ? (
          <OtherScreen />
        ) : null}
        </ScrollView>
      </View>
    
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
    letterSpacing: 2,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'center',
    color: '#0061F0',
    fontFamily:'heading'
  },
  content: {
    fontSize: 15,
    marginTop: 20,
    fontFamily:'text'
  },
  picker: {
    backgroundColor: '#fff',
    height: 50,
    marginTop: 30,
    // fontFamily:'text',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 13,
  },
});

export default CreateAccountScreen;
