import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WebView } from 'react-native-webview';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const data = [
  { id: '1', title: 'Unsecured', link: 'https://loanguru.in/best-unsecured-business-and-personal-loan-company-in-delhi-ncr/', icon: 'lock-open-variant-outline' },
  { id: '2', title: 'Secured', link: 'https://loanguru.in/delhis-best-secured-loan-provider-company-for-business-home-and-personal-loans/', icon: 'lock-outline' },
  { id: '3', title: 'SME`s', link: 'https://loanguru.in/best-msme-loan-provider-company-in-delhi-for-new-business/', icon: 'factory' },
  { id: '4', title: 'OD/CC', link: 'https://loanguru.in/get-an-instant-overdraft-loan-from-delhis-best-od-loan-provider-company/', icon: 'credit-card-outline' },
  { id: '5', title: 'Project', link: 'https://loanguru.in/the-best-project-loan-service-provider-company-in-delhi-and-ncr/', icon: 'projector-screen-outline' },
  { id: '6', title: 'Education', link: 'https://loanguru.in/delhis-best-student-loan-service-provider-company/', icon: 'school-outline' }
];

const Loan: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLink, setSelectedLink] = useState('');

  const [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../assets/fonts/static/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../assets/fonts/static/Rubik-Bold.ttf'), 
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
        <Icon name={item.icon} size={28} color="#0096FF" />
      </View>
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Loan Options</Text>
      <View style={styles.row}>
        {data.slice(0, 3).map(item => renderItem({ item }))}
      </View>
      <View style={styles.row}>
        {data.slice(3, 6).map(item => renderItem({ item }))}
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
    padding: 15,
    paddingTop: 40,
    backgroundColor: '#CECECE', // Dark grey background for the container
  },
  heading: {
    fontFamily: 'Rubik-Bold',
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 10,
    color: '#333333', // Red color for heading text
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  item: {
    alignItems: 'center',
    width: '30%',
    // backgroundColor: '#4A4A4A', // Dark grey background for each item
    padding: 10,
    borderRadius: 15, // Rounded corners for item boxes
  },
  iconContainer: {
    backgroundColor: '#fff', // Red color for the icon container
    borderRadius: 30, // Circle for the icon container
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 14,
    fontFamily: 'Rubik-Bold',
    textAlign: 'center',
    color: '#333333', // White color for text to stand out on dark grey
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#4A4A4A', // Dark grey color for close button
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FF4C4C', // Red border for close button
  },
  closeButtonText: {
    color: '#FF4C4C', // Red color for close button text
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Loan;
