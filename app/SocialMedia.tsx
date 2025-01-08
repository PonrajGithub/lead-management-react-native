import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { FontAwesome } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';

const SocialMedia = () => {
  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const socialMediaLinks = [
    { name: 'Facebook', link: 'https://www.facebook.com/msloanguru', icon: 'facebook', color: '#4267B2' },
    { name: 'X', link: 'https://x.com/msloanguru', icon: 'twitter', color: '#1DA1F2' },
    { name: 'YouTube', link: 'https://www.youtube.com/@loanguru9475', icon: 'youtube', color: '#FF0000' },
    { name: 'Instagram', link: 'https://www.instagram.com/loanguru.in/', icon: 'instagram', color:'#E4405F'   },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => Linking.openURL(item.link)}
    >
      <View style={styles.iconContainer}>
        <FontAwesome name={item.icon} size={40} color={item.color} />
      </View>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SOCIAL MEDIA</Text>
      <FlatList
        contentContainerStyle={styles.grid}
        data={socialMediaLinks}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        numColumns={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: '#f2f0ef',
  },
  header: {
    fontFamily: 'Lato',
    fontSize: 14,
    marginBottom: 20,
    color: '#1E1E1E',
    fontWeight: '900',
    textAlign: 'left',
    lineHeight: 14.4,
    letterSpacing: 2,
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem: {
    alignItems: 'center',
    // marginBottom: 20,
    width: '25%',
  },
  iconContainer: {
    backgroundColor: '#f2f0ef',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#f2f0ef',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    margin: 5,
  },
  itemText: {
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 18,
    color: '#1E1E1E',
    textAlign: 'center',
  },
});

export default SocialMedia;
