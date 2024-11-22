import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const Header = () => {
    const [token, setToken] = useState('');
    const navigation = useNavigation();

   

    const [fontsLoaded] = useFonts({
        Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const handleLogout = async () => {
        try {
            const config = {
                method: 'get',
                url: 'https://loanguru.in/loan_guru_app/api/logout',
                headers: { 'Authorization': `Bearer ${token}` },
            };
            await axios.request(config);
            await AsyncStorage.clear();
            navigation.reset({
                index: 0,
                routes: [{ name: 'WelcomeScreen' }],
            });
        } catch (error) {
            console.error('Error during logout:', error);
            Alert.alert('Error', 'An error occurred while logging out. Please try again.');
        }
    };


    return (
        <View style={styles.container}>
  <ImageBackground
    source={require('../assets/images/dashboard.jpg')}
    style={styles.headerBackground}
    resizeMode="cover"
  >
    <View style={styles.headerContent}>
      <Image
        source={require('../assets/images/loan.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={styles.profileIconContainer}
        onPress={handleLogout}
      >
        <View style={styles.profileIcon}>
        <Icon name="power" size={23} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
    </View>
  </ImageBackground>

</View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerBackground: {
      flex: 1,
      height:80,
    },
    headerContent: {
      // flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      // marginTop:'5%',
    },
    image:{
      height:100,
      width:150,
    },
    profileIconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
  },
  profileIcon: {
      width: 50,
      height: 50,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
  },
});


export default Header;
