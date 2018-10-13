import {View, FlatList, Text, TouchableHighlight, Modal, ScrollView, Picker, Button, StyleSheet} from 'react-native'
import React from 'react'
import {List} from 'react-native-paper'
import {Snackbar, ThemeContext, getTheme} from 'react-native-material-ui'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import {createStackNavigator} from 'react-navigation'
import API_URL from '../api'
import uiTheme from '../config'
import AppIcon from '../components/AppIcon'
import AppText from '../components/AppText'
import {Divider} from 'react-native-paper'
import {SubTitle} from '../components/AppTitle'
const styles = {
  listItem: {
    leftElementContainer: {
      borderRadius: 25,
      width: 50,
      height: 50,
      backgroundColor: uiTheme.palette.primaryColor,
      justifyContent: 'center',
      alignItems: 'center'
    },
    leftElement: {
      color: uiTheme.palette.FontColor
    }
  },
  floatingWindow: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: uiTheme.palette.SecondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 20,
    zIndex: 999
  },
  modalContentContainer: {
    marginTop: 22,
    padding: 10
  }
}
const ScoreItem = (props) => {
  let term = props.year + (props.term === '1' ? ' 第一学期' : ' 第二学期')
  return (
    <View>
      <List.Item
        title={<AppText text={`${props.className} `}/>}
        description={<AppText text={`${term} ${props.kind}`} style={{fontSize: uiTheme.fontSize.subText, color: uiTheme.palette.infoColor}}/>}
        left={() => <View style={styles.listItem.leftElementContainer}>
          <Text style={styles.listItem.leftElement}>{props.score}</Text>
        </View>}
      />
      <Divider/>
    </View>
  )
}
class Score extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: '我的成绩',
    headerLeft: <AppIcon name={'menu'} onPress={() => navigation.toggleDrawer()}/>,
    headerStyle: {
      backgroundColor: uiTheme.palette.primaryColor
    },
    headerTintColor: uiTheme.palette.FontColor
  })
  state = {
    modalVisible: false,
    snackBarVisible: false,
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
      .catch(err => {
        console.log(err)
        this.setState({
          snackBarVisible: true
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
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <Snackbar message={'获取数据失败，网络异常'} onRequestClose={() => this.setState({snackBarVisible: false})} visible={this.state.snackBarVisible}/>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => <ScoreItem {...item}/>}
          keyExtractor={item => item.id}
        />
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true)
          }}
          style={styles.floatingWindow}>
          <AppIcon name={'edit'}/>
        </TouchableHighlight>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <ScrollView style={styles.modalContentContainer}>
            <View>
              <SubTitle title={'选择学年'}/>
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
              <SubTitle title={'选择学期'}/>
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
      </ThemeContext.Provider>
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
