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


  if (!fontsLoaded) {
    return <AppLoading />;
  }



// Function to fetch mobile data and either call or redirect
const fetchAndCall = async () => {
  try {
    // Fetch token from AsyncStorage
    const token = await AsyncStorage.getItem('@storage_user_token');

    if (!token) {
      Alert.alert('Error', 'No token found. Please log in.');
      return;
    }

    // Axios configuration
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://loanguru.in/loan_guru_app/api/mobile',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Fetch data
    const response = await axios.request(config);

    if (response.data) {
      const mobileData = response.data;

      // Example: Phone call
      if (mobileData.phoneNumber) {
        const phoneNumber = mobileData.phoneNumber;
        const url = `tel:${phoneNumber}`;
        Linking.openURL(url).catch((err) =>
          console.error('Error opening dialer:', err)
        );
      } else {
        Alert.alert('Error', 'Phone number not found in the response.');
      }

      // Example: Redirect to WhatsApp
      if (mobileData.whatsappNumber) {
        openWhatsApp(mobileData.whatsappNumber);
      }
    } else {
      Alert.alert('Error', 'No data received from the API.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    Alert.alert('Error', 'Failed to fetch data from the server.');
  }
};

// Function to open WhatsApp
const openWhatsApp = (whatsappNumber : any) => {
  const message = 'Hello! I want to know more about your services.';
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  Linking.openURL(url).catch(() => {
    Alert.alert(
      'Error',
      'Unable to open WhatsApp. Please make sure it is installed.'
    );
  });
};


const handleSwitchToggle = async () => {
  // Display alert when toggle is clicked
  Alert.alert(
    "Confirmation",
    "Are you sure you want to view Auction Properties?",
    [
      {
        text: "No",
        onPress: () => {
          console.log("User selected No");
        },
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          console.log("User selected Yes");
          setIsEnabled(true); // Show the auction details

          // Check if the token has already been saved
          const isTokenSaved = await AsyncStorage.getItem('@storage_token_saved');
          console.log("Token saved status:", isTokenSaved);

          if (isTokenSaved) {
            console.log("Token already saved, hiding toggle.");
            setIsSwitchVisible(false); // Hide the toggle button if token is saved
          } else {
            console.log("Saving token for the first time.");
            await saveToken();
            setIsSwitchVisible(false); // Hide the toggle button
            // Save token to database and set the flag
          }
        },
      },
    ],
    { cancelable: false }
  );
};

const saveToken = async () => {
  try {
    // Retrieve token from AsyncStorage
    const token = await AsyncStorage.getItem('@storage_user_token');
    if (token) {
      console.log("Token retrieved:", token);

      // Store token in the database
      await storeTokenToDatabase(token);

      // Set the flag indicating the token is saved
      await AsyncStorage.setItem('@storage_token_saved', 'true');
      console.log("Token stored and flag set to true.");

      // After storing token, explicitly update the state
      setIsSwitchVisible(false);  // Hide the toggle after successful token storage
    } else {
      console.error("No token found in AsyncStorage.");
    }
  } catch (error) {
    console.error("Error retrieving or storing token:", error);
  }
};

const storeTokenToDatabase = async (token: any) => {
  let data = JSON.stringify({
    "listing_ids": [1, 2, 3],
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://loanguru.in/loan_guru_app/api/storeInterest',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`,
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log('Response Data:', JSON.stringify(response.data));
  } catch (error) {
    if (error.response) {
      console.error('Error storing token:', error.response.data);
    } else if (error.request) {
      console.error('Error storing token, no response:', error.request);
    } else {
      console.error('Error storing token:', error.message);
    }
  }
};


useEffect(() => {
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
          ToastAndroid.show('No image found for this listing.', ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show('No token found. Please log in again.', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      ToastAndroid.show('Failed to fetch image. Please try again.', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  fetchImage();
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
        {auctionDetails?.AuctionDate} | {auctionDetails?.PropertySize} | {auctionDetails?.Possession}
      </Text>
      <Text style={styles.info}>Property type:</Text>
      <Text style={styles.item}>{auctionDetails?.PropertyType}</Text>
      <Text style={styles.info}>Category:</Text>
      <Text style={styles.item}>{auctionDetails?.SubCategory}</Text>
      <Text style={styles.info}>Property Size:</Text>
      <Text style={styles.item}>{auctionDetails?.PropertySize}</Text>
      <Text style={styles.info}>Address:</Text>
      <Text style={styles.item}>{auctionDetails?.Address}</Text>
      <Text style={styles.info}>Possession:</Text>
     <Text style={styles.item}>{auctionDetails?.Possession}</Text>
      <Text style={styles.info}>Auction date:</Text>
      <Text style={styles.item}>{auctionDetails?.AuctionDate}</Text>
      <Text style={styles.info}>EMD date:</Text>
      <Text style={styles.item}>{auctionDetails?.EMDDate}</Text>
      <Text style={styles.info}>InspectionDate:</Text>
      <Text style={styles.item}>{auctionDetails?.InspectionDate}</Text>
       <Text style={styles.info}>BorrowerName:</Text>
      <Text style={styles.item}>{auctionDetails?.BorrowerName}</Text>
      <Text style={styles.info}>Status:</Text>
      <Text style={styles.item}>{auctionDetails?.Status}</Text>
      <Text style={styles.info}>AuthorisedOfficer:</Text>
      <Text style={styles.item}>{auctionDetails?.AuthorisedOfficer}</Text>
      <Text style={styles.info}>ContactNo:</Text>
      <Text style={styles.item}>{auctionDetails?.ContactNo}</Text>

      {/* Conditional rendering for Images and GPS Location */}
      {isEnabled && auctionDetails && (
  <>
    {auctionDetails?.Images && auctionDetails.Images !== "null" && (
  <View>
    <Text style={styles.info}>Property Images</Text>
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
          <Image
            source={{ uri: auctionDetails.Images }}
            style={{ width: 100, height: 100, margin: 5 }}
          />
          {ToastAndroid.show('Image not available.', ToastAndroid.SHORT)} {/* This should be outside of JSX */}
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
      Are you sure you want to view Auction Properties?
    </Text>
  </View>
)}


       {/* Buttons */}
       <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.callButton}
                // disabled={!isChecked}
                onPress={fetchAndCall}>
                <Text style={styles.buttonText}>CALL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.queryButton}
                // disabled={!isChecked}
                onPress={openWhatsApp}>
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
