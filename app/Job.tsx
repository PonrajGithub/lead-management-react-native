import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Assuming you're using expo for icons, or you can use react-native-vector-icons
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const Job = () => {

  const [fontsLoaded] = useFonts({
    'text': require('../assets/fonts/static/Rubik-Regular.ttf'),
    'heading': require('../assets/fonts/static/Rubik-Bold.ttf'), 
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <FontAwesome5 name="chart-bar" size={24} color="white" />
        <Text style={styles.buttonText}>Job Vacancies</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <FontAwesome5 name="user" size={24} color="white" />
        <Text style={styles.buttonText}>Women Empowerment</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <FontAwesome5 name="whatsapp" size={24} color="white" />
        <Text style={styles.buttonText}>Whatsapp</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    // paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#6CB4EE',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
    fontFamily:'heading'
  },
});

export default Job;
