import React from 'react';
import {StatusBar, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {styles} from './config/theme/app-theme';
import {CalculatorXScreen} from './presentation/screens/CalculatorXScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = Colors.lighter;

  return (
    <View style={styles.background}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <CalculatorXScreen />
    </View>
  );
}

export default App;
