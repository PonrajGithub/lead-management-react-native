import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from './Header'; 
// import ParallaxCarousel from './ParallaxCarousel';
import Loan from './Loan';
import QuickLink from './QuickLink';
import About from './About';
import TotalMember from './TotalMember';
import Job from './Job';

const DashboardScreen = () => {
    return (
        <>
        {/* <View style={styles.header} > */}
                    <Header />
                {/* </View> */}
        
        <ScrollView>
                
            <View style={styles.container}>
                 {/* <ParallaxCarousel /> */}
                <Loan />
                <QuickLink />
                <TotalMember />
                <Job />
                <About />
            </View>
        </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5d0ff',
        paddingHorizontal: 10, // Applies padding to other components
    },
    header:{
        // backgroundColor: '#e5d0ff',
    }
   
});

export default DashboardScreen;
