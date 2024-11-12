import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Using expo for icons
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const Job = () => {
  const [fontsLoaded] = useFonts({
    'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FEATURES</Text>

      {/* First Row of Icons */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="chair" size={28} color="#622CFD" />
          <Text style={styles.buttonText}>Job{"\n"}Vacancies</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="balance-scale" size={28} color="#622CFD" />
          <Text style={styles.buttonText}>Women{"\n"}Empower</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="whatsapp" size={28} color="#622CFD" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </TouchableOpacity>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex:1
  },
  header: {
    fontFamily: 'Lato',
    fontSize: 18,
    marginBottom: 20,
    color: '#1E1E1E',
    fontWeight: '600',
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 98,
    height: 110,
  },
  buttonText: {
    fontFamily: 'Lato',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'left',
    fontWeight: '600',
    lineHeight: 16,
    color: "#1E1E1E",
  },
});

export default Job;
