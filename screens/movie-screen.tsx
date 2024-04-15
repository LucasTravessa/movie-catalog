import { useNavigation, useRoute } from '@react-navigation/native';
import { image500, TmdbService } from 'api/tmdb';
import CastList from 'components/cast';
import { Loading } from 'components/loading';
import { MovieList } from 'components/movieList';
import { height, ios, width } from 'constants/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Movie } from 'models/movie';
import { Cast } from 'models/movie-credits';
import { MovieDetails } from 'models/movie-details';
import { Person } from 'models/person';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { AcademicCapIcon, ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { theme } from 'theme';

const topMargin = ios ? '' : ' mt-8 mt-3';

export function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);

  const [movie, setMovie] = useState<MovieDetails>();

  const [isFavourite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState<Cast[]>([]);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

  useEffect(() => {
    //api call
    fetchData();
    return () => {};
  }, [item]);

  async function fetchData() {
    const id = Number(item.id) || 123;
    const movieDetails = await TmdbService.movieDetailsByID(id);
    if (movieDetails) setMovie(movieDetails);
    const movieCredits = await TmdbService.movieCreditsByID(id);
    if (movieCredits) setCast(movieCredits.cast);
    const similarMovies = await TmdbService.similarMoviesByID(id);
    if (similarMovies) setSimilarMovies(similarMovies.results);

    setLoading(false);
  }
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">
      <View className="w-full">
        <SafeAreaView
          className={'absolute z-20 w-full flex-row items-center justify-between px-4' + topMargin}>
          <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-xl p-1">
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon size="35" color={isFavourite ? theme.background : 'white'} />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{ uri: image500(movie?.poster_path || '') }}
              style={{ height: height * 0.4, width }}
            />
            {/* <LinearGradient
              colors={['transparent', 'rgb(23,23,23,0.8)', 'rgba(23,23,23,1)']}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            /> */}
          </View>
        )}
      </View>
      {!loading && (
        <>
          <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
            <Text className="text-center text-3xl font-bold tracking-wider text-white">
              {movie?.title}
            </Text>
            <Text className="text-center text-base font-semibold text-neutral-400">
              {movie?.status} ° {movie?.release_date.toString()} ° {movie?.runtime} min
            </Text>
            <View className="mx-4 flex-row justify-center space-x-4">
              {movie?.genres.map((gen, i) => {
                const showDot = i + 1 !== movie.genres.length;
                return (
                  <Text key={i} className="text-center text-base font-semibold text-neutral-400">
                    {gen.name} {showDot && '°'}
                  </Text>
                );
              })}
            </View>
            <Text className="mx-4 tracking-wide text-neutral-400">{movie?.overview}</Text>
          </View>
          <CastList navigation={navigation} cast={cast} />
          <MovieList title="Similar movies" data={similarMovies} hideSeeAll />
        </>
      )}
    </ScrollView>
  );
}
