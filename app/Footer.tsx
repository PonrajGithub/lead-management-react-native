import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert, Image} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

// Import custom education icon
import EducationIcon from '../assets/images/icon/education.png';


const Footer = () => {
  const navigation: any = useNavigation();
  
  const [userName, setUserName] = useState('User');

  // Load custom font
  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  useEffect(() => {
    const fetchTokenAndUserName = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('@storage_user_token');
        if (storedToken) {
          const config = {
            method: 'get',
            url: 'https://loanguru.in/loan_guru_app/api/userinfo',
            headers: { Authorization: `Bearer ${storedToken}` },
          };
          const response = await axios.request(config);
          const name = response.data?.name || 'User';
          setUserName(name);
        } 
      } catch (error) {
        console.error('Error fetching user info:', error);
        Alert.alert('Error', 'Failed to fetch user details. Please try again.');
      }
    };
    fetchTokenAndUserName();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  

  return (
    <View style={styles.footer}>
      {/* Home Icon */}
      <TouchableOpacity 
      style={styles.iconContainer}  
      onPress={() => navigation.navigate('DashboardScreen')}  >
         <Icon name="home-outline" size={28} color="#622CFD" />
      </TouchableOpacity>

      {/* Education Icon */}
      <TouchableOpacity style={styles.iconContainer}
      onPress={() => navigation.navigate('WebViewScreen')}>
        <Image source={EducationIcon} style={styles.customIcon} />
      </TouchableOpacity>

      {/* Profile Icon */}
      <View style={styles.profileContainer}>
        <Text style={styles.userName}>{userName}</Text>
      </View>
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
  customIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  profileContainer: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    color: '#622CFD',
    marginTop: 5,
    fontFamily: 'Lato',
  },
});

export default Footer;
