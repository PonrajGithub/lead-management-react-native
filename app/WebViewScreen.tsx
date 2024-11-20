import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = () => {

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
    <WebView
      source={{ uri: 'https://loanguru.in/delhis-best-student-loan-service-provider-company/' }}
      style={styles.webView}
      injectedJavaScript={hideHeaderFooterScript}
    />
  );
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
});

export default WebViewScreen;
