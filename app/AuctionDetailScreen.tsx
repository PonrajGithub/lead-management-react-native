import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AuctionDetailScreen = ({ route }: any) => {
  const navigation = useNavigation();
  const { item } = route.params; // Fixed: Destructure route.params

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>AUCTION PROPERTY</Text>
      </View>

      {/* Property Details */}
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.bank}>{item.bank}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.details}>
          {item.date} | {item.area} | {item.possession}
        </Text>
        <View style={styles.divider} />
        <Text style={styles.info}>Property type: {item.details.type}</Text>
        <Text style={styles.info}>Category: {item.details.category}</Text>
        <Text style={styles.info}>Property Size: {item.details.size}</Text>
        <Text style={styles.info}>Address: {item.details.address}</Text>
        <Text style={styles.info}>Possession: {item.possession}</Text>
        <Text style={styles.info}>Auction date: {item.details.auctionDate}</Text>
        <Text style={styles.info}>EMD date: {item.details.emdDate}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>QUERY NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#0047FF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    margin: 20,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bank: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00A000',
    marginVertical: 10,
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#DDD',
    marginVertical: 10,
  },
  info: {
    fontSize: 14,
    marginVertical: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#0047FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AuctionDetailScreen;
