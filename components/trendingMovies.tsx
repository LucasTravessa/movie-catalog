import { useNavigation } from '@react-navigation/native';
import { width } from 'constants/constants';
import { View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';

type props = {
  data: any;
};

export function TrendingMovies({ data }: props) {
  const navigation = useNavigation();
  const handleClick = (item: any) => {
    navigation.navigate('Movie', item);
  };
  return (
    <View className="mb-8">
      <Text className="mx-4 mb-5 text-xl text-white">TrendingMovies</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  );
}

type cardProps = {
  item: any;
  handleClick: any;
};

const MovieCard = ({ item, handleClick }: cardProps) => {
  return (
    <TouchableWithoutFeedback
      className="rounded-lg bg-neutral-800 p-4"
      onPress={() => handleClick(item)}>
      <Text className="text-white">aaa</Text>
    </TouchableWithoutFeedback>
  );
};
