import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const Header = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [userName, setUserName] = useState('');
    const [token, setToken] = useState('');
    const navigation = useNavigation();

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
                    const config = {
                        method: 'get',
                        url: 'https://loanguru.in/loan_guru_app/api/userinfo',
                        headers: { 'Authorization': `Bearer ${storedToken}` },
                    };
                    const response = await axios.request(config);
                    const name = response.data?.name || 'User';
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
                routes: [{ name: 'WelcomeScreen' }],
            });
        } catch (error) {
            console.error('Error during logout:', error);
            Alert.alert('Error', 'An error occurred while logging out. Please try again.');
        }
    };

    const handleSettings = () => {
        setDropdownVisible(false);
        navigation.navigate('');
    };

    return (
        <View>
            <View style={styles.header}>
                <ImageBackground
                    source={require('../assets/images/index.jpg')}
                    style={styles.background}
                    resizeMode="cover"
                >
                    <Image
                        source={require('../assets/images/loan.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
                        <Icon name="menu" size={30} color="#FFFF" style={styles.icon} />
                    </TouchableOpacity>
                </ImageBackground>
            </View>

            {/* Dropdown Menu */}
            {dropdownVisible && (
                <View style={styles.dropdown}>
                    <TouchableOpacity style={styles.dropdownItem} onPress={handleSettings}>
                        <Text style={styles.dropdownText}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout}>
                        <Text style={styles.dropdownText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
    },
    background: {
        width: '100%',
        height: 200,
    },
    image: {
        width: 200,
        height: 200,
        position: 'absolute',
        marginLeft: '5%',
        marginTop: '-7%',
    },
    icon: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 10,
    },
    dropdown: {
        position: 'absolute',
        top: 110,
        right: 20,
        backgroundColor: '#FFF',
        borderRadius: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    dropdownText: {
        fontSize: 16,
        color: '#333',
    },
});

export default Header;
