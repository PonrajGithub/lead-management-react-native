import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation } from 'expo-router';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FirstScreen = () => {
  const navigation: any = useNavigation();

  // Load custom fonts
  const [fontsLoaded] = useFonts({
     'text': require('../assets/fonts/Lato/Lato-Regular.ttf'),
    'heading': require('../assets/fonts/Lato/Lato-Bold.ttf'), 
  });

  // Render loading state if fonts are not loaded
  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  useEffect(() => {
    const checkAppState = async () => {
      if (!fontsLoaded) return;

      try {
        const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
        if (isFirstLaunch === null) {
          await AsyncStorage.setItem('isFirstLaunch', 'false');
          return;
        }

        const storedData = await AsyncStorage.getItem('@storage_user_data');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const token = parsedData?.data?.token;
          if (token) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'DashboardScreen' }],
            });
            return;
          }
        }
      } catch (error) {
        console.error('Error checking app state:', error);
      }
    };

    if (fontsLoaded) {
      checkAppState();
    }
  }, [fontsLoaded, navigation]);

  return (
    <View style={styles.container}>
       <View style={styles.backgroundWrapper}>
        <ImageBackground 
          source={require('../assets/images/1.png')} 
          style={styles.background}
          resizeMode="cover"
        >
          </ImageBackground>
      </View>
      <Text style={styles.title}>Find the Loan You Need</Text>
      <Text style={styles.description}>
        Easily browse through multiple loan options,{"\n"} 
        tailored to your needs. Fast approvals,{"\n"}    
                 flexible terms.
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
    width:'100%',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  background: {
    flex: 1, // This allows the image to take the full space of the wrapper
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'heading',
    textAlign: 'center',
    lineHeight: 35,
    marginTop: 30,
    color:'#333333',
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'text',
    marginTop: 20,
    color:'#666666',
    lineHeight: 30,
    fontWeight: 'light',
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
    paddingLeft:120,
  },
});

export default FirstScreen;
