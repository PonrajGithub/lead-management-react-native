import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth } = Dimensions.get('window');

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const data = [
    { title: 'Welcome to the App' },
    { title: 'Enjoy Great Features' },
    { title: 'Stay Connected' },
    { title: 'Explore More' },
  ];

  const renderItem = ({ item }: { item: { title: string } }) => (
    <View style={styles.slide}>
      <Text style={styles.slideText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        layout={'default'}
        data={data}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    backgroundColor: '#f9c2ff',
    borderRadius: 8,
    height: 150,
    padding: 50,
    justifyContent: 'center',
  },
  slideText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Slider;
