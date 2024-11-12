import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Using MaterialCommunityIcons
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const data = [
  { id: '1', name: 'Intro', icon: 'certificate-outline' },
  { id: '2', name: 'Team', icon: 'account-group-outline' },
  { id: '3', name: 'Media', icon: 'image-outline' },
  { id: '4', name: 'Email', icon: 'email-outline' },
  { id: '5', name: 'DGNMS', icon: 'cube-outline' },
  { id: '6', name: 'Privacy Policy', icon: 'shield-lock-outline' },
  { id: '7', name: 'T&C', icon: 'file-document-outline' },
  { id: '8', name: 'List', icon: 'format-list-bulleted' },
];

const About = () => {
  const [fontsLoaded] = useFonts({
    'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const renderItem = ({ item }: { item: { id: string; name: string; icon: string } }) => (
    <View style={styles.gridItem}>
      <Icon name={item.icon} size={30} color="#622CFD" />
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>KNOW MORE ABOUT US</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={4} // 4 columns
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    fontFamily: 'Lato',
    fontSize: 18,
    marginBottom: 20,
    color: '#1E1E1E',
    fontWeight: '600',
    textAlign: 'left',
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderColor: '#E0E0E0', // Light gray border
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    margin: 10,
  },
  itemText: {
    fontFamily: 'Lato',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '600',
    color: "#1E1E1E",
  },
});

export default About;
