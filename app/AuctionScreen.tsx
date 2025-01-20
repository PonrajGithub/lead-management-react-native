import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useFonts } from "expo-font";
import RNPickerSelect from 'react-native-picker-select';
import AppLoading from "expo-app-loading";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "expo-router";
import AuctionDetailScreen from './AuctionDetailScreen';

const AuctionScreen = () => {
  const navigation = useNavigation();
  const [propertyLocation1, setPropertyLocation1] = useState('');
  const [propertyLocation2, setPropertyLocation2] = useState('');
  const [budget, setBudget] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  const auctionData = [
    {
      id: '1',
      title: 'Office in Pitam Pura, New Delhi',
      bank: 'Punjab National Bank',
      price: '₹ 6,24,00,000',
      date: '27 Jan 2025',
      area: '3224.50 Sq Ft',
      possession: 'Physical Possession',
      location: 'new_york',
      type: 'Commercial',
      budgetRange: '5 Cr to 25 Cr',
      details: {
        type: 'Residential/Commercial/Industrial',
        category: 'Floor/Flat/House',
        size: '250 sq mtr',
        address: 'B-14, Rohini, Delhi',
        auctionDate: '12 December, 2024',
        emdDate: '10 December, 2024',
        images: [
          "https://loanguru.in/wp-content/uploads/2025/01/image-1-scaled.jpg",
          "https://loanguru.in/wp-content/uploads/2025/01/image-1-scaled.jpg",
          "https://loanguru.in/wp-content/uploads/2025/01/image-1-scaled.jpg",
          "https://loanguru.in/wp-content/uploads/2025/01/image-1-scaled.jpg",
          "https://loanguru.in/wp-content/uploads/2025/01/image-1-scaled.jpg",
          "https://loanguru.in/wp-content/uploads/2025/01/image-1-scaled.jpg",
           
        ],
        gpsLocation: "https://maps.google.com/?q=123,Example+Street",
      },
    },
    {
      id: '2',
      title: 'Office in Rohini, Delhi',
      bank: 'Punjab National Bank',
      price: '₹ 99,24,00,000',
      date: '27 Jan 2025',
      area: '3224.50 Sq Ft',
      possession: 'Physical Possession',
      location: 'los_angeles',
      type: 'Residential',
      budgetRange: '25 Cr to Above',
      details: {
        type: 'Residential/Commercial/Industrial',
        category: 'Floor/Flat/House',
        size: '250 sq mtr',
        address: 'B-14, Rohini, Delhi',
        auctionDate: '12 December, 2024',
        emdDate: '10 December, 2024',
        images: [
          "https://loanguru.in/wp-content/uploads/2025/01/image-1-scaled.jpg",
          "https://loanguru.in/wp-content/uploads/2025/01/image-1-scaled.jpg",
          "https://loanguru.in/wp-content/uploads/2025/01/image-1-scaled.jpg",
          "https://loanguru.in/wp-content/uploads/2025/01/image-1-scaled.jpg",
          "https://loanguru.in/wp-content/uploads/2025/01/image-1-scaled.jpg",
          "https://loanguru.in/wp-content/uploads/2025/01/image-1-scaled.jpg",
           
        ],
        gpsLocation: "https://maps.google.com/?q=123,Example+Street",
      },
    },
    {
      id: '3',
      title: 'Industrial Space in Chicago',
      bank: 'Punjab National Bank',
      price: '₹ 15,24,00,000',
      date: '27 Jan 2025',
      area: '3224.50 Sq Ft',
      possession: 'Physical Possession',
      location: 'chicago',
      type: 'Industrial',
      budgetRange: '2 Cr to 5 Cr',
      details: {
        type: 'Residential/Commercial/Industrial',
        category: 'Floor/Flat/House',
        size: '250 sq mtr',
        address: 'B-14, Rohini, Delhi',
        auctionDate: '12 December, 2024',
        emdDate: '10 December, 2024',
        images: [
          "https://loanguru.in/wp-content/uploads/2025/01/image-1-scaled.jpg",
          "https://loanguru.in/wp-content/uploads/2025/01/image-1-scaled.jpg",
          "https://loanguru.in/wp-content/uploads/2025/01/image-1-scaled.jpg",
          "https://loanguru.in/wp-content/uploads/2025/01/image-1-scaled.jpg",
          "https://loanguru.in/wp-content/uploads/2025/01/image-1-scaled.jpg",
          "https://loanguru.in/wp-content/uploads/2025/01/image-1-scaled.jpg",
           
        ],
        gpsLocation: "https://maps.google.com/?q=123,Example+Street",
      },
    },
  ];

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleSearch = () => {
    const filtered = auctionData.filter(item => {
      const matchesLocation =
        !propertyLocation1 || item.location === propertyLocation1;
      const matchesType =
        !propertyLocation2 || item.type === propertyLocation2;
      const matchesBudget =
        !budget || item.budgetRange === budget;

      return matchesLocation && matchesType && matchesBudget;
    });

    setFilteredData(filtered);
  };

  const renderItem = ({ item }:any) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.bank}>{item.bank}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.details}>
        {item.date} | {item.area} | {item.possession}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AuctionDetailScreen', { item })}
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={40} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.header}>AUCTION PROPERTY</Text>
      </View>
      <Text style={styles.subHeader}>
        75453 BANK AUCTION PROPERTIES IN INDIA
      </Text>

      <View style={styles.stepContainer}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
      <View style={styles.dropdownContainer}>
          <View style={styles.dropdownWrapper}>
            <RNPickerSelect
              onValueChange={setPropertyLocation1}
              items={[
                { label: 'New York', value: 'new_york' },
                { label: 'Los Angeles', value: 'los_angeles' },
                { label: 'Chicago', value: 'chicago' },
              ]}
              placeholder={{ label: 'Select Property Location', value: null }}
              style={{
                inputIOS: styles.dropdown,
                inputAndroid: styles.dropdown,
                iconContainer: styles.iconContainer,
              }}
            />
          </View>
          <View style={styles.dropdownWrapper}>
            <RNPickerSelect
              onValueChange={setPropertyLocation2}
              items={[
                { label: 'Residential', value: 'Residential' },
                { label: 'Commercial', value: 'Commercial' },
                { label: 'Industrial', value: 'Industrial' },
              ]}
              placeholder={{ label: 'Select Property Type', value: null }}
              style={{
                inputIOS: styles.dropdown,
                inputAndroid: styles.dropdown,
                iconContainer: styles.iconContainer,
              }}
            />
          </View>
          <View style={styles.dropdownWrapper}>
            <RNPickerSelect
              onValueChange={setBudget}
              items={[
                { label: '0 to 50 Lakhs', value: '0 to 50 Lakhs' },
                { label: '50 Lakhs to 2 Cr', value: '50 Lakhs to 2 Cr' },
                { label: '2 Cr to 5 Cr', value: '2 Cr to 5 Cr' },
                { label: '5 Cr to 25 Cr', value: '5 Cr to 25 Cr' },
                { label: '25 Cr and Above', value: '25 Cr and Above' },
              ]}
              placeholder={{ label: 'Select Budget', value: null }}
              style={{
                inputIOS: styles.dropdown,
                inputAndroid: styles.dropdown,
                iconContainer: styles.iconContainer,
              }}
            />
          </View>
        </View>
          <TouchableOpacity style={styles.searchButton} 
            onPress={handleSearch} >
            <Text style={styles.searchButtonText}>SEARCH</Text>
          </TouchableOpacity>
          <FlatList
            data={filteredData.length > 0 ? filteredData : auctionData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    stepContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    flex: 1,
    marginTop:'5%',
    display: "flex",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    marginLeft:'3%',
  },
  header: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Lato',
    marginLeft:'13%'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal:20,
    marginTop: '5%',
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
  searchButton: {
    backgroundColor: '#f2f0ef',
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
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  subHeader: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Lato',
    marginLeft:'10%'
  },
  selectLocation: {
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 5,
    borderColor: '#DDD',
    borderWidth: 1,
    backgroundColor: '#FFF',
    marginBottom: 15,
    alignItems: 'center',
  },
  selectLocationText: {
    fontSize: 20,
    color: '#000',
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
  title: {
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
  dropdownContainer: {
    marginTop: 10,
  },
  dropdownWrapper: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  dropdown: {
    fontSize: 16,
    paddingVertical: 12,
    color: '#000',
    fontWeight:'black',
    fontFamily:'Lato',
    paddingHorizontal: 8,
  },
  iconContainer: {
    top: 14,
    right: 10,
  },
});

const pickerStyles = {
  inputAndroid: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Lato',
    padding: 10,
  },
  inputIOS: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Lato',
    padding: 10,
  },
};

export default AuctionScreen;
