import { useNavigation, useRoute } from '@react-navigation/native';
import Cast from 'components/cast';
import { MovieList } from 'components/movieList';
import { height, ios, width } from 'constants/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { AcademicCapIcon, ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { theme } from 'theme';

const topMargin = ios ? '' : ' mt-3';

export function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();

  const [isFavourite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState();

  useEffect(() => {
    //api call
    return () => {};
  }, [item]);
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
        <View>
          //imagem
          <AcademicCapIcon />
          <LinearGradient
            colors={['transparent', 'rgb(23,23,23,0.8)', 'rgba(23,23,23,1)']}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-center text-3xl font-bold tracking-wider text-white">Movie Name</Text>
        <Text className="text-center text-base font-semibold text-neutral-400"> Release Date</Text>
        <View className="mx-4 flex-row justify-center space-x-4">
          <Text className="text-center text-base font-semibold text-neutral-400">Action</Text>
        </View>
        <Text className="mx-4 tracking-wide text-neutral-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint blanditiis nesciunt optio
          repudiandae, asperiores, consequatur neque maiores dolorem sunt, debitis aliquam adipisci.
          Illum quia impedit eius distinctio perferendis, quo eum.
        </Text>
      </View>
      <Cast navigation={navigation} cast={cast} />
      <MovieList title="Similar movies" data={similarMovies} hideSeeAll />
    </ScrollView>
  );
}
