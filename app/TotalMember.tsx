import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const TotalMember = () => {

    const [fontsLoaded] = useFonts({
        'text': require('../assets/fonts/static/Rubik-Regular.ttf'),
        'heading': require('../assets/fonts/static/Rubik-Bold.ttf'), 
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }
    return (
       <View style={styles.container}>
            {/* <View style={styles.text}> */}
                <Text style={styles.text}>Total Members: 4212</Text>
            {/* </View> */}
        </View>
        
    );
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text:{
        // justifyContent:'center',
        height: 40,
        paddingLeft:10,
        paddingTop:10,
        backgroundColor: '#F0F8FF',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        fontFamily:'heading',
    },
});

export default TotalMember;
