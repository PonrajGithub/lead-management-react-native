import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';

const DashboardScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ImageBackground
        source={require('../assets/images/index.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
      <View style={styles.header}>
      <Image
          source={require('../assets/images/loan.png')} // Replace with your banner image URI
          style={styles.image}
           resizeMode="contain"
        />
        <View style={styles.profileIcon}>
          <Text style={styles.profileText}>A</Text>
        </View>
       
      </View>

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image
          source={require('../assets/images/Group.png')} // Replace with your banner image URI
          style={styles.bannerImage}
        />
      </View>

      {/* Loan Section */}
      <View style={styles.sectionContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loan</Text>
        <View style={styles.row}>
          <Button label="Unsecured Loan" />
          <Button label="Secured Loan" />
        </View>
        <View style={styles.row}>
          <Button label="SME's" />
          <Button label="OD/CC" />
          <Button label="Project" />
          <Button label="Education" />
        </View>
        <Text style={styles.totalMembers}>Total Members: 5327</Text>
      </View>

      {/* Quick Links Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <View style={styles.row}>
          <Button label="Insurance" />
          <Button label="Job" />
          <Button label="EMI Calculator" />
          <Button label="Query" />
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.row}>
          <Button label="Job Vacancies" />
          <Button label="Women Empower" />
          <Button label="Whatsapp" />
        </View>
      </View>

      {/* About Us Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Know More About Us</Text>
        <View style={styles.row}>
          <Button label="Intro" />
          <Button label="Team" />
          <Button label="Media" />
          <Button label="Email" />
        </View>
        <View style={styles.row}>
          <Button label="DGNMS" />
          <Button label="Privacy Policy" />
          <Button label="T&C" />
          <Button label="List" />
        </View>
      </View>
      </View>
      </ImageBackground>
    </ScrollView>
  );
};

const Button = ({ label } : any ) => (
  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f5f5f5',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop:'8%',
  },
 image:{
height:100,
width:100,
 },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 18,
    color: '#6200EE',
    fontWeight: 'bold',
  },
  bannerContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  sectionContainer: {
    flex: 1,
    // marginBottom:'-100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50, 
    borderTopRightRadius: 50,
    padding: 20,
    marginTop:'5%',
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    color: '#6200EE',
    fontWeight: 'bold',
  },
  totalMembers: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
});

export default DashboardScreen;
