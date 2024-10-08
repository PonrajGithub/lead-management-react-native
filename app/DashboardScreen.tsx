import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from 'expo-router';

const DashboardScreen = () => {
    const navigation: any = useNavigation();
  return (
    <ScrollView >
      {/* Header Section */}
      <View style={styles.header}>
        <Icon name="person-outline" type="material" color="#fff" size={30} />
        <View style={styles.userInfo}>
          <Image
            source={require('../assets/images/flag.png')}
            style={styles.flag}
          />
          <Text style={styles.username}>User Name</Text>
        </View>
        <Icon name="circle-question" type="material" color="#fff" size={30} />
      </View>

      {/* Banner Section */}
      <Image
        source={require('../assets/images/banner.jpg')} 
        style={styles.banner}
      />

      {/* Loan Section */}
<View style={styles.sectionloan}>
  <Text style={styles.sectionTitle}>Loan</Text>
  <View style={styles.row}>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="account-balance" type="material" color="#fff" size={30} />
        <Text style={styles.iconLabel}>Unsecured</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="account-balance" type="material" color="#fff" size={30} />
        <Text style={styles.iconLabel}>Secured</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="account-balance" type="material" color="#fff" size={30} />
        <Text style={styles.iconLabel}>SME's</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="account-balance" type="material" color="#fff" size={30} />
        <Text style={styles.iconLabel}>OD/CC</Text>
      </TouchableOpacity>
  </View>

  <View style={styles.row}>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="account-balance" type="material" color="#fff" size={30} />
        <Text style={styles.iconLabel}>Project</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="account-balance" type="material" color="#fff" size={30} />
        <Text style={styles.iconLabel}>Education</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="account-balance" type="material" color="#fff" size={30} />
        <Text style={styles.iconLabel}>Property</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="account-balance" type="material" color="#fff" size={30} />
        <Text style={styles.iconLabel}>Car</Text>
      </TouchableOpacity>
  </View>
</View>


<View style={styles.sectionlink}>
  <Text style={styles.sectionTitle}>Quick Link</Text>
  <View style={styles.row}>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="account-balance" type="material" color="#fff" size={30} />
        <Text style={styles.iconLabel}>Unsecured</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="account-balance" type="material" color="#fff" size={30} />
        <Text style={styles.iconLabel}>Secured</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="account-balance" type="material" color="#fff" size={30} />
        <Text style={styles.iconLabel}>SME's</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="account-balance" type="material" color="#fff" size={30} />
        <Text style={styles.iconLabel}>OD/CC</Text>
      </TouchableOpacity>
  </View>

  <View style={styles.row}>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="account-balance" type="material" color="#fff" size={30} />
        <Text style={styles.iconLabel}>Project</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="account-balance" type="material" color="#fff" size={30} />
        <Text style={styles.iconLabel}>Education</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="account-balance" type="material" color="#fff" size={30} />
        <Text style={styles.iconLabel}>Property</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="account-balance" type="material" color="#fff" size={30} />
        <Text style={styles.iconLabel}>Car</Text>
      </TouchableOpacity>
  </View>
</View>
    <View style={styles.member}>
    <Text>Total Members:4212</Text>
    </View>

    <View style ={styles.job}>
      <View style ={styles.row}>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="account-balance" type="material" color="#fff" size={30} />
        <Text style={styles.iconLabel}>Car</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="account-balance" type="material" color="#fff" size={30} />
        <Text style={styles.iconLabel}>Car</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="account-balance" type="material" color="#fff" size={30} />
        <Text style={styles.iconLabel}>Car</Text>
      </TouchableOpacity>
      </View>

    </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6C2EB9',
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 50, // Set a fixed height
    marginTop:50,
    zIndex: 1, // Bring header to front
  },  
  userInfo: {
    flexDirection: 'row',
    // paddingRight:160,
  },
  flag: {
    width: 24,
    height: 24,
    borderRadius: 12,
    },
  username: {
    color: '#fff',
    fontSize: 16,
  },
  banner: {
    width: '100%',
    height: 150,
    marginVertical:15,
  },
  sectionloan: {
    padding: 10,
    height:'25%',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius:15,
    backgroundColor:'#fff',
  },
  sectionlink: {
    marginTop:10,
    marginBottom:10,
    padding: 10,
    height:'25%',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius:15,
    backgroundColor:'#fff',
  },
  job:{
    padding: 10,
    height:'20%',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius:15,
    backgroundColor:'#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: '16%',
    height: '40%',  
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#6A1B9A',
    borderRadius: 10,
    marginVertical: 10,
  },
  iconLabel: {
    marginTop: 10,
    color: 'black',
  },
  member:{
    marginBottom:10,
    width:'100%',
    height:40,
    backgroundColor:'#3e97c9',
  }
});

export default DashboardScreen;
