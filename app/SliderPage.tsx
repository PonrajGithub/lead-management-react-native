import React from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width - 40; // Adjust as needed

const images = [
  { id: '1', uri: '../assets/images/banner.jpg' },
  { id: '2', uri: '../assets/images/banner.jpg' },
  { id: '3', uri: '../assets/images/banner.jpg' },
];

const SliderPage = () => {
  const renderItem = ({ item }: { item: { id: string; uri: string } }) => (
    <Image source={{ uri: item.uri }} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
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
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH, // Adjust height proportionally if needed
    borderRadius: 10,
    margin: 20,
  },
});

export default SliderPage;
