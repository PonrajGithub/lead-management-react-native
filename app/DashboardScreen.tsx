import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from 'expo-router';

const DashboardScreen = () => {
    const navigation: any = useNavigation();
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Icon name="person-outline" type="material" color="#fff" size={30} />
        <View style={styles.userInfo}>
          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png' }}
            style={styles.flag}
          />
          <Text style={styles.username}>User Name</Text>
        </View>
        <Icon name="wifi" type="material" color="#fff" size={30} />
      </View>

      {/* Banner Section */}
      <Image
        source={{ uri: 'https://via.placeholder.com/150x100' }}
        style={styles.banner}
      />

      {/* Loan Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loan</Text>
        <View style={styles.row}>
          {['Unsecured', 'Secured', 'SME\'s', 'OD/CC', 'Project', 'Education', 'Property', 'Car'].map((item, index) => (
            <TouchableOpacity key={index} style={styles.iconButton}>
              <Icon name="account-balance" type="material" color="#fff" size={30} />
              <Text style={styles.iconLabel}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Link Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Link</Text>
        <View style={styles.row}>
          {['Calculator', 'Job', 'Women Empowerment', 'Link', 'Link', 'Link'].map((item, index) => (
            <TouchableOpacity key={index} style={styles.iconButton}>
              <Icon name="link" type="material" color="#fff" size={30} />
              <Text style={styles.iconLabel}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6200EE',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
  },
  username: {
    color: '#fff',
    fontSize: 16,
  },
  banner: {
    width: '100%',
    height: 150,
    marginVertical: 10,
  },
  section: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconButton: {
    backgroundColor: '#6200EE',
    borderRadius: 10,
    width: '30%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconLabel: {
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
    fontSize: 12,
  },
});

export default DashboardScreen;
