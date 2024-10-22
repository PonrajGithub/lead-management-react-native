import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Dimensions, Image, StyleSheet } from 'react-native';

const Index = () => {
  const navigation: any = useNavigation();  

  // Avoid conditionally rendering hooks
  useEffect(() => {
    const timer = setTimeout(() => {
      if (navigation) {  // Ensure navigation is ready
        navigation.navigate('FirstScreen'); // Adjust navigation target
      }
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Centered Loan Image */}
      <View style={styles.centerContent}>
        <Image
          source={require('../assets/images/loan.png')} // Adjust image path
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Footer Image (Secure Icon) */}
      <View style={styles.footer}>
        <Image
          source={require('../assets/images/image.png')} // Adjust image path
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Space between the logo and the footer
    alignItems: 'center', // Center items horizontally
    backgroundColor: '#fff', // Optional: set background color
  },
  centerContent: {
    flex: 1, // Take up available space for the center content
    justifyContent: 'center', // Vertically center the loan.jpg image
    alignItems: 'center',
  },
  logo: {
    width: Dimensions.get('window').width * 0.8, // Set the logo to 80% of the screen width
    height: Dimensions.get('window').height * 0.4, // Set the height to 40% of the screen height
  },
  footer: {
    justifyContent: 'flex-end', // Ensure it's pinned to the bottom
    alignItems: 'center',
    paddingBottom: 20, // Optional: Add padding for the footer
  },
  icon: {
    width: 80, // Width of the footer icon
    height: 80, // Height of the footer icon
  },
});

export default Index;
