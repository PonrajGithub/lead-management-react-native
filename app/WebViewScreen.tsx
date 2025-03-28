import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Footer from './Footer';
import Header from './Header';
import { useLocalSearchParams } from 'expo-router';

const WebViewScreen = () => {
  const { uri } = useLocalSearchParams(); 

  console.log(uri, "URL")

    const hideHeaderFooterScript = `
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
  return (
    <View style={styles.container}>
      <Header/>
    <WebView
      // source={{ uri: '' }}
      source={{ uri: uri }}
      style={styles.webView}
      injectedJavaScript={hideHeaderFooterScript}
    />
     <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  webView: {
    flex: 1,
  },
});

export default WebViewScreen;
