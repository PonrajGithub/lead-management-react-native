import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView,TouchableOpacity, Image } from 'react-native';
import { useNavigation } from 'expo-router';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const CongratsScreen = () =>  {
    const navigation: any = useNavigation();

    const [fontsLoaded] = useFonts({
      'Lato': require('../assets/fonts/static/Rubik-Regular.ttf'),
    });
    const handleDone = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'DashboardScreen' }],
    });
    };
   
  // useEffect(() => {
  //   // Navigate to Dashboard after 10 seconds
  //   const timer = setTimeout(() => {
  //     navigation.navigate('LoginScreen');
  //   }, 3000); 

  //   // Clean up the timer on unmount
  //   return () => clearTimeout(timer);
  // }, [navigation]);
  
  // if (!fontsLoaded) {
  //   return null; // Return null for the loading state to avoid re-render issues
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

      <TouchableOpacity onPress={() => navigation.navigate('WelcomeScreen')}>
    <Icon style={styles.icon} name="chevron-left" size={50} color="#000" />
  </TouchableOpacity>

        {/* Checkmark Icon */}
        <Image 
          style={styles.image} 
          source={require('../assets/images/tik.png')}
        />
        
        {/* Heading */}
        <Text style={styles.heading}>Congratulations! {"\n"} You're verified</Text>
        
        {/* Description */}
        <Text style={styles.description}>
          You have been verified your information with {"\n"} us.Let's make transactions!
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleDone} >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#FFFFFF'
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    marginRight:'90%',
    marginBottom:'60%',
  },
  image: {
   alignItems:'center',
   marginBottom:'30%', 
  },
  heading: {
    fontSize: 40,
    fontWeight: '700',
    marginBottom: 15,
    color: '#1E1E1E',
    lineHeight:48,
    textAlign: 'center',
    fontFamily:'Lato',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#9C9C9C',
    lineHeight: 19.2,
    fontFamily:'Lato',
    fontWeight:'600',
  },
  button: {
    backgroundColor: '#622CFD',
    paddingVertical: 15,
    borderRadius: 10,
    width:'85%',
    alignItems: 'center',
    marginTop: '15%',
    marginBottom:'15%',
  },
  buttonText: {
    color: '#F5F5F5',
    fontSize: 20,
    lineHeight:24,
    fontWeight: '700',
    fontFamily: 'Lato',
  },
});

export default CongratsScreen;
