// import React, { useRef } from 'react';
// import { View, Dimensions, Image, StyleSheet } from 'react-native';
// import Carousel from 'react-native-snap-carousel';

// const { width: screenWidth } = Dimensions.get('window');

// interface CarouselItem {
//   imageUrl: string;
// }

// const data: CarouselItem[] = [
//   { imageUrl: 'https://www.pexels.com/photo/crop-businessman-giving-contract-to-woman-to-sign-3760067/' },
//   { imageUrl: 'https://example.com/image2.jpg' },
//   { imageUrl: 'https://example.com/image3.jpg' },
// ];

// const ImageCarousel: React.FC = () => {
//   const carouselRef = useRef<Carousel<any>>(null);

//   const renderItem = ({ item }: { item: CarouselItem }) => {
//     return (
//       <View style={styles.itemContainer}>
//         <Image source={{ uri: item.imageUrl }} style={styles.image} />
//       </View>
//     );
//   };

//   return (
//     <View style={styles.carouselContainer}>
//       <Carousel
//         ref={carouselRef}
//         data={data}
//         renderItem={renderItem}
//         sliderWidth={screenWidth}
//         itemWidth={screenWidth * 0.8}
//         loop={true}
//         autoplay={true}
//         autoplayDelay={1000}
//         autoplayInterval={3000}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   carouselContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   itemContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     resizeMode: 'cover',
//   },
// });

// export default ImageCarousel;
