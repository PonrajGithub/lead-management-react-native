import React ,{useState } from 'react';
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

const AuctionScreen = ({  }: any) => {

const navigation: any = useNavigation();
const [propertyLocation1, setPropertyLocation1] = useState('');
  const [propertyLocation2, setPropertyLocation2] = useState('');
  const [budget, setBudget] = useState('');
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
      details: {
        type: 'Residential/Commercial/Industrial',
        category: 'Floor/Flat/House',
        size: '250 sq mtr',
        address: 'B-14, Rohini, Delhi',
        auctionDate: '12 December, 2024',
        emdDate: '10 December, 2024',
      },
    },
    {
        id: '2',
        title: 'Office in Pitam Pura, New Delhi',
        bank: 'Punjab National Bank',
        price: '₹ 99,24,00,000',
        date: '27 Jan 2025',
        area: '3224.50 Sq Ft',
        possession: 'Physical Possession',
        details: {
          type: 'Residential/Commercial/Industrial',
          category: 'Floor/Flat/House',
          size: '250 sq mtr',
          address: 'B-14, Rohini, Delhi',
          auctionDate: '12 December, 2024',
          emdDate: '10 December, 2024',
        },
      },
      {
        id: '3',
        title: 'Office in Pitam Pura, New Delhi',
        bank: 'Punjab National Bank',
        price: '₹ 15,24,00,000',
        date: '27 Jan 2025',
        area: '3224.50 Sq Ft',
        possession: 'Physical Possession',
        details: {
          type: 'Residential/Commercial/Industrial',
          category: 'Floor/Flat/House',
          size: '250 sq mtr',
          address: 'B-14, Rohini, Delhi',
          auctionDate: '12 December, 2024',
          emdDate: '10 December, 2024',
        },
      },
  ];
  
  if (!fontsLoaded) {
      return <AppLoading />;
    }
  const renderItem = ({ item }: any) => (
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
                  resizeMode="cover">

         <View style={styles.row}>
             <TouchableOpacity
                 onPress={() => navigation.navigate('DashboardScreen')} >
                 <Icon name="chevron-left" size={40} color="#FFF" />
            </TouchableOpacity>
                <Text style={styles.header}>AUCTION PROPERTY</Text>
               
         </View>  
         <Text style={styles.subHeader}>
                  75453 BANK AUCTION PROPERTIES IN INDIA
                </Text> 
        
                <View style={styles.stepContainer}>
        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          {/* Dropdowns for Filtering */}
          <RNPickerSelect
              onValueChange={(value) => setPropertyLocation1(value)}
              items={[
                { label: 'New York', value: 'new_york' },
                { label: 'Los Angeles', value: 'los_angeles' },
                { label: 'Chicago', value: 'chicago' },
              ]}
              placeholder={{ label: 'Select Property Location', value: null }}
              style={{
                ...pickerStyles,
                iconContainer: {
                  top: 12,
                  right: 10,
                },
              }}
              Icon={() => {
                return <Icon name="chevron-right" size={20} color="#000" />;
              }}
            >
          <TouchableOpacity style={styles.dropdownContainer}>
            <Text style={styles.dropdownText}>
              {propertyLocation1 || 'Property Location'}
            </Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
        </RNPickerSelect>

          <RNPickerSelect
            onValueChange={(value) => setPropertyLocation2(value)}
            items={[
              { label: 'Residential', value: 'Residential' },
              { label: 'Commercial', value: 'Commercial' },
              { label: 'Industrial', value: 'Industrial' },
            ]}

            placeholder={{ label: 'Select Property  type', value: null }}
            style={{
              ...pickerStyles,
              iconContainer: {
                top: 12,
                right: 10,
              },
            }}
            Icon={() => {
              return <Icon name="chevron-right" size={20} color="#000" />;
            }}
          >
            <TouchableOpacity style={styles.dropdownContainer}>
            <Text style={styles.dropdownText}>
                {propertyLocation2 || 'Property type'}
                </Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
          </RNPickerSelect>

          <RNPickerSelect
            onValueChange={(value) => setBudget(value)}
            items={[
              { label: '0 t0 50 Lakhs', value: '0 t0 50 Lakhs' },
              { label: '50 Lakhs to 2 Cr', value: '50 Lakhs to 2 Cr' },
              { label: '2 Cr to 5 Cr', value: '2 Cr to 5 Cr' },
              { label: '5 Cr to 25 Cr', value: '5 Cr to 25 Cr' },
              { label: '25 Cr to Above', value: '25 Cr to Above'}
            ]}
            placeholder={{ label: 'Select Budget', value: null }}
            style={{
              ...pickerStyles,
              iconContainer: {
                top: 12,
                right: 10,
              },
            }}
            Icon={() => {
              return <Icon name="chevron-right" size={20} color="#000" />;
            }}
          >
           <TouchableOpacity style={styles.dropdownContainer}>
           <Text style={styles.dropdownText}>
                {budget || 'Budget'}
                </Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
          </RNPickerSelect>

          {/* Search Button */}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() =>
              navigation.navigate('', {
                propertyLocation1,
                propertyLocation2,
                budget,
              })
            }
          >
            <Text style={styles.searchButtonText}>SEARCH</Text>
          </TouchableOpacity>
      {/* Auction List */}
      <FlatList
        data={auctionData}
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
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderWidth: 1,
  borderColor: '#DDD',
  borderRadius: 8,
  backgroundColor: '#FFF',
  marginHorizontal: 20,
  marginBottom: 15,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 5,
},
dropdownText: {
  fontSize: 16,
  color: '#000',
  fontFamily: 'Lato',
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
