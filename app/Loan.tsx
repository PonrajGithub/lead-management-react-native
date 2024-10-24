import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Assuming you're using expo for icons
import { WebView } from 'react-native-webview';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

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

  const [fontsLoaded] = useFonts({
    'text': require('../assets/fonts/static/Rubik-Regular.ttf'),
    'heading': require('../assets/fonts/static/Rubik-Bold.ttf'), 
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handlePress = (link: string) => {
    setSelectedLink(link);
    setModalVisible(true);
  };
  const hideHeaderFooter = `
    document.querySelector('header').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
    document.querySelector('.mobile-app-call-to-action').style.display = 'none';
    document.querySelector('.mobile-app-types-of-loan').style.display = 'none';
    document.querySelector('#weglot-switcher-1').style.display = 'none';
    document.querySelector('.cnb-action.cnb-icon-type-font').style.display = 'none';
  `;

  const renderItem = ({ item }: { item: { id: string; title: string; link: string } }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePress(item.link)}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name="user" size={20} color="white" />
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
    // fontWeight: 'bold',
    fontFamily:'heading',
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
    backgroundColor: '#47D147',
    borderRadius: 20,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    fontFamily:'text',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'grey',
    padding: 8,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Loan;
