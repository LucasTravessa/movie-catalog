import { Dimensions, Platform } from 'react-native';

export const ios = Platform.OS === 'ios';

export const { width, height } = Dimensions.get('window');
