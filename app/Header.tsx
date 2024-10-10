import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = () => {
    return (
        <View style={styles.header}>
             <Icon name="arrow-back" size={24} color="#FFFF" style={styles.icon} /> 
            <Text style={styles.title}>surya</Text>
            <Icon name="menu" size={24} color="#FFFF" style={styles.icon} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#6A1B9A',
        padding: 15,
        marginTop:45,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between', 
    },
    title: {
        color: '#FFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    icon:{
        paddingHorizontal:10,
    },
});

export default Header; 