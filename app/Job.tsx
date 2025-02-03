import React, { useEffect,useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import { useNavigation } from 'expo-router';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

// Icon imports
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
    { id: '1', title: 'Women\nEmpower', link: 'https://loanguru.in/?page_id=2043', icon: Women },
    { id: '2', title: 'WhatsApp', icon: Whatsapp },
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
    // marginBottom: 20,
    color: '#1E1E1E',
    fontWeight: '700',
    textAlign: 'left',
    marginLeft:15,
    marginTop:5,
    lineHeight: 14.4,
    letterSpacing: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: -8,
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 5,
    width: '50%',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderColor: '#000', 
    borderWidth: 1,
    justifyContent: 'center',
    width: 170,
    height: 70,
  },
  icon: {
    height: 60,
    width: 60,
  },
  itemText: {
    fontFamily:'Lato',
    fontSize: 18,
    marginLeft: 10,
    fontWeight:'600',
    lineHeight:16.8,
    color:"#1E1E1E",
  },
});

export default Job;
