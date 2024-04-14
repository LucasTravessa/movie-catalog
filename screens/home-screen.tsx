import { useNavigation } from '@react-navigation/native';
import { TmdbService } from 'api/tmdb';
import { Loading } from 'components/loading';
import { MovieList } from 'components/movieList';
import { TrendingMovies } from 'components/trendingMovies';
import { ios } from 'constants/constants';
import { StatusBar } from 'expo-status-bar';
import { Movie } from 'models/movie';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from 'theme';

export function HomeScreen() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);

  const [trending, setTrending] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);

  useEffect(() => {
    fetchData();
    return () => {
      setTrending([]);
      setUpcoming([]);
      setTopRated([]);
      setPopular([]);
    };
  }, []);

  async function fetchData() {
    const trendingMovies = await TmdbService.trendingMovies();
    if (trendingMovies?.results) setTrending(trendingMovies.results);
    const upComingMovies = await TmdbService.upComingMovies();
    if (upComingMovies?.results) setUpcoming(upComingMovies.results);
    const topRatedMovies = await TmdbService.topRatedMovies();
    if (topRatedMovies?.results) setTopRated(topRatedMovies.results);
    setLoading(false);
  }

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3 mt-8'}>
        <StatusBar style="light" />
        <View className="mx-4 flex-row items-center justify-between">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-3xl font-bold text-white">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}>
          {trending.length > 0 && <TrendingMovies data={trending} />}
          {upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming} />}
          {topRated.length > 0 && <MovieList title="Top Rated" data={topRated} />}
          {popular.length > 0 && <MovieList title="Popular" data={popular} />}
        </ScrollView>
      )}
    </View>
  );
}
