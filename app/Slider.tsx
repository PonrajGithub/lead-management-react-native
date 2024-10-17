import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, Image } from 'react-native';

const { width } = Dimensions.get('window');

interface CarouselItem {
  id: string;
  title: string;
  image: string;
}

const data: CarouselItem[] = [
  { id: '1', title: 'Item 1', image: 'https://media.wired.com/photos/66c60e77081e8351da151f71/191:100/w_1280,c_limit/Google%20Pixel%209%20Pro%20Abstract%20Background%20SOURCE%20Google.jpg' },
  { id: '2', title: 'Item 2', image: 'https://via.placeholder.com/400' },
  { id: '3', title: 'Item 3', image: 'https://via.placeholder.com/400' },
];

const Slider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const newIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(newIndex);
  };

  const renderItem = ({ item }: { item: CarouselItem }) => (
    <View style={styles.carouselItem}>
      {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === activeIndex ? '#000' : '#ccc' },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselItem: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    marginTop: 100,
    fontSize: 20,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default Slider;
