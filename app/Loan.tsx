import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Header from './Header';
import Footer from './Footer';
import UnsecuredIcon from '../assets/images/icon/unsecurity.png';
import SecuredIcon from '../assets/images/icon/security.png';
import SMEIcon from '../assets/images/icon/sme.png';
import ODCCIcon from '../assets/images/icon/odcc.png';
import ProjectIcon from '../assets/images/icon/project.png';
import EducationIcon from '../assets/images/icon/education.png';
import WebViewComponent from '@/components/webView';
import { useNavigation } from 'expo-router';

const data = [
  { id: '1', title: 'Unsecured\nLoan', link: 'https://loanguru.in/best-unsecured-business-and-personal-loan-company-in-delhi-ncr/', icon: UnsecuredIcon },
  { id: '2', title: 'Secured\nLoan', link: 'https://loanguru.in/delhis-best-secured-loan-provider-company-for-business-home-and-personal-loans/', icon: SecuredIcon },
  { id: '3', title: 'SMEs/MSMEs\nLoan', link: 'https://loanguru.in/best-msme-loan-provider-company-in-delhi-for-new-business/', icon: SMEIcon },
  { id: '4', title: 'OD/CC\nLimit', link: 'https://loanguru.in/get-an-instant-overdraft-loan-from-delhis-best-od-loan-provider-company/', icon: ODCCIcon },
  { id: '5', title: 'Project\nLoan', link: 'https://loanguru.in/the-best-project-loan-service-provider-company-in-delhi-and-ncr/', icon: ProjectIcon },
  { id: '6', title: 'Education\nLoan', link: 'https://loanguru.in/delhis-best-student-loan-service-provider-company/', icon: EducationIcon }
];

const Loan: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLink, setSelectedLink] = useState('');
  const navigation: any = useNavigation();

  const [fontsLoaded] = useFonts({
    'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handlePress = (link: string) => {
    setSelectedLink(link);
    setModalVisible(true);
  };

  const hideHeaderFooter = `
  const hideElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.style.display = 'none';
    }
  };
  hideElement('header');
  hideElement('footer');
  hideElement('.mobile-app-call-to-action');
  hideElement('.mobile-app-types-of-loan');
  hideElement('#weglot-switcher-1');
  hideElement('.cnb-action.cnb-icon-type-font');
`;

  const renderItemRow1 = ({ item }: { item: { id: string; title: string; link: string; icon: any } }) => (
    <TouchableOpacity key={item.id} onPress={() => navigation.navigate('WebViewScreen', { uri: item.link })}>
      <View style={styles.itemContainerRow1}>
      <View style={styles.iconContainer1}>
          <Image source={item.icon} style={styles.icon} />
        </View>
        <Text style={styles.titleRow1}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItemRow2 = ({ item }: { item: { id: string; title: string; link: string; icon: any } }) => (
    <TouchableOpacity key={item.id} onPress={() => navigation.navigate('WebViewScreen', { uri: item.link })}>
      <View style={styles.itemContainerRow2}>
      <View style={styles.iconContainer}>
          <Image source={item.icon} style={styles.icon} />
        </View>
        <Text style={styles.titleRow2}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>LOAN</Text>
      <View style={styles.row}>
        {data.slice(0, 2).map(item => renderItemRow1({ item }))}
      </View>
      <View style={styles.row}>
        {data.slice(2, 6).map(item => renderItemRow2({ item }))}
      </View>
      {/* <WebView
          source={{ uri: selectedLink }}
          style={styles.webView}
          injectedJavaScript={hideHeaderFooter}
          onNavigationStateChange={(navState) => {
            if (!navState.loading && !navState.url.startsWith('https://loanguru.in')) {
              setModalVisible(false);
            }
          }}
        /> */}
        {/* <WebViewComponent uri={selectedLink}/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contain:{
    flex:1
  },
  webView:{
    flex:1
  },
  heading: {
    fontFamily: 'Lato',
    fontSize: 14,
    marginBottom: 20,
    color: '#1E1E1E',
    fontWeight: '900',
    marginLeft:15,
    lineHeight:14.4,
    letterSpacing:2,
    marginTop:15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  itemContainerRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderColor: '#E3E2E2', 
    borderWidth: 1,
    justifyContent: 'center',
    width: 180,
    height: 60,
  },
  itemContainerRow2: {
    alignItems: 'center',
    margin: 10,
  },
  iconContainer1: {
    backgroundColor: '#E7F4FF',
    padding: 10,
    borderRadius: 15,
    height:44,
    width:44, 
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  iconContainer: {
    backgroundColor: '#E7F4FF',
    padding: 10,
    borderRadius: 15,
    height:44,
    width:44,  
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:5,
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  titleRow1: {
    fontFamily:'Lato',
    fontSize: 18,
    marginLeft: 10,
    fontWeight:'600',
    lineHeight:16.8,
    color:"#1E1E1E",
  },
  titleRow2: {
    fontFamily:'Lato',
    fontSize: 16,
    textAlign: 'center',
    fontWeight:'600',
    lineHeight:16.8,
    color:"#1E1E1E",
  },
 
});

export default Loan;