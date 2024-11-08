import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [userName, setUserName] = useState('');
    const [token, setToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigation: any = useNavigation();

    const [fontsLoaded] = useFonts({
        'text': require('../assets/fonts/static/Rubik-Regular.ttf'),
        'heading': require('../assets/fonts/static/Rubik-Bold.ttf'), 
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }

        useEffect(() => {
            const fetchTokenAndUserName = async () => {
                try {
                  // Only fetch if the user is logged in
                    const storedToken = await AsyncStorage.getItem('@storage_user_token');
                    // console.log('Stored Token:', storedToken); // Log to check if token is retrieved
                    if (storedToken) {
                      setToken(storedToken);
                      
                      // Fetch user information using the stored token
                      let config = {
                        method: 'get',
                        url: 'https://loanguru.in/loan_guru_app/api/userinfo',
                        headers: { 
                          'Authorization': `Bearer ${storedToken}` 
                        }
                      };
                      
                      const response = await axios.request(config);
                      const name = response.data?.name || 'User'; // Default to 'User' if name is not found
                      setUserName(name);
                    } else {
                      console.error('Token not found');
                    }
                } catch (error) {
                  console.error('Error fetching user info:', error);
                  Alert.alert('Error', 'Failed to fetch user details. Please try again.');
                }
              };
            
              fetchTokenAndUserName();
            }, [isLoggedIn, userName]);

    const handleLogout = async () => {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://loanguru.in/loan_guru_app/api/logout',
                headers: { 
                    'Authorization': `Bearer ${token}`
                }
            };

            await axios.request(config);

            // Remove specific items from AsyncStorage
            await AsyncStorage.removeItem('@storage_user_token');
            await AsyncStorage.removeItem('@storage_user_data');
            await AsyncStorage.removeItem('isLoggedIn');
            await AsyncStorage.clear();
            console.log(isLoggedIn);
            // Reset the navigation and navigate to WelcomeScreen
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
        <View>
            <View style={styles.header}>
                <Icon name="arrow-back" size={24} color="#FFFF" style={styles.icon} />
                
                <Text style={styles.name}>{userName}</Text>
                
                <TouchableOpacity onPress={() => setMenuVisible(true)}>
                    <Icon name="menu" size={24} color="#FFFF" style={styles.icon} />
                </TouchableOpacity>
            </View>
            
            {/* Menu Modal */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={menuVisible}
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setMenuVisible(false)}
                >
                    <View style={styles.menu}>
                        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                            <Text style={styles.menuText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#6CB4EE',
        paddingTop: '10%',
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#1e3a8a',
        fontSize: 20,
        fontWeight: 'bold',
    },
    name: {
        color: 'black',
        fontSize: 20,
        fontFamily:'heading'
    },
    icon: {
        paddingHorizontal: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    menu: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    menuText: {
        fontSize: 18,
        color: '#000',
    },
});

export default Header;