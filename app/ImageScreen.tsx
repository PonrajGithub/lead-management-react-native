import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from 'expo-router';


const ImageScreen = ({ }: any) => {
    const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/banner.png')} // Replace with your image path
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
marginTop:0,
  },
  image: {
   width:'100%',
   height:150,
  },
});

export default ImageScreen;
