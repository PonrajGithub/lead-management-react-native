import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const TotalMember = () => {

    const [fontsLoaded] = useFonts({
       'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'),
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
        backgroundColor: '#E7F4FF',
        fontFamily:'Lato',
        fontSize: 16,
        fontWeight:'600',
        lineHeight:16.8,
        color:"#1E1E1E",
        padding:10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
});

export default TotalMember;
