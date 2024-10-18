// import React, { useRef, useState } from 'react';
// import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
// import Carousel from 'react-native-snap-carousel';

// const { width } = Dimensions.get('window');

// const data = [
//   { title: 'First Item', image: require('../assets/images/banner.jpg') },
//   { title: 'Second Item', image: require('../assets/images/banner.jpg') },
//   { title: 'Third Item', image: require('../assets/images/banner.jpg') },
// ];

// const Slider = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const carouselRef = useRef(null);

//   const _renderItem = ({ item, index }) => {
//     return (
//       <View style={styles.card}>
//         <Image source={item.image} style={styles.image} />
//         <Text style={styles.title}>{item.title}</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Carousel
//         layout={'default'}
//         ref={carouselRef}
//         data={data}
//         sliderWidth={width}
//         itemWidth={width * 0.8}
//         renderItem={_renderItem}
//         onSnapToItem={(index) => setActiveIndex(index)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     height: 250,
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 8,
//   },
//   image: {
//     width: '100%',
//     height: 150,
//     borderRadius: 8,
//   },
//   title: {
//     fontSize: 18,
//     marginTop: 10,
//     fontWeight: 'bold',
//   },
// });


// export default Slider;
