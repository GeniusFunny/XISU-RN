import * as COLOR from 'react-native-material-ui/src/styles/colors'

const uiTheme = {
  palette: {
    primaryColor: COLOR.blue500,
    accentColor: COLOR.red500,
    primaryColorDark: '#0069c0',
    primaryColorLight: '#6ec6ff',
    SecondaryColor: COLOR.red500,
    SecondaryColorDark: '#ba000d',
    SecondaryColorLight: '#ff7961',
    FontColorOnDark: '#fff',
    FontColor: '#000',
    infoColor: '#666'
  },
  toolbar: {
    container: {
      height: 50
    }
  },
  fontSize: {
    text: 16,
    title: 20,
    subTitle: 18,
    subText: 14,
  },
  fontFamily: 'Roboto-Regular',
  header: {
    icon: {
      size: 25,
      color: '#000'
    }
  }
}
export default uiTheme
