import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const Header = () => {
    const [userName, setUserName] = useState('');
    const [token, setToken] = useState('');
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
                const storedToken = await AsyncStorage.getItem('@storage_user_token');
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
                    const name = response.data?.name || 'User'; 
                    setUserName(name);
                    
                } else {
                    console.error('Token not found');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        
        fetchTokenAndUserName();
    }, [userName]);

    return (
        <View>
            <View style={styles.header}>
                <Icon name="arrow-back" size={24} color="#FFFF" style={styles.icon} />
                
                <Text style={styles.name}>{userName}</Text>
                
                <Icon name="menu" size={24} color="#FFFF" style={styles.icon} />
               
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#4A4A4A', // Dark grey background for the header
        paddingTop: '14%',
        paddingBottom: '3%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#FF4C4C', // Red color for the title text
        fontSize: 20,
        fontWeight: 'bold',
    },
    name: {
        color: '#FF4C4C', // Red color for the user name text
        fontSize: 20,
        fontFamily: 'heading',
    },
    icon: {
        paddingHorizontal: 10,
        color: '#D3D3D3', // Light grey color for the icons
    },
});

export default Header;