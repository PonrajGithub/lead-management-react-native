import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from 'expo-router';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FirstScreen = () => {
  const navigation: any = useNavigation();

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  useEffect(() => {
    const checkAppState = async () => {
      try
       {
        // Check if it's the first launch
        // const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
        // if (isFirstLaunch === null) {
        //   // First launch, proceed through First, Second, Third Screens
        //   return;
        // }

        // Check if user data exists (not first launch)
        const storedData = await AsyncStorage.getItem('@storage_user_data');
        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          const token = parsedData?.data?.token; // Assuming you are storing a token
          
          if (token) {
            // Token exists, navigate to DashboardScreen
            return navigation.reset({
              index: 0,
              routes: [{ name: 'DashboardScreen' }],
            });
          }
        }

        // No token found or no user data, navigate to WelcomeScreen
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'WelcomeScreen' }],
        // });

      } catch (error) {
        console.error('Error checking app state:', error);
      }
    };

    checkAppState();
  }, [navigation]);
  // Render loading state if fonts are not loaded
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.backgroundWrapper}>
        <ImageBackground
          source={require('../assets/images/1.png')}
          style={styles.background}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.title}>Find the Loan You Need</Text>
      <Text style={styles.description}>
        Easily browse through multiple loan{"\n"}options, tailored to your needs. Fast{"\n"}approvals, flexible terms.
      </Text>
      <View style={styles.footer}>
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('WelcomeScreen')}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('SecondScreen')}
        >
          <Icon name="chevron-right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundWrapper: {
    height: '60%',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    fontFamily: 'Lato',
    textAlign: 'center',
    lineHeight: 35.25,
    marginTop: 30,
    color: '#001533',
  },
  description: {
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'Lato',
    marginTop: 20,
    color: '#001533',
    lineHeight: 25.5,
    fontWeight: '300',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: '10%',
    paddingHorizontal: 40,
    backgroundColor: '#fff',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 17,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#622CFD',
  },
  nextButton: {
    backgroundColor: '#622CFD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  skip: {
    color: '#555',
    fontSize: 16,
    paddingLeft: 120,
  },
});

export default FirstScreen;
