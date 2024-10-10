import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header'; 
import SliderPage from './SliderPage';
import IconGrid from './IconGrid';

const DashboardScreen = () => {
    return (
        <View style={styles.container}>
            <Header />
           {/* <SliderPage /> */}
           <IconGrid/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});

export default DashboardScreen;
