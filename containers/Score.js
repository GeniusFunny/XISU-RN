import {View, FlatList, Text} from 'react-native'
import React from 'react'
import {ListItem, } from 'react-native-material-ui'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import * as COLOR from 'react-native-material-ui/src/styles/colors'
import {createStackNavigator} from 'react-navigation'
const ScoreItem = (props) => {
  return (
    <ListItem
      divider
      centerElement={{
        primaryText: props.className,
        secondaryText: props.year + (props.term === '1' ? ' 第一学期' : ' 第二学期')
      }}
      rightElement={
        <View style={{borderRadius: 25, width: 50, height: 50, backgroundColor: COLOR.blue500, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#fff'}}>{props.score}</Text>
        </View>
      }
    />
  )
}
class Score extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: '我的成绩',
    headerLeft: <Icon name={'menu'} size={25} color={'#fff'} onPress={() => navigation.toggleDrawer()}/>,
    headerStyle: {
      backgroundColor: COLOR.blue500
    },
    headerTintColor: '#fff'
  })
  state = {
    data: []
  }
  componentDidMount() {
    fetch('http://localhost:1338/score')
      .then(res => {
        this.setState({
          data: JSON.parse(res._bodyInit).reverse()
        })
      })
  }
  _scoreFilter(year, term) {
    this.setState(prev => {
      return {
        data: prev.data.filter(item => item.year === year && item.term === term)
      }
    })
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => <ScoreItem {...item}/>}
        />
      </View>
    )
  }
}
const ScoreStatck = createStackNavigator({
  Home: {
    screen: Score
  }
})
ScoreStatck.navigationOptions = {
  drawerLabel: '我的成绩',
  drawerIcon: <FontAwesomeIcon name={'signal'} size={24}/>
}
export default ScoreStatck
