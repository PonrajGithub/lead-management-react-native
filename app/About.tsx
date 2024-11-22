import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Using MaterialCommunityIcons
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const data = [
  { id: '1', name: 'Intro', icon: 'certificate-outline' },
  { id: '2', name: 'Team', icon: 'account-group-outline' },
  { id: '3', name: 'Media', icon: 'image-outline' },
  { id: '4', name: 'Email', icon: 'email-outline' },
  { id: '5', name: 'DGNMES', icon: 'cube-outline' },
  { id: '6', name: 'Privacy Policy', icon: 'shield-lock-outline' },
  { id: '7', name: 'T&C', icon: 'file-document-outline' },
  { id: '8', name: 'List', icon: 'format-list-bulleted' },
];

const About = () => {
  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const renderItem = ({ item }: { item: { id: string; name: string; icon: string } }) => (
    <TouchableOpacity style={styles.gridItem}>
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={24} color="#622CFD" />
      </View>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>KNOW MORE ABOUT US</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
        contentContainerStyle={styles.grid}
        keyboardShouldPersistTaps="handled" // Ensures taps work properly
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontFamily: 'Lato',
    fontSize: 14,
    margin: 20,
    color: '#1E1E1E',
    fontWeight: '900',
    textAlign: 'left',
    lineHeight: 14.4,
    letterSpacing: 2,
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  gridItem: {
    alignItems: 'center',
    marginBottom: 20,
    width: '24%',
  },
  iconContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderColor: '#E3E2E2',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    margin: 10,
  },
  itemText: {
    fontFamily: 'Lato',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    color: '#1E1E1E',
  },
});

export default About;
