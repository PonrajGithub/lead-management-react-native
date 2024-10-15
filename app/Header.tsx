import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = () => {
    return (
        <View style={styles.header}>
            <View>
             <Icon name="arrow-back" size={24} color="#FFFF" style={styles.icon} /> 
             </View>
             <View>
            <Text style={styles.title}>surya</Text>
            </View>
            <View>
            <Icon name="menu" size={24} color="#FFFF" style={styles.icon} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: '#6A1B9A',
        paddingTop: 35,
        paddingBottom:20,
        alignItems: 'center',
        // flexDirection: 'row',
        justifyContent: 'space-between', 
        // marginBottom:20,
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