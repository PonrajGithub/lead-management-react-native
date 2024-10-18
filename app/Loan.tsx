import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Assuming you're using expo for icons
import { WebView } from 'react-native-webview';

const data = [
  { id: '1', title: 'Unsecured', link: 'https://loanguru.in/best-unsecured-business-and-personal-loan-company-in-delhi-ncr/' },
  { id: '2', title: 'Secured', link: 'https://loanguru.in/delhis-best-secured-loan-provider-company-for-business-home-and-personal-loans/' },
  { id: '3', title: 'SME`s', link: 'https://loanguru.in/best-msme-loan-provider-company-in-delhi-for-new-business/' },
  { id: '4', title: 'OD/CC', link: 'https://loanguru.in/get-an-instant-overdraft-loan-from-delhis-best-od-loan-provider-company/' },
  { id: '5', title: 'Project', link: 'https://loanguru.in/the-best-project-loan-service-provider-company-in-delhi-and-ncr/' },
  { id: '6', title: 'Education', link: 'https://loanguru.in/delhis-best-student-loan-service-provider-company/' },
  { id: '7', title: 'Property', link: 'https://loanguru.in/delhis-best-student-loan-service-provider-company/' },
  { id: '8', title: 'Car', link: 'https://loanguru.in/delhis-best-student-loan-service-provider-company/' },
];

const Loan = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLink, setSelectedLink] = useState('');

  const handlePress = (link: string) => {
    setSelectedLink(link);
    setModalVisible(true);
  };
  const hideHeaderFooter = `
    document.querySelector('header').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
  `;

  const renderItem = ({ item }: { item: { id: string; title: string; link: string } }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePress(item.link)}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name="user" size={24} color="white" />
      </View>
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Loan</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.flatListContent}
      />
      <Modal visible={modalVisible} animationType="slide">
        <WebView
          source={{ uri: selectedLink }}
          injectedJavaScript={hideHeaderFooter}
          onNavigationStateChange={(navState) => {
            if (!navState.loading && !navState.url.startsWith('https://loanguru.in')) {
              setModalVisible(false); // Close modal if navigating outside of allowed domain
            }
          }}
        />
        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 30,
  },
  row: {
    justifyContent: 'space-around',
  },
  flatListContent: {
    alignItems: 'center',
  },
  item: {
    width: '23%', // Adjust to fit 4 columns
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    backgroundColor: '#6A0DAD', // Purple background
    borderRadius: 20,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Loan;
