import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Ensure correct import

const { width } = Dimensions.get('window');
const ICON_SIZE = 50; // Set the size of the icons
const ICONS = [
  { id: '1', name: 'Home', icon: 'home' },
  { id: '2', name: 'User', icon: 'user' },
  { id: '3', name: 'Settings', icon: 'cog' },
  { id: '4', name: 'Heart', icon: 'heart' },
  { id: '5', name: 'Star', icon: 'star' },
  { id: '6', name: 'Bell', icon: 'bell' },
  { id: '7', name: 'Camera', icon: 'camera' },
  { id: '8', name: 'Envelope', icon: 'envelope' },
];

const IconGrid: React.FC = () => {
  const renderIconItem = ({ item }: { item: { id: string; name: string; icon: string } }) => (
   <TouchableOpacity style={styles.iconContainer}>
      <FontAwesome name={item.icon} size={ICON_SIZE} color="black" />
      <Text style={styles.iconText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Loan</Text>
      <View style={styles.grid}>
        {ICONS.map((icon) => (
          <View key={icon.id} style={styles.item}>
            {renderIconItem({ item: icon })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text:{
    fontSize:25,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '23%', // Adjust to fit 4 columns
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
    textAlign: 'center',
  },
});

export default IconGrid;
