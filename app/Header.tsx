import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation : any = useNavigation();

    const handleLogout = () => {
        setMenuVisible(false);
        navigation.navigate('WelcomeScreen', {index:0})
    };

    return (
        <View>
            <View style={styles.header}>
                <Icon name="arrow-back" size={24} color="#FFFF" style={styles.icon} />
                <Text style={styles.title}>surya</Text>
                <TouchableOpacity onPress={() => setMenuVisible(true)}>
                    <Icon name="menu" size={24} color="#FFFF" style={styles.icon} />
                </TouchableOpacity>
            </View>

            {/* Menu Modal */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={menuVisible}
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay} 
                    onPress={() => setMenuVisible(false)}
                >
                    <View style={styles.menu}>
                        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                            <Text style={styles.menuText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: '#6A1B9A',
        paddingTop:'15%',
        paddingBottom:20,
        alignItems: 'center',
        // flexDirection: 'row',
        justifyContent: 'space-between', 
        marginBottom:5,
    },
    title: {
        color: '#FFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    icon: {
        paddingHorizontal: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    menu: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    menuText: {
        fontSize: 18,
        color: '#000',
    },
});

export default Header;




// header: {
//     // flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#6A1B9A',
//     paddingTop:'15%',
//     paddingBottom:20,
//     alignItems: 'center',
//     // flexDirection: 'row',
//     justifyContent: 'space-between', 
//     // marginBottom:20,
// },