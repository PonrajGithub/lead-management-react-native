import React, { useEffect,useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  ImageBackground,
  Alert,
  ToastAndroid,
  Switch,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useFonts } from "expo-font";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppLoading from "expo-app-loading";
import { useNavigation } from "expo-router";
import Checkbox from 'expo-checkbox';
import * as Linking from 'expo-linking'; // Import Linking for opening URLs
import Footer from './Footer';

type RootStackParamList = {
  AuctionDetailScreen: { item: any };
};

type AuctionDetailScreenRouteProp = RouteProp<RootStackParamList, 'AuctionDetailScreen'>;


const AuctionDetailScreen = (auctionId:any) => {
  const route = useRoute<AuctionDetailScreenRouteProp>();
  const { item } = route.params;
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSwitchVisible, setIsSwitchVisible] = useState(true);  
  const navigation: any = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auctionCallNumber, setAuctionCallNumber] = useState("");
  const [auctionWhatsAppNumber, setAuctionWhatsAppNumber] = useState("");
  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  const { auctionDetails }:any = route.params;


  // console.log(auctionDetails, "KJHKHKJHKKJHJKHK")

  // Log the auctionDetails to check if the data is being passed correctly
  // console.log('Auction details:', auctionDetails);

  if (!auctionDetails) {
    return <Text>Error: No auction details found</Text>;
  }


  useEffect(() => {
    const formdata = new FormData();

    const requestOptions = {
      method: "GET",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://loanguru.in/loan_guru_app/api/mobile")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setAuctionCallNumber(data.data[0].auction_calling_number);
          setAuctionWhatsAppNumber(data.data[0].auction_whatsapp_number);
        }
      })
      .catch((error) => console.error("API Error:", error));
  }, []);

  // Function to make a call
  const MobileCall = () => {
    if (auctionCallNumber) {
      Linking.openURL(`tel:${auctionCallNumber}`);
    } else {
      console.error("Auction calling number not available.");
    }
  };

  // Function to open WhatsApp
  const openWhatsApp = () => {
    if (auctionWhatsAppNumber) {
      const whatsappUrl = `https://wa.me/${auctionWhatsAppNumber.replace(/\D/g, "")}`;
      Linking.openURL(whatsappUrl);
    } else {
      console.error("Auction WhatsApp number not available.");
    }
  };


  if (!fontsLoaded) {
    return <AppLoading />;
  }

 

const handleSwitchToggle = () => {
  Alert.alert(
    "Confirmation",
    "You’re about to unlock additional content. Tap OK to proceed or Cancel to keep it hidden.",
    [
      {
        text: "Cancel",
        onPress: () => console.log("User selected No"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('@storage_user_token');
console.log(token, "token")
            let data = new FormData();
            data.append('listing_id', auctionDetails?.ListingId);

            // Store Interest API call
            const storeResponse = await axios.post(
              'https://loanguru.in/loan_guru_app/api/storeInterest',
              data,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data',
                },
              }
            );

            // const storeResponse = await axios.request(storeConfig);
            console.log('Store Interest Response:', storeResponse);

            if (storeResponse.data.status === "error" && storeResponse.data.message === "You can only save up to 3 interests.") {
              Alert.alert("Limit Reached", "For a better experience and more details,click the button below to call us directly.");
              return;
            }

            // If storeInterest was successful, proceed with checkInterest API call
           
            const checkResponse = await axios.post(
              'https://loanguru.in/loan_guru_app/api/checkInterest',
              data,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data',
                },
              }
            );

            
            console.log('Check Interest Response:', checkResponse.data);

            if (checkResponse.data.status === "success" && checkResponse.data.data.interested === true) {
              setIsEnabled(true);
              setIsSwitchVisible(false);
              ToastAndroid.show('Interest marked successfully', ToastAndroid.SHORT);
            } else {
              console.error("Failed to mark interest or user has already shown interest:", checkResponse.data.message);
              ToastAndroid.show(checkResponse.data.message || "Failed to mark interest", ToastAndroid.SHORT);
            }
          }catch (error) {
            console.error("Error details:", error || error);
          }
        },
      },
    ],
    { cancelable: false }
  );
};

  



useEffect(() => {
  const checkInterest = async () => {
    try {
      const token = await AsyncStorage.getItem('@storage_user_token');
// console.log(token, "token")
      let data = new FormData();
      data.append('listing_id', auctionDetails?.ListingId);
    const checkResponse = await axios.post(
      'https://loanguru.in/loan_guru_app/api/checkInterest',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    
    // console.log('Check Interest Response:', checkResponse.data);

    if (checkResponse.data.status === "success" && checkResponse.data.data.interested === true) {
      setIsEnabled(true);
      setIsSwitchVisible(false);
      // ToastAndroid.show('Interest marked successfully', ToastAndroid.SHORT);
    }
  }catch (error) {
    console.error("Error details:", error || error);
  }
  }
  const fetchImage = async () => {
    try {
      const token = await AsyncStorage.getItem('@storage_user_token');
      if (token) {
        const response = await axios.get(
          `https://loanguru.in/loan_guru_app/api/property-auctions/ListingImages?ListingId=${auctionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.image_url) {
          setImageUri(response.data.image_url); // Assuming 'image_url' contains the image URL
        } else {
          // ToastAndroid.show('No image found for this listing.', ToastAndroid.SHORT);
        }
      } else {
        // ToastAndroid.show('No token found. Please log in again.', ToastAndroid.SHORT);
      }
    } catch (error) {
      // console.error('Error fetching image:', error);
      ToastAndroid.show('Failed to fetch image. Please try again.', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };
  fetchImage();
  checkInterest();
}, [auctionId]);

if (loading) {
  return <ActivityIndicator size="large" color="#0000ff" />;
}

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
      <Text style={styles.title}>{auctionDetails?.BankName}</Text>
      <Text style={styles.bank}>{auctionDetails?.Branch}</Text>
      <Text style={styles.price}>₹{auctionDetails?.ReservePrice}</Text>
      <Text style={styles.details}>
      {/* style={styles.info} */}
        {auctionDetails?.AuctionDate} | {auctionDetails?.PropertySize} | {auctionDetails?.Possession}
      </Text>
      <View>
    

  {auctionDetails?.PropertyType && (
    <>
      <Text style={styles.info}>Property type:</Text>
      <Text style={styles.item}>{auctionDetails.PropertyType}</Text>
    </>
  )}

  {auctionDetails?.SubCategory && (
    <>
      <Text style={styles.info}>Category:</Text>
      <Text style={styles.item}>{auctionDetails.SubCategory}</Text>
    </>
  )}

  {auctionDetails?.PropertySize && (
    <>
      <Text style={styles.info}>Property Size:</Text>
      <Text style={styles.item}>{auctionDetails.PropertySize}</Text>
    </>
  )}

  {auctionDetails?.Address && (
    <>
      <Text style={styles.info}>Address:</Text>
      <Text style={styles.item}>{auctionDetails.Address}</Text>
    </>
  )}

  {auctionDetails?.Possession && (
    <>
      <Text style={styles.info}>Possession:</Text>
      <Text style={styles.item}>{auctionDetails.Possession}</Text>
    </>
  )}

  {auctionDetails?.EMDDate && (
    <>
      <Text style={styles.info}>EMD date:</Text>
      <Text style={styles.item}>{auctionDetails.EMDDate}</Text>
    </>
  )}

  {auctionDetails?.BorrowerName && (
    <>
      <Text style={styles.info}>Borrower Name:</Text>
      <Text style={styles.item}>{auctionDetails.BorrowerName}</Text>
    </>
  )}

  {auctionDetails?.Status && (
    <>
      <Text style={styles.info}>Status:</Text>
      <Text style={styles.item}>{auctionDetails.Status}</Text>
    </>
  )}

  {auctionDetails?.AuthorisedOfficer && (
    <>
      <Text style={styles.info}>Authorized Officer:</Text>
      <Text style={styles.item}>{auctionDetails.AuthorisedOfficer}</Text>
    </>
  )}

  {auctionDetails?.InspectionDate && (
    <>
      <Text style={styles.info}>Inspection Date:</Text>
      <Text style={styles.item}>{auctionDetails.InspectionDate}</Text>
    </>
  )}
</View>

   
      {/* <Text style={styles.info}>ContactNo:</Text>
      <Text style={styles.item}>{auctionDetails?.ContactNo}</Text> */}

      {/* Conditional rendering for Images and GPS Location */}
      {isEnabled && auctionDetails && (
  <>
    {auctionDetails?.Images && auctionDetails.Images !== "null" && (
  <View>
    <Text style={styles.info}>Property Images:</Text>
    <View style={styles.imageContainer}>
      {Array.isArray(auctionDetails.Images) ? (
        auctionDetails.Images.map((imageUrl: any, index: any) => (
          <Image
            key={index}
            source={{ uri: imageUrl }}
            style={{ width: 100, height: 100, margin: 5 }}
          />
        ))
      ) : (
        <>
      {auctionDetails.Images ? (
        <Image
          source={{ uri: auctionDetails.Images }}
          style={{ width: 100, height: 100, margin: 5 }}
        />
      ) : null}
    </>
      )}
    </View>
  </View>
)}


    {auctionDetails?.GPSLocation && (
      <>
        <Text style={styles.info}>GPS Location</Text>
        <Text
          style={styles.gpsLink}
          onPress={() => Linking.openURL(auctionDetails.GPSLocation)}
        >
          Click to view
        </Text>
      </>
    )}
  </>
)}
     {isSwitchVisible && (
  <View style={styles.switchContainer}>
    <Switch
      trackColor={{ false: '#767577', true: '#622CFD' }}
      thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={handleSwitchToggle} // Call alert function on toggle change
      value={isEnabled}
    />
    <Text style={styles.switchLabel}>
       Click to view more details ?
    </Text>
  </View>
)}


       {/* Buttons */}
    
        <View  style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.callButton}
            onPress= {MobileCall}
          >
            <Text style={styles.buttonText}>CALL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.queryButton}
            onPress={openWhatsApp}
          >
            <Text style={styles.buttonText}>QUERY NOW</Text>
          </TouchableOpacity>
        </View>
    
    </View>
  </ScrollView>
  
</View>
<Footer/>
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
    fontSize: 16,
    color: '#555',
    fontFamily: 'Lato',
    marginVertical: 5,
    fontWeight: '600',
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
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      marginTop: 10,
    },
  image: {
    width: 200,
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
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
