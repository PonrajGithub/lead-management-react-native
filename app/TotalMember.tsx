import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const TotalMember = () => {
    return (
       <View style={styles.container}>
            <View style={styles.text}>
                <Text>Total Members: 4212</Text>
            </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5d0ff',
        // marginBottom:20,
    },
    text:{
        justifyContent:'center',
        height: 40,
        paddingLeft:10,
        backgroundColor: '#3e97c9',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
});

export default TotalMember;
