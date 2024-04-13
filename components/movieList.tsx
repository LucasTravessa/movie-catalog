import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { AcademicCapIcon } from 'react-native-heroicons/outline';
import { styles } from 'theme';

type props = {
  title: string;
  data: any;
  hideSeeAll?: boolean;
};

export function MovieList({ title, data, hideSeeAll = false }: props) {
  const navigation = useNavigation();
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
        {data.map((item: any, index: number) => (
          <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}>
            <View className="mr-4 space-y-1">
              <AcademicCapIcon />
              <Text className="ml-1 text-neutral-300" key={index}>
                Movie Name
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}
