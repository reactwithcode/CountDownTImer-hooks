import React from 'react';
import CountDownTimer from './screens/CountDownTimer';
import CountDownTimerNext from './screens/CountDownTimerNext';

import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPreset,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Easing} from 'react-native-reanimated';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 1000,
    easing: Easing.linear,
  },
};

const openConfig = {
  animation: 'timing',
  config: {
    duration: 1000,
    easing: Easing.linear,
  },
};

// const config = {
//   animation: 'spring',
//   config: {
//     stiffness: 1000,
//     damping: 500,
//     mass: 3,
//     overshootClamping: false,
//     restDisplacementThreshold: 0.01,
//     restSpeedThreshold: 0.01,
//     backgroundColor: '#07121B',
//   },
// };

function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

          transitionSpec: {
            open: openConfig,
            close: closeConfig,
          },
        }}
        headerMode="float"
        animation="fade">
        <Stack.Screen name="Count Down Timer" component={CountDownTimer} />
        <Stack.Screen
          name="Count Down Timer Next"
          component={CountDownTimerNext}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
