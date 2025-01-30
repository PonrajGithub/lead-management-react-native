import React, { useEffect,useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Linking } from 'react-native';
import { useNavigation } from 'expo-router';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

// Icon imports
import Vacancies from '../assets/images/icon/Vacancies.png';
import Women from '../assets/images/icon/women.png';
import Whatsapp from '../assets/images/icon/whatsapp.png';


const Job = () => {
  const navigation: any = useNavigation();
  const [whatsappNumber, setWhatsappNumber] = useState<string | null>(null);

  // Fetch WhatsApp number
  useEffect(() => {
    const fetchWhatsAppNumber = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Cookie", "PHPSESSID=v9e0qghjn8lfhdi879h079bgtg");

        const response = await fetch("https://loanguru.in/wp-json/custom/v1/whatsapp-number", {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        });

        const result = await response.json();
        setWhatsappNumber(result.whatsapp_number);
      } catch (error) {
        console.error("Error fetching WhatsApp number:", error);
      }
    };

    fetchWhatsAppNumber();
  }, []);

  // Open WhatsApp
  const openWhatsApp = () => {
    if (whatsappNumber) {
      const whatsappUrl = `https://wa.me/${whatsappNumber}`;
      Linking.openURL(whatsappUrl).catch(() =>
        console.error("Failed to open WhatsApp")
      );
    } else {
      console.error("WhatsApp number not available");
    }
  };

  const data = [
    { id: '1', title: 'Job\nVacancies', link: 'https://loanguru.in/?page_id=2039', icon: Vacancies },
    { id: '2', title: 'Women\nEmpower', link: 'https://loanguru.in/?page_id=2043', icon: Women },
    { id: '3', title: 'WhatsApp', icon: Whatsapp },
  ];
  
  
 
 
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
    margin: 10,
    color: '#1E1E1E',
    fontWeight: '900',
    textAlign: 'left',
    lineHeight: 14.4,
    letterSpacing: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 20,
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
    height: 130,
  },
  icon: {
    height: 60,
    width: 60,
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
