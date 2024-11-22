import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';

const ImageScreen = () => {
  const [currentImage, setCurrentImage] = useState(require('../assets/images/slider1.png'));

  useEffect(() => {
    const images = [
      require('../assets/images/slider1.png'),
      require('../assets/images/slider2.png'),
      require('../assets/images/slider3.png'),
    ];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      setCurrentImage(images[currentIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/dashboard.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Banner container */}
      <View style={styles.bannerContainer}>
        <Image source={currentImage} style={styles.bannerImage} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  bannerContainer: {
    marginTop: 20,
    width: '90%', // Adjust width for a centered look
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 20,
  },
});

export default ImageScreen;
