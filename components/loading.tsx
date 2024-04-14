import { height, width } from 'constants/constants';
import { View } from 'react-native';
import * as Progress from 'react-native-progress';
import { theme } from 'theme';

export function Loading() {
  return (
    <View style={{ height, width }} className="absolute flex-row items-center justify-center">
      <Progress.CircleSnail thickness={12} size={160} color={theme.background} />
    </View>
  );
}
