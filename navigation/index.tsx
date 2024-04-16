import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Movie } from 'models/movie';
import { Cast } from 'models/movie-credits';
import { HomeScreen } from 'screens/home-screen';
import { MovieScreen } from 'screens/movie-screen';
import { PersonScreen } from 'screens/person-screen';
import SearchScreen from 'screens/search-screen';

export type NavigationProps = StackNavigationProp<RootStackParamList>;

export type RouteProps = RouteProp<RootStackParamList>;

export type RootStackParamList = {
  Home: undefined;
  Movie: Movie;
  Person: Cast;
  Search: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
        <Stack.Screen name="Person" options={{ headerShown: false }} component={PersonScreen} />
        <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
