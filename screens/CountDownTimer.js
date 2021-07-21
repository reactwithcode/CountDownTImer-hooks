/* eslint-disable react/jsx-no-undef */
import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  HStack,
  TouchableOpacity,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';

import {ArrowForwardIcon, NativeBaseProvider, Fab} from 'native-base';

import {
  WheelPicker,
  // TimePicker,
  // DatePicker,
} from 'react-native-wheel-picker-android';

// import {Picker} from '@react-native-picker/picker';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07121B',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  button: {
    borderWidth: 10,
    borderColor: '#89AAFF',
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  buttonStop: {
    borderColor: '#FF851B',
  },
  buttonText: {
    fontSize: 45,
    color: '#89AAFF',
  },
  buttonTextStop: {
    color: '#FF851B',
  },
  timerText: {
    color: '#fff',
    fontSize: 90,
  },
  picker: {
    width: 100,
    ...Platform.select({
      android: {
        color: '#fff',
      },
    }),
  },
  pickerItem: {
    color: '#fff',
    fontSize: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginLeft: -100,
    width: 200,
  },
});

const createArray = length => {
  const arr = [];
  let i = 0;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }
  return arr;
};

const AVAILABLE_SECONDS = createArray(61);

function CountDownTimer({navigation}) {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSeconds, setSelectedSeconds] = useState(0);

  const [remainingTimeSeconds, setRemainingTimeSeconds] = useState(5);

  useEffect(() => {
    return stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTimeSeconds === 0 && isRunning === true]);

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const onSecondsSelected = selectedSeconds => {
    setSelectedSeconds(selectedSeconds);
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {isRunning ? (
          <CountdownCircleTimer
            isPlaying
            duration={selectedSeconds}
            size={180}
            strokeWidth={12}
            colors={[
              ['#004777', 0.4],
              ['#F7B801', 0.4],
              ['#A30000', 0.2],
            ]}>
            {({remainingTime, animatedColor}) => (
              <Animated.Text style={{color: animatedColor, fontSize: 50}}>
                {remainingTime}
                {setRemainingTimeSeconds(remainingTime)}
              </Animated.Text>
            )}
          </CountdownCircleTimer>
        ) : (
          <View style={styles.pickerContainer}>
            <WheelPicker
              selectedItem={selectedSeconds}
              selectedItemTextColor={'white'}
              selectedItemTextSize={20}
              hideIndicator
              data={AVAILABLE_SECONDS.map((value, index) => {
                return value;
              })}
              onItemSelected={selectedSeconds =>
                onSecondsSelected(selectedSeconds)
              }
            />
            <Text style={styles.pickerItem}>seconds</Text>
          </View>
        )}

        {isRunning ? (
          <TouchableOpacity
            style={[styles.button, styles.buttonStop]}
            onPress={() => stop()}>
            <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => start()}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
      </View>

      <Fab
        bg="transparent"
        position="absolute"
        bottom={10}
        right={19}
        icon={<ArrowForwardIcon name="next" type="AntDesign" color="#89AAFF" />}
        onPress={() =>
          navigation.navigate('Count Down Timer Next', {
            remainingTimeSeconds: remainingTimeSeconds,
          })
        }
      />
    </NativeBaseProvider>
  );
}

export default CountDownTimer;
