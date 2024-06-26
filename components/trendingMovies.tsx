import { useNavigation } from '@react-navigation/native';
import { image500 } from 'api/tmdb';
import { height, width } from 'constants/constants';
import { Movie } from 'models/movie';
import { NavigationProps } from 'navigation';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

type props = {
  data: Movie[];
};

export function TrendingMovies({ data }: props) {
  const navigation = useNavigation<NavigationProps>();
  const handleClick = (item: Movie) => {
    navigation.navigate('Movie', item);
  };
  return (
    <View className="mb-8">
      <Text className="mx-4 mb-5 text-xl text-white">TrendingMovies</Text>
      <Carousel
        loop
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        width={width * 0.7}
        height={height * 0.4}
        style={{
          width,
          height: height * 0.4,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
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
      {item.poster_path ? (
        <Image
          source={{
            uri: image500(item.poster_path),
          }}
          style={{ width: width * 0.6, height: height * 0.4 }}
          className="rounded-3xl"
        />
      ) : (
        <Image
          source={require('../assets/no-image.png')}
          style={{ width: width * 0.6, height: height * 0.4 }}
          className="rounded-3xl"
        />
      )}
    </TouchableWithoutFeedback>
  );
};
