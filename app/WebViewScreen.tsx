// WebViewScreen.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const { link } = route.params;

  const hideHeaderFooter = `
    document.querySelector('header').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
    document.querySelector('.mobile-app-call-to-action').style.display = 'none';
    document.querySelector('.mobile-app-types-of-loan').style.display = 'none';
    document.querySelector('#weglot-switcher-1').style.display = 'none';
    document.querySelector('.cnb-action.cnb-icon-type-font').style.display = 'none';
  `;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: link }}
        injectedJavaScript={hideHeaderFooter}
        onNavigationStateChange={(navState) => {
          if (!navState.loading && !navState.url.startsWith('https://loanguru.in')) 
            {
            // navigation.goBack();
          }
        }}
      />
      
    </View>
  );
};


export default WebViewScreen;
