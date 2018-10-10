import {View, FlatList, Text} from 'react-native'
import React from 'react'
import {ListItem} from 'react-native-material-ui'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import * as COLOR from 'react-native-material-ui/src/styles/colors'
import {createStackNavigator} from 'react-navigation'

const ClassRoomItem = (props) => {
  return (
    <ListItem
      divider
      centerElement={{
        primaryText: props.roomName,
        secondaryText:`${props.location} ${props.type}`
      }}
      rightElement={
        <View style={{ borderRadius: 25, width: 50, height: 50, backgroundColor: COLOR.blue500, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#fff'}}>{props.size}</Text>
        </View>
      }
    />
  )
}
class ClassRoom extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: '自习室',
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
    fetch('http://localhost:1338/classroom')
      .then(res => {
        this.setState({
          data: JSON.parse(res._bodyInit).reverse()
        })
      })
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => <ClassRoomItem {...item}/>}
        />
      </View>
    )
  }
}
const ClassRoomStatck = createStackNavigator({
  Home: {
    screen: ClassRoom
  }
})
ClassRoomStatck.navigationOptions = {
  drawerLabel: '自习室',
  drawerIcon: <FontAwesomeIcon name={'calendar'} size={24}/>
}
export default ClassRoomStatck
