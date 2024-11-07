import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Or any other icon library you prefer
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const data = [
  { id: '1', name: 'Intro', icon: 'battery' },
  { id: '2', name: 'Team', icon: 'account-group-outline' },
  { id: '3', name: 'Media', icon: 'lightbulb-outline' },
  { id: '4', name: 'Email', icon: 'email-outline' },
  { id: '5', name: 'DGNMS', icon: 'battery' },
  { id: '6', name: 'Privacy Policy', icon: 'shield-lock-outline' },
  { id: '7', name: 'Terms And Condition', icon: 'file-document-outline' },
  { id: '8', name: 'List', icon: 'clipboard-list-outline' },
];

const About = () => {

  const [fontsLoaded] = useFonts({
    'text': require('../assets/fonts/static/Rubik-Regular.ttf'),
    'heading': require('../assets/fonts/static/Rubik-Bold.ttf'), 
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const renderItem = ({ item }: { item: { id: string; name: string; icon: string } }) => (
    <View style={styles.gridItem}>
      <Icon name={item.icon} size={30} color="#0096FF" />
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>About</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={4} // Display items in 4 columns
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
    // backgroundColor: '#F5F5F5',
    borderRadius:30,
    // marginBottom:20,
  },
  header: {
    fontSize: 18,
    marginLeft:20,
    marginBottom:10,
    fontFamily:'heading',
    color:'#1e3a8a',
  },
  grid: {
    justifyContent: 'center',
  },
  gridItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  itemText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontFamily:'text',
  },
});

export default About;
