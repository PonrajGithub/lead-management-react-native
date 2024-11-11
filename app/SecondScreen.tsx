import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from 'expo-router';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SecondScreen = () => {
  const navigation :any = useNavigation();
  const [fontsLoaded] = useFonts({
    'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.backgroundWrapper}>
        <ImageBackground 
          source={require('../assets/images/2.png')} 
          style={styles.background}
          resizeMode="cover"
        >
        </ImageBackground>
      </View>

      {/* Title and Description */}
      <Text style={styles.title}>Apply in Minutes</Text>
      <Text style={styles.description}>
        Easily browse through multiple loan{"\n"}options. Simple and quick application{"\n"}process with guidance at every step.{"\n"}Submit your request in just a few taps,{"\n"}tailored to your needs. Fast approvals,{"\n"}flexible terms.
      </Text>

      {/* Footer with Pagination and Next Button */}
      <View style={styles.footer}>
        {/* Pagination dots */}
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ThirdScreen')}
        >
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
    fontWeight:'700',
    fontFamily: 'Lato',
    textAlign: 'center',
    lineHeight: 35.25,
    marginTop: 30,
    color:'#001533',
  },
  description: {
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'Lato',
    marginTop: 15,
    color:'#001533',
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
});

export default SecondScreen;
