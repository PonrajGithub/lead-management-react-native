import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Modal, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Loan from './Loan';
import QuickLink from './QuickLink';
import About from './About';
import Job from './Job';
import Services from './Services';
import Help from './Help';
import ChatBot from './ChatBot';
import Footer from './Footer';
import SocialMedia from './SocialMedia';
import Sales from './sales';
import Referral from './Referral';

const DashboardScreen = () => {
    const navigation = useNavigation();
    // const [userName, setUserName] = useState('');
    // const [token, setToken] = useState('');
    const [currentImage, setCurrentImage] = useState(require('../assets/images/slider1.png'));


    // useEffect(() => {
    //     const fetchTokenAndUserName = async () => {
    //         try {
    //             const storedToken = await AsyncStorage.getItem('@storage_user_token');
    //             if (storedToken) {
    //                 setToken(storedToken);
    //                 const config = {
    //                     method: 'get',
    //                     url: 'https://loanguru.in/loan_guru_app/api/userinfo',
    //                     headers: { 'Authorization': `Bearer ${storedToken}` },
    //                 };
    //                 const response = await axios.request(config);
    //                 const name = response.data?.name || 'User';
    //                 setUserName(name);
    //             } 
    //         } catch (error) {
    //             console.error('Error fetching user info:', error);
    //             Alert.alert('Error', 'Failed to fetch user details. Please try again.');
    //         }
    //     };
    //     fetchTokenAndUserName();
    // }, []);

    // const handleLogout = async () => {
    //     try {
    //         const config = {
    //             method: 'get',
    //             url: 'https://loanguru.in/loan_guru_app/api/logout',
    //             headers: { 'Authorization': `Bearer ${token}` },
    //         };
    //         await axios.request(config);

    //         await AsyncStorage.clear();
    //         navigation.reset({
    //             index: 0,
    //             routes: [{ name : 'WelcomeScreen' }],
    //         });
    //     } catch (error) {
    //         console.error('Error during logout:', error);
    //         Alert.alert('Error', 'An error occurred while logging out. Please try again.');
    //     }
    // };

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
          <Header/>
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
              <Loan />
              <QuickLink />
              <Referral/>
              <Job />
              <About />
              <Services />
              <Help />
              <Sales/>
              <SocialMedia/>
              {/* <ChatBot/> */}
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
        
      },
    content: {
      flex: 1,
    },
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
      zIndex: 0, 
    },
    bannerContainer: {
      padding: 10,
    },
    bannerImage: {
      width:'100%',
      height:150,
      borderRadius:20
    },
    stepOneContainer: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      // backgroundColor: '#f2f0ef',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      overflow: 'visible', 
    },
  });
  

export default DashboardScreen;