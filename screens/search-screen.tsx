import { useNavigation } from '@react-navigation/native';
import { Loading } from 'components/loading';
import { ios } from 'constants/constants';
import { Movie } from 'models/movie';
import { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { AcademicCapIcon, XMarkIcon } from 'react-native-heroicons/outline';

export default function SearchScreen() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);

  const [results, setResults] = useState<Movie[]>([]);

  return (
    <SafeAreaView className={`flex-1 bg-neutral-800 ${!ios && 'pt-8'}`}>
      <View className="boder mx-4 mb-3 flex-row items-center justify-between rounded-full border-neutral-500">
        <TextInput
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
                  <AcademicCapIcon />
                  <Text className="ml-1 text-neutral-400">Movie name</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Text>Not found</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
