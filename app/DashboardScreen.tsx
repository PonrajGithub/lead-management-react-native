import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Loan from './Loan';
import QuickLink from './QuickLink';
import About from './About';
import Job from './Job';
import Services from './Services';
import Help from './Help';
import Footer from './Footer';
import SocialMedia from './SocialMedia';
import Sales from './sales';

interface Banner {
  image: string;
  link: string;
  client_name: string;
}

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=v9e0qghjn8lfhdi879h079bgtg");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };

    fetch("https://loanguru.in/wp-json/custom/v1/banners", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setBanners(result);
      })
      .catch((error) => console.error('Error fetching banners:', error));
  }, []);

  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [banners]);

  const handleBannerPress = (link: string) => {
    // Open the link in the browser or a web view
    Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
      <Header/>
      <ScrollView style={styles.content}>
        <ImageBackground
          source={require('../assets/images/dashboard.jpg')}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.bannerContainer}>
            {banners.length > 0 && (
              <TouchableOpacity onPress={() => handleBannerPress(banners[currentImageIndex].link)}>
                <Image
                  source={{ uri: banners[currentImageIndex].image }}
                  style={styles.bannerImage}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.stepOneContainer}>
            <Loan />
            <QuickLink />
            <Job />
            <About />
            <Services />
            <Help />
            <Sales />
            <SocialMedia />
          </View>
        </ImageBackground>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  bannerContainer: {
    padding: 10,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 20,
  },
  stepOneContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'visible',
  },
});

export default DashboardScreen;
