import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get device dimensions
const { width, height } = Dimensions.get('window');

const FirstScreen = () => {
  const navigation: any = useNavigation();

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  useEffect(() => {
    const checkAppState = async () => {
      try {
        const storedData = await AsyncStorage.getItem('@storage_user_token');
        if (storedData !== null) {
          // const parsedData = JSON.parse(storedData);
          // const token = parsedData?.data?.token;
            // Token exists, navigate to DashboardScreen
            return navigation.reset({
              index: 0,
              routes: [{ name: 'DashboardScreen' }],
            });
        }
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
    height: height * 0.55, // 55% of the screen height
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.065, // Scaled font size
    fontWeight: '900',
    fontFamily: 'Lato',
    textAlign: 'center',
    lineHeight: width * 0.09, // Scaled line height
    marginTop: height * 0.03, // Responsive margin
    color: '#001533',
  },
  description: {
    textAlign: 'center',
    fontSize: width * 0.04, // Scaled font size
    fontFamily: 'Lato',
    marginTop: height * 0.02, // Responsive margin
    color: '#001533',
    lineHeight: width * 0.06, // Scaled line height
    fontWeight: '300',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: height * 0.1, // 10% of the screen height
    paddingHorizontal: width * 0.1, // 10% of the screen width
    backgroundColor: '#fff',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: width * 0.02, // Responsive size
    height: width * 0.02,
    borderRadius: width * 0.01,
    backgroundColor: '#C4C4C4',
    marginHorizontal: width * 0.01,
  },
  activeDot: {
    width: width * 0.04,
    height: width * 0.02,
    borderRadius: width * 0.01,
    backgroundColor: '#622CFD',
  },
  nextButton: {
    backgroundColor: '#622CFD',
    paddingVertical: height * 0.015, // Scaled padding
    paddingHorizontal: width * 0.05,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  skip: {
    color: '#555',
    fontSize: width * 0.045,
    paddingLeft: width * 0.3,
  },
});

export default FirstScreen;
