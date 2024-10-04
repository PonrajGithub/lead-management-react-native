import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from 'expo-router';
const ThirdScreen = ({ }: any) => {
    const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      {/* Status bar and header */}
      <StatusBar backgroundColor="#6A1B9A" barStyle="light-content" />

      {/* Image */}
      <Image
        source={require('../assets/images/third.webp')} // Replace with your image path
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
        onPress={() => navigation.navigate('WelcomeScreen')}
      >
        <Text style={styles.nextButtonText}>NEXT</Text>
      </TouchableOpacity>

      {/* Skip option */}
      <TouchableOpacity onPress={() => navigation.navigate('WelcomeScreen')}>
        <Text style={styles.skipText}>SKIP</Text>
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
  header: {
    backgroundColor: '#6A1B9A', // Purple background for header
  },
  image: {
    width: '80%',
    height: 250,
    alignSelf: 'center',
    marginTop: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#7a7a7a',
    marginHorizontal: 40,
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical:'auto',
    marginTop:'auto',
    marginBottom:30,
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
    paddingHorizontal: 20,
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
  skipText: {
    color: 'black', // Grey color for skip text
    fontSize: 16,
  },
});

export default ThirdScreen;
