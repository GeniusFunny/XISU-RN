import React from 'react'
import {Snackbar, Button, TouchableRipple, Subheading, Colors} from 'react-native-paper'
import {Picker, FlatList, View, Modal} from 'react-native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import store from '../stores/school'
import ScoreItem from '../components/ScoreItem'
import WithStore from './WithStore'
import {fetchScore, updateScore, updateTerm, updateYear} from '../constants/school'
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
class Score extends React.Component {
  static navigationOptions = {
    headerTitle: '我的成绩',
  }
  state = {
    modalVisible: false,
    snackBarVisible: false,
  }
  componentDidMount() {
    const {dispatch} = this.props
    dispatch(fetchScore())
  }
  setModalVisible = visible => {
    if (!visible) {
      this._scoreFilter()
    }
    this.setState({
      modalVisible: visible
    })
  }
  _scoreFilter = () => {
    const {dispatch} = this.props
    dispatch(updateScore())
  }
  setTerm = itemValue => {
    const {dispatch} = this.props
    dispatch(updateTerm(itemValue))
  }
  setYear = itemValue => {
    const {dispatch} = this.props
    dispatch(updateYear(itemValue))
  }
  render() {
    return (
      <View>
        <Snackbar message={'获取数据失败，网络异常'} onDismiss={() => this.setState({snackBarVisible: false})} visible={this.state.snackBarVisible}/>
        <FlatList
          data={this.props.items}
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
              selectedValue={this.props.year}
              onValueChange={this.setYear}
            >
              <Picker.Item label="全部" value="全部"/>
              {
                this.props.years.map((item, index) => (
                  <Picker.Item label={item} value={item} key={index}/>
                ))
              }
            </Picker>
            <Subheading>选择学期</Subheading>
            <Picker
              selectedValue={this.props.term}
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
function mapStateToProps(state) {
  const {items, loading, year, term, store} = state.score
  const years = {}
  const terms = {}
  store.forEach(item => {
    years[item.year] = true
    terms[item.term] = true
  })
  return {
    year: year,
    term: term,
    loading: loading,
    items: items,
    store: items,
    years: Object.keys(years),
    terms: Object.keys(terms)
  }
}
export default WithStore(connect(mapStateToProps)(Score), store)