import { View, Text } from 'react-native';
import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { styles } from 'theme';
import { useNavigation } from '@react-navigation/native';

type props = {
  title: string;
  data: any;
};

export function MovieList({ title, data }: props) {
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row items-center justify-between">
        <Text className="text-xl text-white">{title}</Text>
        <TouchableOpacity>
          <Text style={styles.text} className="text-lg">
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 15 }}>
        {data.map((item: any, index: number) => (
          <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Movie', item)}>
            <Text style={styles.text} className="text-lg" key={index}>
              Movie Name
            </Text>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}
