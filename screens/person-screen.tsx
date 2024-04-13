import { useNavigation } from '@react-navigation/native';
import { MovieList } from 'components/movieList';
import { ios } from 'constants/constants';
import { useState } from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity, View, Text } from 'react-native';
import { AcademicCapIcon, ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';

const verticalMargin = ios ? '' : ' my-3';
export function PersonScreen() {
  const navigation = useNavigation();

  const [isFavourite, toggleFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState(false);

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

      <View>
        <View className="flex-row justify-center">
          <AcademicCapIcon />
        </View>
        <View className="mt-6">
          <Text className="text-center text-3xl font-bold text-white">KeanuReeves</Text>
          <Text className="text-center text-base text-neutral-500">London</Text>
        </View>
        <View className="mx-3 mt-6 flex-row items-center justify-between rounded-full bg-neutral-700 p-4">
          <View className="items-center border-r-2 border-r-neutral-400 px-2">
            <Text className="font-semibold text-white">Gender</Text>
            <Text className="text-sm text-neutral-300">Male</Text>
          </View>
          <View className="items-center border-r-2 border-r-neutral-400 px-2">
            <Text className="font-semibold text-white">Birthday</Text>
            <Text className="text-sm text-neutral-300">Male</Text>
          </View>
          <View className="items-center border-r-2 border-r-neutral-400 px-2">
            <Text className="font-semibold text-white">Known for</Text>
            <Text className="text-sm text-neutral-300">Male</Text>
          </View>
          <View className="items-center px-2">
            <Text className="font-semibold text-white">Popularity</Text>
            <Text className="text-sm text-neutral-300">Male</Text>
          </View>
        </View>
        <View className="mx-4 my-6 space-y-2">
          <Text className="text-lg text-white">Biography</Text>
          <Text className="tracking-wide text-neutral-400">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure animi quas sint illo non
            dolore inventore ad suscipit voluptates impedit. Quibusdam veritatis fugit quaerat harum
            ut vitae delectus dicta odit.
          </Text>
        </View>

        <MovieList title="Movies" data={personMovies} hideSeeAll />
      </View>
    </ScrollView>
  );
}
