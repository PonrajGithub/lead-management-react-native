import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useNavigation } from 'expo-router';

const Auction = () => {
  const navigation: any = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const redirectToCreateAccount = () => {
    setModalVisible(false); // Close the modal
    navigation.navigate('AuctionScreen'); // Navigate to the ReferralPartner screen
  };

  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>
           Auction : {' '}
          <Text style={styles.link} onPress={() => setModalVisible(true)}>
            Activate
          </Text>
        </Text>
        <Text style={styles.separator}>|</Text>
        <Text style={styles.text}>
          ID: <Text style={styles.id}>_ _ _ _</Text>
        </Text>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back press
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>AUCTION PROPERTY</Text>
            <Text style={styles.modalText}>
              By activating the AUCTION PROPERTY, you agree to the following terms and conditions...
            </Text>
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="#FF6347" />
              <Button title="OK" onPress={redirectToCreateAccount} color="#4CAF50" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b3e7ff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '700',
  },
  link: {
    color: '#0000FF',
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '900',
  },
  separator: {
    marginHorizontal: 30,
    color: '#000',
    fontSize: 20,
  },
  id: {
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Lato',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    fontFamily: 'Lato',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
    fontFamily: 'Lato',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Auction;
