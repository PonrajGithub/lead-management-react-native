import React, { useRef } from 'react';
import { View, Text, Image, Dimensions, Animated } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

interface CarouselItem {
  title: string;
  subtitle: string;
  image: string;
}

const data: CarouselItem[] = [
  { title: 'First Slide', subtitle: 'Beautiful Landscape', image: 'https://example.com/image1.jpg' },
  { title: 'Second Slide', subtitle: 'Mountain View', image: 'https://example.com/image2.jpg' },
  { title: 'Third Slide', subtitle: 'Ocean Breeze', image: 'https://example.com/image3.jpg' },
];

const ParallaxCarousel: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const carouselRef = useRef<Carousel<any>>(null);

  const renderItem = ({ item, index }: { item: CarouselItem; index: number }) => {
    const inputRange = [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth];
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-50, 0, 50],
    });

    return (
      <View style={{ width: screenWidth, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ borderRadius: 8, overflow: 'hidden', elevation: 3 }}>
          <Animated.Image
            source={{ uri: item.image }}
            style={{
              width: screenWidth - 60,
              height: 250,
              transform: [{ translateX }],
            }}
            resizeMode="cover"
          />
          <View style={{ position: 'absolute', bottom: 0, padding: 10, backgroundColor: 'rgba(0,0,0,0.5)', width: '100%' }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
            <Text style={{ color: 'white', fontSize: 14 }}>{item.subtitle}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 60}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        loop={true}
      />
    </View>
  );
};

export default ParallaxCarousel;
