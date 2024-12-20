import React,{useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image, ImageBackground } from 'react-native';
import { useNavigation } from 'expo-router';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ThirdScreen = ({ }: any) => {
    const navigation: any = useNavigation();
    const [fontsLoaded] = useFonts({
      'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'), 
    });
    // useEffect(() => {
    //   const checkFirstLaunch = async () => {
    //     try {
    //       const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
    //       if (!isFirstLaunch) {
    //         // If this is the first launch, set the flag in AsyncStorage
    //         await AsyncStorage.setItem('isFirstLaunch', 'false');
    //       } else {
    //         // If not the first launch, redirect to WelcomeScreen
    //         navigation.reset({
    //           index: 0,
    //           routes: [{ name: 'WelcomeScreen' }],
    //         });
    //       }
    //     } catch (error) {
    //       console.log('Error checking first launch:', error);
    //     }
    //   };
  
    //   checkFirstLaunch();
    // }, []);
 
    
    if (!fontsLoaded) {
      return null; 
    }

    

  return (
    <View style={styles.container}>
     <View style={styles.backgroundWrapper}>
        <ImageBackground 
          source={require('../assets/images/3.png')} 
          style={styles.background}
          resizeMode="cover"
        >
        </ImageBackground>
      </View>
      {/* Title and description */}
      <Text style={styles.title}>Get Funds Fast</Text>
      <Text style={styles.description}>
        Receive the funds directly into your{"\n"}
        account. No hidden fees,just {"\n"}
        straightforward solutions.
      </Text>

      {/* Pagination and buttons */}
      <View style={styles.footer}>
      {/* Pagination dots */}
      <View style={styles.pagination}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
      </View>

      {/* Next button */}
      <TouchableOpacity
        style={styles.nextButton}
        // onPress={() => navigation.navigate('WelcomeScreen')}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'WelcomeScreen' }],
          })}
          >
            <Icon name="chevron-right" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundWrapper: {
    height: '55%',
    width:'100%',
    overflow: 'hidden',
  },
  background: {
    flex: 1, // This allows the image to take the full space of the wrapper
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  title: {
    fontSize: 25,
    fontWeight:'900',
    fontFamily: 'Lato',
    textAlign: 'center',
    lineHeight: 35.25,
    marginTop: 30,
    color:'#001533',
  },
  description: {
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'Lato',
    marginTop: 15,
    color:'#001533',
    lineHeight: 25.5,
    fontWeight: '300',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: '10%',
    paddingHorizontal: 40,
    backgroundColor: '#fff',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 17,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#622CFD',
  },
  nextButton: {
    backgroundColor: '#622CFD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ThirdScreen;
