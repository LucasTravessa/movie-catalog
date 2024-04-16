import { useNavigation } from '@react-navigation/native';
import { image185 } from 'api/tmdb';
import { height, width } from 'constants/constants';
import { Movie } from 'models/movie';
import { NavigationProps } from 'navigation';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { styles } from 'theme';

type props = {
  title: string;
  data: Movie[];
  hideSeeAll?: boolean;
};

export function MovieList({ title, data, hideSeeAll = false }: props) {
  const navigation = useNavigation<NavigationProps>();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row items-center justify-between">
        <Text className="text-xl text-white">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See all
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 15 }}>
        {data?.map((item: Movie, index: number) => (
          <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}>
            <View className="mr-4 space-y-1">
              <Image
                source={{ uri: image185(item.poster_path) }}
                className="rounded-3xl"
                style={{ width: width * 0.33, height: height * 0.22 }}
              />
              <Text className="ml-1 max-w-32 text-neutral-300" key={index}>
                {item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}
