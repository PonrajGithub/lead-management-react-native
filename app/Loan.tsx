import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useNavigation } from 'expo-router';

import UnsecuredIcon from '../assets/images/icon/unsecurity.png';
import SecuredIcon from '../assets/images/icon/security.png';
import SMEIcon from '../assets/images/icon/sme.png';
import ODCCIcon from '../assets/images/icon/odcc.png';
import ProjectIcon from '../assets/images/icon/project.png';
import EducationIcon from '../assets/images/icon/education.png';


const data = [
  { id: '1', title: 'Unsecured\nLoan', link: 'https://loanguru.in/?page_id=462', icon: UnsecuredIcon },
  { id: '2', title: 'Secured\nLoan', link: 'https://loanguru.in/?page_id=492', icon: SecuredIcon },
  { id: '3', title: 'SMEs/MSMEs\nLoan', link: 'https://loanguru.in/?page_id=507', icon: SMEIcon },
  { id: '4', title: 'OD/CC\nLimit', link: 'https://loanguru.in/?page_id=520', icon: ODCCIcon },
  { id: '5', title: 'Project\nLoan', link: 'https://loanguru.in/?page_id=537', icon: ProjectIcon },
  { id: '6', title: 'Education\nLoan', link: 'https://loanguru.in/?page_id=540', icon: EducationIcon }
];

const Loan: React.FC = () => {
  // const [modalVisible, setModalVisible] = useState(false);
  // const [selectedLink, setSelectedLink] = useState('');
  const navigation: any = useNavigation();

  const [fontsLoaded] = useFonts({
    'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // const handlePress = (link: string) => {
  //   setSelectedLink(link);
  //   setModalVisible(true);
  // };

//   const hideHeaderFooter = `
//   const hideElement = (selector) => {
//     const element = document.querySelector(selector);
//     if (element) {
//       element.style.display = 'none';
//     }
//   };
//   hideElement('header');
//   hideElement('footer');
//   hideElement('.mobile-app-call-to-action');
//   hideElement('.mobile-app-types-of-loan');
//   hideElement('#weglot-switcher-1');
//   hideElement('.cnb-action.cnb-icon-type-font');
// `;

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
    // margin: 10,
    color: '#1E1E1E',
    fontWeight:'900',
    marginLeft:15,
    lineHeight:14.4,
    letterSpacing:2,
    marginTop:'5%',
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
    borderColor: '#000', 
    borderWidth: 1,
    justifyContent: 'center',
    width: 170,
    height: 70,
  },
  itemContainerRow2: {
    alignItems: 'center',
    margin: -5,
  },
  iconContainer1: {
    backgroundColor: '#E7F4FF',
    padding: 10,
    borderRadius: 15,
    height:56,
    width:56, 
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  iconContainer: {
    backgroundColor: '#E7F4FF',
    padding: 10,
    borderRadius: 15,
    height:56,
    width:56,  
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:5,
  },
  icon: {
    width: 50,
    height: 50,
    // marginBottom: 5,
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