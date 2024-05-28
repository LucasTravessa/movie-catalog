import { useNavigation } from '@react-navigation/native';
import { image342, TmdbService } from 'api/tmdb';
import { Loading } from 'components/loading';
import { height, ios, width } from 'constants/constants';
import { debounce } from 'lodash';
import { Movie } from 'models/movie';
import { NavigationProps } from 'navigation';
import { useCallback, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';

export default function SearchScreen() {
  const navigation = useNavigation<NavigationProps>();

  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState<Movie[]>([]);

  async function handleSearch(value: string) {
    if (value.length > 2) {
      setLoading(true);
      const search = await TmdbService.searchMovies({
        query: value,
      });
      setResults(search.results);
      setLoading(false);
      return;
    }
    setLoading(false);
    setResults([]);
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 600), []);

  return (
    <SafeAreaView className={`flex-1 bg-neutral-800 ${!ios && 'pt-8'}`}>
      <View className="boder mx-4 mb-3 flex-row items-center justify-between rounded-full border-neutral-500">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor="lightgray"
          className="flex-1 pb-1 pl-6 text-base font-semibold tracking-wider text-white"
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="m-1 rounded-full bg-neutral-500 p-3">
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3">
          <Text className="ml-1 font-semibold text-white">Results ({results.length})</Text>
          <View className="flex-row flex-wrap justify-between">
            {results.map((item, i) => (
              <TouchableWithoutFeedback key={i} onPress={() => navigation.navigate('Movie', item)}>
                <View className="mb-4 space-y-2">
                  {item.poster_path ? (
                    <Image
                      source={{
                        uri: image342(item.poster_path),
                      }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                  ) : (
                    <Image
                      source={require('../assets/no-image.png')}
                      style={{ height: height * 0.44, width: width * 0.33 }}
                    />
                  )}
                  <Text className="ml-1 text-neutral-400">{item.title}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require('../assets/couch.png')}
            style={{ width: width * 0.84, height: height * 0.3, objectFit: 'contain' }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
