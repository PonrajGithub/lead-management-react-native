import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useNavigation } from 'expo-router';


const Referral = () => {

  const navigation: any = useNavigation();

  const redirectToCreateAccount = () => {
    navigation.navigate('ReferralPartner');
  };

  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.box}>
         <Text style={styles.text}>
                 Referral Partner : {' '}
                    <Text style={styles.link} onPress={redirectToCreateAccount}>
                    Activate
            </Text></Text>
        <Text style={styles.separator}>|</Text>
        <Text style={styles.text}>
          ID : <Text style={styles.id}>_ _ _ _</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,

  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b3e7ff', 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontFamily:'Lato',
    fontWeight: '700',
  },
  link: {
    color: '#0000FF',
    fontSize: 16,
    fontFamily:'Lato',
    fontWeight: '900',
  },
  separator: {
    marginHorizontal: 30,
    color: '#000',
    fontSize: 20,
  },
  id: {
    fontWeight: '700',
    color: '#000',
    fontFamily:'Lato',
  },
});

export default Referral;
