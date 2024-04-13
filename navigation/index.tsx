import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from 'screens/home-screen';
import { MovieScreen } from 'screens/movie-screen';
import { PersonScreen } from 'screens/person-screen';

export type RootStackParamList = {
  Home: undefined;
  Movie: { item: any };
  Person: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
        <Stack.Screen name="Person" options={{ headerShown: false }} component={PersonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
