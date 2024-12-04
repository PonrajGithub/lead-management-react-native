import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Linking } from 'react-native';
import { useNavigation } from 'expo-router';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

// Icon imports
import Vacancies from '../assets/images/icon/Vacancies.png';
import Women from '../assets/images/icon/women.png';
import Whatsapp from '../assets/images/icon/whatsapp.png';

const data = [
  { id: '1', title: 'Job\nVacancies', link: 'https://loanguru.in/?page_id=2039', icon: Vacancies },
  { id: '2', title: 'Women\nEmpower', link: 'https://loanguru.in/?page_id=2043', icon: Women },
  { id: '3', title: 'WhatsApp', icon: Whatsapp },
];

const openWhatsApp = () => {
  const whatsappNumber = "+917838375738"; // Replace with the owner's WhatsApp number (include country code)
  const message = "Hello! I want to know more about your services."; // Default message

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  Linking.openURL(url).catch(() => {
    Alert.alert("Error", "Unable to open WhatsApp. Please make sure it is installed.");
  });
};

const Job = () => {
  const navigation: any = useNavigation();
  const [fontsLoaded] = useFonts({
    'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const renderItem = ({ item }: { item: { id: string; title: string; link?: string; icon: any } }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      key={item.id}
      onPress={() => {
        if (item.title === 'WhatsApp') {
          openWhatsApp();
        } else {
          navigation.navigate('WebViewScreen', { uri: item.link });
        }
      }}
    >
      <View style={styles.iconContainer}>
        <Image source={item.icon} style={styles.icon} />
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FEATURES</Text>
      <View style={styles.row}>
        {data.map((item) => (
          renderItem({ item })
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    flex: 1,
  },
  header: {
    fontFamily: 'Lato',
    fontSize: 14,
    margin: 20,
    color: '#1E1E1E',
    fontWeight: '900',
    textAlign: 'left',
    lineHeight: 14.4,
    letterSpacing: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '33%',
  },
  iconContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 120,
  },
  icon: {
    height: 50,
    width: 50,
  },
  itemText: {
    fontFamily: 'Lato',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'left',
    fontWeight: '600',
    lineHeight: 16.8,
    color: "#1E1E1E",
  },
});

export default Job;
