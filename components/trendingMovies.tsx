import { useNavigation } from '@react-navigation/native';
import { image500 } from 'api/tmdb';
import { height, width } from 'constants/constants';
import { Movie } from 'models/movie';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-snap-carousel';

type props = {
  data: Movie[];
};

export function TrendingMovies({ data }: props) {
  const navigation = useNavigation();
  const handleClick = (item: Movie) => {
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
  item: Movie;
  handleClick: (item: Movie) => void;
};

const MovieCard = ({ item, handleClick }: cardProps) => {
  return (
    <TouchableWithoutFeedback
      className="rounded-lg bg-neutral-800 p-4"
      onPress={() => handleClick(item)}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={{ width: width * 0.6, height: height * 0.4 }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
