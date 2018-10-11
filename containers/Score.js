import {View, FlatList, Text, TouchableHighlight, Modal, ScrollView, Picker, Button} from 'react-native'
import React from 'react'
import {ListItem, } from 'react-native-material-ui'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import * as COLOR from 'react-native-material-ui/src/styles/colors'
import {createStackNavigator} from 'react-navigation'
import API_URL from '../api'
const ScoreItem = (props) => {
  return (
    <ListItem
      divider
      centerElement={{
        primaryText: props.className,
        secondaryText: props.year + (props.term === '1' ? ' 第一学期' : ' 第二学期') + ' ' + props.kind
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
    modalVisible: false,
    data: [],
    store: [],
    years: [],
    term: '全部',
    year: '全部'
  }
  componentDidMount() {
    fetch(API_URL.score)
      .then(res => {
        let data = JSON.parse(res._bodyInit)
        let years = {}
        let kinds = {}
        data.forEach(item => {
          years[item.year] = true
          kinds[item.kind] = true
        })
        this.setState({
          data: data,
          store: data,
          years: Object.keys(years),
          kinds: Object.keys(kinds)
        })
      })
  }

  setModalVisible = visible => {
    if (!visible) {
      this._scoreFilter(this.state.year, this.state.term)
    }
    this.setState({
      modalVisible: visible
    })
  }
  _scoreFilter = (year, term) => {
    console.warn(year, term)
    this.setState(prev => {
      return {
        data: prev.store.filter(item => {
          if (year === '全部') {
            return true
          } else if (year === item.year) {
            return true
          }
          return false
        }).filter(item => {
          if (term === '全部') {
            return true
          } else if (term === item.term) {
            return true
          }
          return false
        })
      }
    })
  }
  setTerm = itemValue => {
    this.setState({
      term: itemValue
    })
  }
  setYear = itemValue => {
    this.setState({
      year: itemValue
    })
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => <ScoreItem {...item}/>}
        />
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true)
          }}
          style={{height: 50, width: 50, borderRadius: 25, backgroundColor: COLOR.pink500, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 50, bottom: 50, zIndex: 999 }}        >
          <Icon name={'edit'} size={25} color={'#fff'} />
        </TouchableHighlight>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <ScrollView style={{ marginTop: 22, padding: 10 }}>
            <View>
              <Text style={{fontSize: 18}}>选择学年</Text>
              <Picker
                selectedValue={this.state.year}
                onValueChange={this.setYear}
              >
                <Picker.Item label="全部" value="全部"/>
                {
                  this.state.years.map((item, index) => (
                    <Picker.Item label={item} value={item} key={index}/>
                  ))
                }
              </Picker>
              <Text style={{fontSize: 18}}>选择学期</Text>
              <Picker
                selectedValue={this.state.term}
                onValueChange={this.setTerm}
              >
                <Picker.Item label="全部" value="全部"/>
                <Picker.Item label="第一学期" value="1" />
                <Picker.Item label="第二学期" value="2" />
              </Picker>
              <Button
                title={'确认'}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}/>
            </View>
          </ScrollView>
        </Modal>
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
