import React,{useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from 'expo-router';
import { useFonts } from 'expo-font';

const ThirdScreen = ({ }: any) => {
    const navigation: any = useNavigation();
    const [fontsLoaded] = useFonts({
      'text': require('../assets/fonts/static/Rubik-Regular.ttf'),
      'heading': require('../assets/fonts/static/Rubik-Bold.ttf'), 
    });

    if (!fontsLoaded) {
      return null; 
    }

  return (
    <View style={styles.container}>
      {/* Status bar and header */}
      <StatusBar backgroundColor="#1e3a8a" barStyle="light-content" />

      {/* Image */}
      <Image
        source={require('../assets/images/third.png')} 
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title and description */}
      <Text style={styles.title}>Get Funds Fast</Text>
      <Text style={styles.description}>
        Receive the funds directly into your
        account. No hidden fees,just
        straightforward solutions.
      </Text>

      {/* Pagination and buttons */}
      <View style={styles.footer}>
      {/* Pagination dots */}
      <View style={styles.pagination}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
      </View>

      {/* Next button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'WelcomeScreen' }],
          })}>
      
        <Text style={styles.nextButtonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '80%',
    height: 250,
    alignSelf: 'center',
   marginTop:"20%"
  },
  title: {
    fontSize: 24, 
    fontWeight: '600', 
    fontFamily: 'heading', 
    textAlign: 'center',
    marginTop: 60,
    color: '#1e3a8a',
    lineHeight: 32, 
  },
  description: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'text', 
    color: '#555', 
    marginHorizontal: 40,
    marginTop: 10,
    lineHeight: 24, 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom:'10%',
    paddingHorizontal: 50,
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
    width: 16,
    height: 9,
    borderRadius: 4,
    backgroundColor: 'black', // Active dot color
  },
  nextButton: {
    backgroundColor: '#007AFF', // Button blue color
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
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

});

export default ThirdScreen;
