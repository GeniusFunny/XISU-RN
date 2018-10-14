import React from 'react'
import API_URLS from '../api/API_URLS'
import {Snackbar, Button, TouchableRipple, Subheading, Colors} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Picker, FlatList, View, Modal} from 'react-native'
import ScoreItem from '../components/ScoreItem'

const styles = {
  modalContainer: {
    padding: 10,
    paddingTop: 20
  },
  floatingWindow: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: Colors.teal200,
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 20,
    zIndex: 999
  },
  modalContentContainer: {
    marginTop: 22,
    padding: 10
  },
  buttonContainer: {
    paddingLeft: 120,
    paddingRight: 120,
    marginTop: 50
  }
}
export default class Score extends React.Component {
  static navigationOptions = {
    headerTitle: '我的成绩',
  }
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
    fetch(API_URLS.score)
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
        console.warn(err)
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
      <View>
        <Snackbar message={'获取数据失败，网络异常'} onDismiss={() => this.setState({snackBarVisible: false})} visible={this.state.snackBarVisible}/>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => <ScoreItem {...item}/>}
          keyExtractor={item => item.id}
        />
        <TouchableRipple
          onPress={() => {
            this.setModalVisible(true)
          }}
          rippleColor='rgba(0, 0, 0, .32)'
          style={styles.floatingWindow}>
          <Icon name={'edit'} size={22}/>
        </TouchableRipple>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={styles.modalContainer}>
            <Subheading>选择学年</Subheading>
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
            <Subheading>选择学期</Subheading>
            <Picker
              selectedValue={this.state.term}
              onValueChange={this.setTerm}
            >
              <Picker.Item label="全部" value="全部"/>
              <Picker.Item label="第一学期" value="1" />
              <Picker.Item label="第二学期" value="2" />
            </Picker>
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                color={Colors.grey300}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                确认
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
