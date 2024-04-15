import { image185 } from 'api/tmdb';
import { Cast } from 'models/movie-credits';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

type props = {
  navigation: any;
  cast: Cast[];
};

export default function CastList({ navigation, cast }: props) {
  return (
    <View className="my-6">
      <Text className="mx-4 mb-5 text-lg text-white">Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 15 }}>
        {cast?.map((person, i) => (
          <TouchableOpacity
            key={i}
            className="mr-4 items-center"
            onPress={() => navigation.navigate('Person', person)}>
            <View className="h-20 w-20 items-center overflow-hidden rounded-full border-neutral-500">
              <Image
                source={{ uri: image185(person.profile_path || '') }}
                className="ronded-2xl h-24 w-20"
              />
            </View>
            <Text className="mt-1 text-xs text-white">{person.character}</Text>
            <Text className="mt-1 text-xs text-white">{person.original_name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
