/** @format */
import * as React from 'react'
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper'
import {AppRegistry} from 'react-native'
import App from './src/App'
import {name as appName} from './app.json'
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  }
}
export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
