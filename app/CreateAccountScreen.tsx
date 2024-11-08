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
         <StatusBar backgroundColor="#1e3a8a" barStyle="light-content" />
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
    // backgroundColor: '#f2f6ff', 
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28, // Slightly larger title
    marginBottom: 20,
    marginTop: '20%',
    textAlign: 'center',
    color: '#1e3a8a', // Darker blue for contrast
    fontFamily: 'heading',
  },
  content: {
    fontSize: 16,
    marginBottom: '5%',
    textAlign: 'center',
    color: '#64748b', // Lighter gray-blue for subheading
    fontFamily: 'text',
  },
  picker: {
    width:'89%',
    borderWidth: 1,
    borderColor: '#4B5563', // Updated to a dark gray border
    padding: 12,
    borderRadius: 10, // More rounded for a modern look
    backgroundColor: '#E5E7EB', // Light gray background
    fontFamily: 'text',
    shadowColor: '#000', // Soft shadow
    shadowOffset: { width: 0, height: 2 }, // Slightly increased shadow offset
    shadowOpacity: 0.15, // Reduced opacity for a subtle effect
    shadowRadius: 4, // Increased radius for a softer shadow
    elevation: 4, // Android shadow
    marginLeft: 20,
  },
  dropdownContainer: {
    backgroundColor: '#E5E7EB',
    borderColor: '#4B5563', 
    borderRadius: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    width:'89%',
    marginLeft:20,
    marginTop:5,
  },
});

export default CreateAccountScreen;
