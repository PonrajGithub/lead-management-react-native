
import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

const Home = () => {

  return (
    <ImageBackground 
      source={require('../assets/images/home.png')} // Ensure this path is correct
      style={styles.background}
      resizeMode="cover"
    >
     
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height:1100,
    width:400,
  },
 
});


export default Home;
