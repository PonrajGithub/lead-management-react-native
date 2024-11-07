import React,{useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image, ImageBackground } from 'react-native';
import { useNavigation } from 'expo-router';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ThirdScreen = ({ }: any) => {
    const navigation: any = useNavigation();
    const [fontsLoaded] = useFonts({
      'text': require('../assets/fonts/Lato/Lato-Light.ttf'),
      'heading': require('../assets/fonts/Lato/Lato-Bold.ttf'),  
    });

    if (!fontsLoaded) {
      return null; 
    }

  return (
    <View style={styles.container}>
     <View style={styles.backgroundWrapper}>
        <ImageBackground 
          source={require('../assets/images/3.png')} 
          style={styles.background}
          resizeMode="cover"
        >
        </ImageBackground>
      </View>
      {/* Title and description */}
      <Text style={styles.title}>Get Funds Fast</Text>
      <Text style={styles.description}>
        Receive the funds directly into your{"\n"}
        account. No hidden fees,just {"\n"}
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
            <Icon name="chevron-right" size={24} color="#fff" />
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
  backgroundWrapper: {
    height: '60%',
    width:'100%',
    overflow: 'hidden',
  },
  background: {
    flex: 1, // This allows the image to take the full space of the wrapper
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    fontFamily: 'heading',
    textAlign: 'center',
    lineHeight: 35,
    marginTop: 30,
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
});

export default ThirdScreen;
