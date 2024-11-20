import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Modal, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import First from './Loan';
import QuickLink from './QuickLink';
import About from './About';
import Job from './Job';
import Services from './Services';
import Help from './Help';
import Footer from './Footer';

const DashboardScreen = () => {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const [token, setToken] = useState('');
    const [currentImage, setCurrentImage] = useState(require('../assets/images/slider1.png'));


    useEffect(() => {
        const fetchTokenAndUserName = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('@storage_user_token');
                if (storedToken) {
                    setToken(storedToken);
                    const config = {
                        method: 'get',
                        url: 'https://loanguru.in/loan_guru_app/api/userinfo',
                        headers: { 'Authorization': `Bearer ${storedToken}` },
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
                routes: [{ name : 'WelcomeScreen' }],
            });
        } catch (error) {
            console.error('Error during logout:', error);
            Alert.alert('Error', 'An error occurred while logging out. Please try again.');
        }
    };

    useEffect(() => {
        const images = [
            require('../assets/images/slider1.png'),
            require('../assets/images/slider2.png'),
            require('../assets/images/slider3.png'),
        ];
        let currentIndex = 0;

        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            setCurrentImage(images[currentIndex]);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    

    return (
        <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
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
        <Icon name="power" size={30} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
    </View>
  </ImageBackground>
</View>
  
        {/* Content */}
        <ScrollView style={styles.content}>
          <ImageBackground
            source={require('../assets/images/dashboard.jpg')}
            style={styles.background}
            resizeMode="cover"
          >
            <View style={styles.bannerContainer}>
                <Image source={currentImage} style={styles.bannerImage} />
            </View>
            <View style={styles.stepOneContainer}>
              <First />
              <QuickLink />
              <Job />
              <About />
              <Services />
              <Help />
            </View>
          </ImageBackground>
        </ScrollView>
  
        {/* Footer */}
        <Footer />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
      },
      headerContainer: {
        height: 80,
        // marginTop: '5%',
        zIndex: 2,
      },
      headerBackground: {
        flex: 1,
      },
      headerContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop:'8%',
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
    content: {
      flex: 1,
    //   zIndex: 1, 
    },
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
      zIndex: 0, // Ensure background is at the lowest level
    },
    bannerContainer: {
      // marginTop: 10,
      padding: 10,
    },
    bannerImage: {
      width:'100%',
      height: 150,
      borderRadius:20
    },
    stepOneContainer: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      padding: 10,
      marginTop: '2%',
      overflow: 'visible', 
    },
  });
  

export default DashboardScreen;
