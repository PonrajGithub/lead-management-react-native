import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from 'expo-router';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const SecondScreen = () => {
  const navigation: any = useNavigation();
  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
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
        />
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
    height: height * 0.55, // 55% of screen height
    width: '100%',
    overflow: 'hidden',
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.065, // Dynamic font size based on screen width
    fontWeight: '900',
    fontFamily: 'Lato',
    textAlign: 'center',
    lineHeight: width * 0.09, // Adjust line height
    marginTop: height * 0.03, // Dynamic margin
    color: '#001533',
  },
  description: {
    textAlign: 'center',
    fontSize: width * 0.045,
    fontFamily: 'Lato',
    marginTop: height * 0.02,
    color: '#001533',
    lineHeight: width * 0.06,
    fontWeight: '300',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: height * 0.05, // Dynamic margin
    paddingHorizontal: width * 0.1, // Dynamic padding
    backgroundColor: '#fff',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: width * 0.02, // Dynamic width
    height: width * 0.02, // Dynamic height
    borderRadius: width * 0.01,
    backgroundColor: '#C4C4C4',
    marginHorizontal: width * 0.01,
  },
  activeDot: {
    width: width * 0.04, // Dynamic width
    height: width * 0.02,
    borderRadius: width * 0.01,
    backgroundColor: '#622CFD',
  },
  nextButton: {
    backgroundColor: '#622CFD',
    paddingVertical: height * 0.015, // Dynamic padding
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default SecondScreen;
