import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const Footer = () => {
    const [fontsLoaded] = useFonts({
        'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'),
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }
  return (
    <View style={styles.footer}>
      {/* Home Icon */}
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="home-outline" size={24} color="#0000FF" />
      </TouchableOpacity>

      {/* Health Icon */}
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="heart-pulse" size={24} color="#B0B0B0" />
      </TouchableOpacity>

      {/* Menu Icon */}
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="menu" size={24} color="#B0B0B0" />
      </TouchableOpacity>

      {/* Profile Icon */}
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="account-outline" size={35} color="#B0B0B0" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f2f0ef',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
  },
});

export default Footer;
