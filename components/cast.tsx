import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { AcademicCapIcon } from 'react-native-heroicons/outline';

export default function Cast({ navigation, cast }: any) {
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
            <AcademicCapIcon />
            <Text className="mt-1 text-xs text-white">john wick</Text>
            <Text className="mt-1 text-xs text-white">Kyano reeves</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
