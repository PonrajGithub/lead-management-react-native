import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from 'expo-router';
// import * as Font from 'expo-font';
// import AppLoading from 'expo-app-loading';

const FirstScreen = ({ }: any) => {
    const navigation: any = useNavigation();
    // const [fontsLoaded, setFontsLoaded] = useState(false);

    // const loadFonts = async () => {
    //   await Font.loadAsync({
    //     'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'), // make sure to download the font and add it to your assets folder
    //     'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
    //   });
    //   setFontsLoaded(true);
    // };
  
    // useEffect(() => {
    //   loadFonts();
    // }, []);
  
    // if (!fontsLoaded) {
    //   return <AppLoading />;
    // }
  return (
    <View style={styles.container}>
      {/* Status bar and header */}
      <StatusBar backgroundColor="#6A1B9B" barStyle="light-content" />

      {/* Image */}
      <Image
        source={require('../assets/images/first.jpg')} // Replace with your image path
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title and description */}
      <Text style={styles.title}>Find the Loan You Need</Text>
      <Text style={styles.description}>
        Easily browse through multiple loan options, tailored to your needs. Fast approvals, flexible terms.
      </Text>

      {/* Pagination and buttons */}
      <View style={styles.footer}>
      {/* Pagination dots */}
      <View style={styles.pagination}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Next button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('SecondScreen')}
      >
        <Text style={styles.nextButtonText}>NEXT</Text>
      </TouchableOpacity>

      {/* Skip option */}
      <TouchableOpacity onPress={() => 
        navigation.reset({
          index: 0,
          routes: [{ name: 'WelcomeScreen' }],
        })}>
        <Text style={styles.skipText}>SKIP</Text>
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
  header: {
    backgroundColor: '#6A1B9B', // Purple background for header
  },
  image: {
    width: '80%',
    height: 250,
    alignSelf: 'center',
    marginTop: 200,
  },
  title: {
    fontSize: 24, 
    fontWeight: '600', 
    // fontFamily: 'Helvetica', 
    textAlign: 'center',
    marginTop: 60,
    lineHeight: 32, 
  },
  description: {
    textAlign: 'left',
    fontSize: 16,
    // fontFamily: 'Arial', 
    color: '#555', 
    marginHorizontal: 40,
    marginTop: 10,
    lineHeight: 24, 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 30,
    paddingHorizontal: 50,
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
    width: 16,
    height: 9,
    borderRadius: 4,
    backgroundColor: 'black', // Active dot color
  },
  nextButton: {
    backgroundColor: '#007AFF', // Button blue color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
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
  skipText: {
    color: '#555', // Grey color for skip text
    fontSize: 16,
  },
});


export default FirstScreen;
