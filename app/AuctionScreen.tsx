import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker'; // Import Picker component

const AuctionScreen = () => {
  const navigation: any = useNavigation();
  const [auctionData, setAuctionData] = useState<AuctionItem[]>([]);
  const [filteredData, setFilteredData] = useState<AuctionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [propertyLocation1, setPropertyLocation1] = useState(''); // Location filter
  const [propertyLocation2, setPropertyLocation2] = useState(''); // Property type filter
  const [budget, setBudget] = useState(''); // Budget filter



  type AuctionItem = {
    ListingId: string;
    BankName: string;
    Branch: string;
    PropertyType: string;
    SubCategory: string;
    PropertySize: string;
    Address: string;
    State: string;
    ReservePrice: string;
    BudgetRange: string | null; // Budget range can be null
    Possession: string;
    AuctionDate: string;
    EMDDate: string;
    InspectionDate: string;
    BorrowerName: string;
    Status: string;
    AuthorisedOfficer: string;
    ContactNo: string;
    Remarks: string | null; // Remarks can be null
    Images: string | null; // Images can be null
  };

  const handleSearch = async () => {
    try {
      // Retrieve the stored token
      const token = await AsyncStorage.getItem('@storage_user_token');
      if (!token) {
         ToastAndroid.show('No token found. Please log in again.', ToastAndroid.SHORT);
        return;
      }
  
      const response = await axios.post(
        'https://loanguru.in/loan_guru_app/api/property-auctions/search',
        {
          // Add search filters here
          location: propertyLocation1,
          type: propertyLocation2,
          budget,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token from AsyncStorage
          },
        }
      );

      if (!response || !response.data) {
        throw new Error('Invalid API response');
      }
  
      // Process and filter the response data
      const auctionData = response?.data?.data && response?.data?.data?.length > 0 ? response?.data?.data : [];
      setAuctionData(auctionData);
      setFilteredData(auctionData);
  
      if (auctionData.length === 0) {
        ToastAndroid.show('Try adjusting your search criteria..', ToastAndroid.SHORT);

      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      ToastAndroid.show('Unable to fetch search results. Please try again.', ToastAndroid.SHORT);

    }
  };


  const fetchAuctionDetails = async (auctionId: string) => {
    try {
      const token = await AsyncStorage.getItem('@storage_user_token');
      if (!token) {
        ToastAndroid.show('No token found. Please log in again.', ToastAndroid.SHORT);
        return;
      }
  
      const response = await axios.get(
        `https://loanguru.in/loan_guru_app/api/property-auctions/${auctionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response || !response.data) {
        throw new Error('Invalid API response');
      }
  
      // Log the response to check the structure
      // console.log('Auction details response:', response.data);
  
      // Check if the response contains the expected data
      if (response.data && response.data.data && response.data.data[0]) {
        // Navigate to AuctionDetailScreen with the auction details

        navigation.navigate('AuctionDetailScreen', { auctionDetails: response.data.data[0] });

      } else {
        ToastAndroid.show('Auction details not found.',ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error fetching auction details:', error);
      ('Unable to fetch auction details. Please try again.');
    }
  };
  

  const renderItem = ({ item }: { item: AuctionItem }) => (
    <View style={styles.card}>
      <Text style={styles.bankName}>{item.BankName}</Text>
      <Text style={styles.bank}>{item.Branch}</Text>
      <Text style={styles.price}>₹{item.ReservePrice}</Text>
      <Text style={styles.details}>
        {item.AuctionDate} | {item.PropertySize} | {item.Possession}
     </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => fetchAuctionDetails(item.ListingId)} // Pass auction ID here
        accessible
        accessibilityLabel="View Auction Details"
      >
        <Text style={styles.buttonText}>VIEW AUCTION</Text>
      </TouchableOpacity>
    </View>
  );

 

  return (

    <ImageBackground
    source={require('../assets/images/index.jpg')}
    style={styles.container}
    resizeMode="cover"
  >
    <View style={styles.row}>
      <TouchableOpacity onPress={() => navigation.navigate('DashboardScreen')}>
        <Icon name="chevron-left" size={40} color="#FFF" />
      </TouchableOpacity>
      <Text style={styles.header}>AUCTION PROPERTY</Text>
    </View>
    <Text style={styles.subHeader}>
      75453 BANK AUCTION PROPERTIES IN INDIA
    </Text>
    <View style={styles.stepContainer}>
      {/* Dropdown Filters */}
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={propertyLocation1}
          onValueChange={(value) => setPropertyLocation1(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Location" value="" />
          <Picker.Item label="Mumbai" value="Mumbai" />
          <Picker.Item label="Delhi" value="Delhi" />
          <Picker.Item label="Bangalore" value="Bangalore" />
          {/* Add more locations as needed */}
        </Picker>

        <Picker
          selectedValue={propertyLocation2}
          onValueChange={(value) => setPropertyLocation2(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Property Type" value="" />
          <Picker.Item label="Residential" value="Residential" />
          <Picker.Item label="Commercial" value="Commercial" />
          <Picker.Item label="Industrial" value="Industrial" />
          {/* Add more property types as needed */}
        </Picker>

        <Picker
          selectedValue={budget}
          onValueChange={(value) => setBudget(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Budget" value="" />
          <Picker.Item label="₹10 Lakh - ₹20 Lakh" value="₹10 Lakh - ₹20 Lakh" />
          <Picker.Item label="₹20 Lakh - ₹50 Lakh" value="₹20 Lakh - ₹50 Lakh" />
          <Picker.Item label="₹50 Lakh - ₹1 Crore" value="₹50 Lakh - ₹1 Crore" />
          {/* Add more budget ranges as needed */}
        </Picker>
      </View>

      {/* Search Button */}
      <TouchableOpacity style={styles.searchButton} 
            onPress={handleSearch} >
            <Text style={styles.searchButtonText}>SEARCH</Text>
          </TouchableOpacity>

      {/* Auction List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.noResults}>No auction data available.</Text>
        }
      />
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  stepContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    flex: 1,
    marginTop:10,
    display: "flex",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginLeft:10,  
  },
  header: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Lato',
    marginLeft: 50
  },
  subHeader: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Lato',
    marginLeft: 20
  },
  filterContainer: {
    marginBottom: 10,
  },
  picker: {
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical: 5,
  },
  searchButton: {
    backgroundColor: '#1a73e8',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    fontFamily: 'Lato',
    width:200,
    alignSelf:'center',
    marginTop:10,
    marginBottom:10,
  },
  searchButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Lato',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
    elevation: 3,
    marginHorizontal: 10,
    marginTop :10,
  },
  bankName: {
    fontSize: 18,
    color: '#000',
    marginVertical: 5,
    fontFamily: 'Lato',
    fontWeight: '600',
  },
  bank: {
    fontSize: 16,
    color: '#000',
    marginVertical: 5,
    fontFamily: 'Lato',
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    fontWeight: '900',
    color: '#00A000',
    fontFamily: 'Lato',
  },
  details: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Lato',
    marginVertical: 5,
    fontWeight: '600',
  },
 
  list: {
    paddingBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal:20,
    marginTop: 20
},
  button: {
    backgroundColor: '#622CFD',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    fontFamily: 'Lato',
    width:200,
    alignSelf:'center',
    marginTop:10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Lato',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});

export default AuctionScreen;
