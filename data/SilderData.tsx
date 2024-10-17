import { ImageSourcePropType } from "react-native";

export type ImageSliderType = {
    title: string;
    image: ImageSourcePropType;
    description: string;
}

export const ImageSlider = [
    {
        title: 'Loan',
        image: require('@/assets/images/loanbanner1.jpg'),
        description: 'Hiii....', 
    },
    {
        title: 'Car loan',
        image: require('@/assets/images/loanbanner.jpg'),
        description: 'Hello',
    },
    {
        title: 'Home loan',
        image: require('@/assets/images/fivehun.jpg'),
        description: 'Vankam..',
    }
]