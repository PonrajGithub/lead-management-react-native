import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import {useRoute , RouteProp } from '@react-navigation/native';
import { useFonts } from "expo-font";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppLoading from "expo-app-loading";
import { useNavigation } from "expo-router";


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

  if (!fontsLoaded) {
    return <AppLoading />;
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
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.bank}>{item.bank}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.details}>
              {item.date} | {item.area} | {item.possession}
            </Text>
            <View style={styles.divider} />
            <Text style={styles.info}>Property type : </Text>
            <Text style={styles.item}>{item.details.type}</Text>
            <Text style={styles.info}>Category: </Text>
            <Text style={styles.item}>{item.details.category}</Text>
            <Text style={styles.info}>Property Size: </Text>
            <Text style={styles.item}>{item.details.size}</Text>
            <Text style={styles.info}>Address: </Text>
            <Text style={styles.item}>{item.details.address}</Text>
            <Text style={styles.info}>Possession: </Text>
            <Text style={styles.item}>{item.possession}</Text>
            <Text style={styles.info}>Auction date: </Text>
            <Text style={styles.item}>{item.details.auctionDate}</Text>
            <Text style={styles.info}>EMD date: </Text>
            <Text style={styles.item}>{item.details.emdDate}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>QUERY NOW</Text>
            </TouchableOpacity>
          </View>
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
  subHeader: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Lato',
    },
    buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal:20,
    marginTop: '5%',
    },
    content: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
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
    divider: {
      height: 1,
      backgroundColor: '#DDD',
      marginVertical: 10,
    },
    info: {
      fontSize: 16,
      color: '#000',
      marginVertical: 10,
      fontFamily: 'Lato',
      fontWeight: '700',
    },
    item: {
      fontSize: 16,
      color: '#000',
      fontFamily: 'Lato',
      fontWeight: '600',
      paddingBottom:10,
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
  });

export default AuctionDetailScreen;
