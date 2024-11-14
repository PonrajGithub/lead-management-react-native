import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import First from './Loan';
import QuickLink from './QuickLink';
import About from './About';
import TotalMember from './TotalMember';
import Job from './Job';
import LinearGradient from 'react-native-linear-gradient';


const DashboardScreen = () => {
    const navigation = useNavigation();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [userName, setUserName] = useState('');
    const [token, setToken] = useState('');

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
        <ScrollView style={styles.container}>
            <ImageBackground
                source={require('../assets/images/dashboard.jpg')}
                style={styles.background}
                resizeMode="cover"
            >
                <View>
                    <View style={styles.header}>
                        <Image
                            source={require('../assets/images/loan.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <TouchableOpacity
                            style={styles.profileIconContainer}
                            onPress={() => setDropdownVisible(!dropdownVisible)}
                        >
                            <View style={styles.profileIcon}>
                                <Text style={styles.profileInitial}>
                                    {userName.charAt(0).toUpperCase()}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bannerContainer}>
                        <Image
                            source={require('../assets/images/Group.png')}
                            style={styles.bannerImage}
                        />
                    </View>
                    {dropdownVisible && (
                        <View style={styles.dropdown}>
                            <TouchableOpacity style={styles.dropdownItem}>
                                <Text style={styles.dropdownText}>{userName}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={handleSettings}>
                                <Text style={styles.dropdownText}>Settings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout}>
                                <Text style={styles.dropdownText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <View style={styles.stepOneContainer}>
                    <First />
                    <TotalMember />
                    <QuickLink />
                    <Job />
                    <About />
                </View>
            </ImageBackground>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginTop: '-8%',
    },
    image: {
        height: 150,
        width: 150,
    },
    profileIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileIcon: {
      width: 50,
      height: 50,
      borderRadius: 50,
      backgroundColor: '#8e44ad',
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileInitial: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        fontFamily:'Lato'
    },
    bannerContainer: {
        marginTop: 16,
        paddingHorizontal: 16,
    },
    bannerImage: {
        width: '100%',
        height: 150,
        marginTop: '-15%',
    },
    stepOneContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 10,
        marginTop: '5%',
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

export default DashboardScreen;
