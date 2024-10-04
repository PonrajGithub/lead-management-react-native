import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from 'expo-router';
const SecondScreen = ({ }: any) => {
    const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      {/* Status bar and header */}
      <StatusBar backgroundColor="#6A1B9A" barStyle="light-content" />

      {/* Image */}
      <Image
        source={require('../assets/images/second.webp')} // Replace with your image path
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title and description */}
      <Text style={styles.title}>Apply in Minutes</Text>
      <Text style={styles.description}>
        Easily browse through multiple loan optionsSimple and quick application process.
        with guidance at every step Submit your request in just a few taps..
        tailored to your needs. Fast approvals flexible terms.
      </Text>

      {/* Pagination and buttons */}
      <View style={styles.footer}>
        {/* Pagination dots */}
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Next button */}
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('ThirdScreen')}>
          <Text style={styles.nextButtonText}>NEXT</Text>
        </TouchableOpacity>

        {/* Skip option */}
        <TouchableOpacity onPress={() => navigation.navigate('ThirdScreen')}>
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
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  nextButton: {
    backgroundColor: '#2979FF',
    paddingVertical: 15,
    marginHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipText: {
    textAlign: 'center',
    color: '#2979FF',
    fontSize: 16,
  },
});

export default SecondScreen;
