import { useNavigation, useRoute } from '@react-navigation/native';
import { image342, TmdbService } from 'api/tmdb';
import { Loading } from 'components/loading';
// import { MovieList } from 'components/movieList';
import { height, ios, width } from 'constants/constants';
// import { Movie } from 'models/movie';
import { PersonDetails } from 'models/person-details';
import { PersonMovieCredits } from 'models/person-movie-credits';
import { NavigationProps, RouteProps } from 'navigation';
import { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity, View, Text, Image } from 'react-native';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';

const verticalMargin = ios ? '' : ' mt-8 my-3';
export function PersonScreen() {
  const navigation = useNavigation<NavigationProps>();

  const { params: item } = useRoute<RouteProps>();

  const [loading, setLoading] = useState(true);

  const [isFavourite, toggleFavourite] = useState(false);

  const [person, setPerson] = useState<PersonDetails>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [personMovies, setPersonMovies] = useState<PersonMovieCredits>();

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  async function fetchData() {
    const id = item?.id || 123;
    const personDetails = await TmdbService.personDetailsByID(id);
    if (personDetails) setPerson(personDetails);
    const personMoviesCredits = await TmdbService.personMoviesByID(id);
    if (personMoviesCredits) setPersonMovies(personMoviesCredits);

    setLoading(false);
  }

  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 20 }}>
      <SafeAreaView
        className={'w-full flex-row items-center justify-between px-4' + verticalMargin}>
        <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-xl p-1">
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon size="35" color={isFavourite ? 'red' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: 'gray',
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}>
            <View className="boder-neutral-500 h-72 w-72 items-center overflow-hidden rounded-full">
              {person?.profile_path ? (
                <Image
                  source={{
                    uri: image342(person.profile_path),
                  }}
                  style={{ height: height * 0.43, width: width * 0.74 }}
                />
              ) : (
                <Image
                  source={require('../assets/no-image.png')}
                  style={{ height: height * 0.43, width: width * 0.74 }}
                />
              )}
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-center text-3xl font-bold text-white">{person?.name}</Text>
            <Text className="text-center text-base text-neutral-500">{person?.place_of_birth}</Text>
          </View>
          <View className="mx-3 mt-6 flex-row items-center justify-between rounded-full bg-neutral-700 p-4">
            <View className="items-center border-r-2 border-r-neutral-400 px-2">
              <Text className="font-semibold text-white">Gender</Text>
              <Text className="text-sm text-neutral-300">
                {person?.gender === 1 ? 'Female' : 'Male'}
              </Text>
            </View>
            <View className="items-center border-r-2 border-r-neutral-400 px-2">
              <Text className="font-semibold text-white">Birthday</Text>
              <Text className="text-sm text-neutral-300">
                {person?.birthday ? person.birthday.toString() : 'MM-DD-YYY'}
              </Text>
            </View>
            <View className="items-center border-r-2 border-r-neutral-400 px-2">
              <Text className="font-semibold text-white">Known for</Text>
              <Text className="text-sm text-neutral-300">Lorem ipsum </Text>
              {/* <Text className="text-sm text-neutral-300">{person?.known_for}</Text> */}
            </View>
            <View className="items-center px-2">
              <Text className="font-semibold text-white">Popularity</Text>
              <Text className="text-sm text-neutral-300">{person?.popularity.toFixed(2)}%</Text>
            </View>
          </View>
          <View className="mx-4 my-6 space-y-2">
            <Text className="text-lg text-white">Biography</Text>
            <Text className="tracking-wide text-neutral-400">{person?.biography}</Text>
          </View>

          {/* <MovieList title="Movies" data={personMovies} hideSeeAll /> */}
        </View>
      )}
    </ScrollView>
  );
}
