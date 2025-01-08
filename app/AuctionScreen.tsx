import React from 'react';
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
import AppLoading from "expo-app-loading";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "expo-router";

const AuctionScreen = ({  }: any) => {

const navigation: any = useNavigation();

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
        id: '3',
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
        onPress={() => navigation.navigate('', { item })}
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
        
    <View style={styles.stepContainer}>
 <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        
      {/* Subheader */}
      <Text style={styles.subHeader}>
        75453 BANK AUCTION PROPERTIES IN INDIA
      </Text>
      {/* Select Location Button */}
      <TouchableOpacity style={styles.selectLocation}>
        <Text style={styles.selectLocationText}>Select Location</Text>
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
    fontSize: 26,
    fontWeight: '700',
    fontFamily: 'Lato',
    marginLeft:'10%'
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
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  subHeader: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Lato',
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
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Lato',
  },
  list: {
    paddingBottom: 20,
  },
});

export default AuctionScreen;
