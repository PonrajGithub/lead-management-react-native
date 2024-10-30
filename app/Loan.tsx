import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const data = [
  { id: '1', title: 'Unsecured', link: 'https://loanguru.in/best-unsecured-business-and-personal-loan-company-in-delhi-ncr/', icon: 'credit-card' },
  { id: '2', title: 'Secured', link: 'https://loanguru.in/delhis-best-secured-loan-provider-company-for-business-home-and-personal-loans/', icon: 'lock' },
  { id: '3', title: 'SME`s', link: 'https://loanguru.in/best-msme-loan-provider-company-in-delhi-for-new-business/', icon: 'building' },
  { id: '4', title: 'OD/CC', link: 'https://loanguru.in/get-an-instant-overdraft-loan-from-delhis-best-od-loan-provider-company/', icon: 'wallet' },
  { id: '5', title: 'Project', link: 'https://loanguru.in/the-best-project-loan-service-provider-company-in-delhi-and-ncr/', icon: 'tools' },
  { id: '6', title: 'Education', link: 'https://loanguru.in/delhis-best-student-loan-service-provider-company/', icon: 'book' },
];

const Loan: React.FC = () => {
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

  const renderItem = ({ item }: { item: { id: string; title: string; link: string, icon: string } }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePress(item.link)}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name={item.icon} size={24} color="#1e3a8a" />
      </View>
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Loan</Text>
      {/* First row with 4 icons */}
      <View style={styles.row}>
        {data.slice(0, 4).map(item => renderItem({ item }))}
      </View>
      {/* Second row with 2 icons, aligned to the left */}
      <View style={styles.rowLeft}>
        {data.slice(4, 6).map(item => renderItem({ item }))}
      </View>
      <Modal visible={modalVisible} animationType="slide">
        <WebView
          source={{ uri: selectedLink }}
          injectedJavaScript={hideHeaderFooter}
          onNavigationStateChange={(navState) => {
            if (!navState.loading && !navState.url.startsWith('https://loanguru.in')) {
              setModalVisible(false);
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
    borderRadius: 10,
    padding: 20,
    borderColor:'#1e3a8a',
  },
  heading: {
    fontSize: 18,
    fontFamily: 'heading',
    marginBottom: 20,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rowLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  item: {
    width: '22%', 
    alignItems: 'center',
    marginBottom: 20,
    fontFamily:'text',
  },
  iconContainer: {
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    marginTop: 8,
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'text',
    color: '#333',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'grey',
    padding: 8,
    borderRadius: 15,
    elevation: 5,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Loan;