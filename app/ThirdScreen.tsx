import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Platform } from 'react-native';
import { useNavigation } from 'expo-router';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const ThirdScreen = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <View style={styles.backgroundWrapper}>
        <ImageBackground
          source={require('../assets/images/3.png')}
          style={styles.background}
          resizeMode="cover"
        />
      </View>

      {/* Title and Description */}
      <Text style={styles.title}>Get Funds Fast</Text>
      <Text style={styles.description}>
        Receive the funds directly into your{"\n"}
        account. No hidden fees, just{"\n"}
        straightforward solutions.
      </Text>

      {/* Pagination and Next Button */}
      <View style={styles.footer}>
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'WelcomeScreen' }],
            })
          }
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
    fontSize: width * 0.065, // Responsive font size
    fontWeight: '900',
    fontFamily: 'Lato',
    textAlign: 'center',
    lineHeight: width * 0.09, // Line height based on screen width
    marginTop: height * 0.03, // Margin relative to screen height
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
    marginBottom: height * 0.1,
    paddingHorizontal: width * 0.1,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: width * 0.02,
    height: width * 0.02,
    borderRadius: (width * 0.02) / 2,
    backgroundColor: '#C4C4C4',
    marginHorizontal: width * 0.01,
  },
  activeDot: {
    width: width * 0.04,
    height: width * 0.02,
    borderRadius: width * 0.02,
    backgroundColor: '#622CFD',
  },
  nextButton: {
    backgroundColor: '#622CFD',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ThirdScreen;
