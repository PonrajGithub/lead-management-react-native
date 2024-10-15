import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from './Header'; 
// import ParallaxCarousel from './ParallaxCarousel';
import Loan from './Loan';
import QuickLink from './QuickLink';
import About from './About';
import TotalMember from './TotalMember';
import Job from './Job';

const DashboardScreen = () => {
    // Data array for the FlatList
    const data = [
        { id: '1', component: <Loan /> },
        { id: '2', component: <QuickLink /> },
        { id: '3', component: <TotalMember /> },
        { id: '4', component: <Job /> },
        { id: '5', component: <About /> },
    ];

    // Render item function for the FlatList
    const renderItem = ({ item }: any)  => (
        <View style={styles.itemContainer}>{item.component}</View>
    );

    return (
        <>
            <View style={styles.header}>
                <Header />
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.container}
                // Optional: You can add more props like padding or margin here
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#e5d0ff',
        paddingHorizontal: 10,
    },
    header: {
        backgroundColor: '#e5d0ff',
    },
    itemContainer: {
        marginBottom: 10, // Add margin between items if needed
    },
});

export default DashboardScreen;
