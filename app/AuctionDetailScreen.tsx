import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useFonts } from "expo-font";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppLoading from "expo-app-loading";
import { useNavigation } from "expo-router";
import Checkbox from 'expo-checkbox';
import * as Linking from 'expo-linking'; // Import Linking for opening URLs

type RootStackParamList = {
  AuctionDetailScreen: { item: any };
};

type AuctionDetailScreenRouteProp = RouteProp<RootStackParamList, 'AuctionDetailScreen'>;

const AuctionDetailScreen = () => {
  const route = useRoute<AuctionDetailScreenRouteProp>();
  const { item } = route.params;

  const navigation: any = useNavigation();

  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  const [isChecked, setIsChecked] = useState(false); // State for the checkbox

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const openWhatsApp = () => {
    const whatsappNumber = "+917838375738"; // Replace with the owner's WhatsApp number
    const message = `Hello! I want to know more about the property: ${item.title}`; // Include property details in the message

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Unable to open WhatsApp. Please make sure it is installed.");
    });
  };

    // Initiate a phone call
    const makeCall = () => {
      const phoneNumber = "tel:+917838375738";
  
      Linking.openURL(phoneNumber).catch(() => {
        Alert.alert("Error", "Unable to make a call. Please try again later.");
      });
    };

  return (
    <ImageBackground
      source={require('../assets/images/index.jpg')}
      style={styles.container}
      resizeMode="cover">
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={40} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.header}>AUCTION PROPERTY</Text>
      </View>

      <View style={styles.stepContainer}>
        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.subHeader}>
            75453 BANK AUCTION PROPERTIES IN INDIA
          </Text>
          <View style={styles.card}>
            {/* Property details */}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.bank}>{item.bank}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.details}>
              {item.date} | {item.area} | {item.possession}
            </Text>
            <View style={styles.divider} />
            <Text style={styles.info}>Property type:</Text>
            <Text style={styles.item}>{item.details.type}</Text>
            <Text style={styles.info}>Category:</Text>
            <Text style={styles.item}>{item.details.category}</Text>
            <Text style={styles.info}>Property Size:</Text>
            <Text style={styles.item}>{item.details.size}</Text>
            <Text style={styles.info}>Address:</Text>
            <Text style={styles.item}>{item.details.address}</Text>
            <Text style={styles.info}>Possession:</Text>
            <Text style={styles.item}>{item.possession}</Text>
            <Text style={styles.info}>Auction date:</Text>
            <Text style={styles.item}>{item.details.auctionDate}</Text>
            <Text style={styles.info}>EMD date:</Text>
            <Text style={styles.item}>{item.details.emdDate}</Text>

            {/* Property Images */}
            <Text style={styles.info}>Property Images</Text>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.details.image1 }} style={styles.image} />
              <Image source={{ uri: item.details.image2 }} style={styles.image} />
            </View>

            {/* GPS Location */}
            <Text style={styles.info}>GPS Location</Text>
            <Text style={styles.gpsLink}>Click to view</Text>

            {/* Checkbox with Condition */}
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? '#622CFD' : undefined}
                style={styles.checkbox}
              />
              <Text style={styles.checkboxLabel}>
                Are you sure you want to view Auction Properties?
              </Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.callButton}
                disabled={!isChecked}
                onPress={makeCall}>
                <Text style={styles.buttonText}>CALL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.queryButton}
                disabled={!isChecked} // Disable the button if the checkbox is not checked
                onPress={openWhatsApp} // Call the openWhatsApp function
              >
                <Text style={styles.buttonText}>QUERY NOW</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    flex: 1,
    marginTop: '5%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    marginLeft: '3%',
  },
  header: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: '700',
    fontFamily: 'Lato',
    marginLeft: '10%',
  },
  subHeader: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Lato',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    color: '#000',
    marginVertical: 5,
    fontFamily: 'Lato',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#DDD',
    marginVertical: 10,
  },
  bank: {
    fontSize: 16,
    color: '#000',
    marginVertical: 5,
    fontFamily: 'Lato',
    fontWeight: '600',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00A000',
    marginVertical: 10,
    fontFamily: 'Lato',
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
    fontFamily: 'Lato',
    fontWeight:'600',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
    elevation: 3,
    marginHorizontal: 10,
    marginTop: 10,
  },
  item: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Lato',
    fontWeight: '600',
    paddingBottom:10,
  },
  info: {
    fontSize: 16,
    color: '#000',
    marginVertical: 10,
    fontFamily: 'Lato',
    fontWeight: '700',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 8,
    margin: 5,
  },
  gpsLink: {
    color: '#622CFD',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 13,
    color: '#000',
    fontFamily: 'Lato',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: 20,
    marginTop: 20,
  },
  callButton: {
    backgroundColor: '#622CFD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  queryButton: {
    backgroundColor: '#622CFD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Lato',
  },
});

export default AuctionDetailScreen;
