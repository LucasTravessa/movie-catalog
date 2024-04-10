import MovieList from 'components/movieList';
import { TrendingMovies } from 'components/trendingMovies';
import { ios } from 'constants/constants';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from 'theme';

export function HomeScreen() {
  const [trending, setTrending] = useState([1, 2, 3]);
  const [upcoming, setUpcoming] = useState([1, 2, 3]);
  const [topRated, setTopRated] = useState([1, 2, 3]);
  const [popular, setPopular] = useState([1, 2, 3]);

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <StatusBar style="light" />
        <View className="mx-4 flex-row items-center justify-between">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-3xl font-bold text-white">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}>
        <TrendingMovies data={trending} />
        <MovieList title="Upcoming" data={upcoming} />
        <MovieList title="Top Rated" data={topRated} />
        <MovieList title="Popular" data={topRated} />
      </ScrollView>
    </View>
  );
}
