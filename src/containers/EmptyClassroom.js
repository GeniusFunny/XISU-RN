import React from 'react'
import {Snackbar, Button, TouchableRipple, Subheading, Colors, Appbar} from 'react-native-paper'
import {withNavigation} from 'react-navigation'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Picker, FlatList, View, Modal, DatePickerIOS} from 'react-native'
import EmptyClassroomItem from '../components/EmptyClassroomItem'
import store from '../stores/emptyClassroom'
import {updateTime, updateDate, fetchEmptyClassroom} from '../constants/emptyClassroom'
import WithStore from './WithStore'
import emptyClassroom from '../reducers/emptyClassroom'
import Spinner from 'react-native-loading-spinner-overlay'
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
class EmptyClassroom extends React.Component {
  state = {
    modalVisible: false,
    snackBarVisible: false
  }
  componentDidMount() {
    const {dispatch, date, time} = this.props
    dispatch(fetchEmptyClassroom(date, time))
  }
  setModalVisible = (visible) => {
    if (!visible) {
       const {
         dispatch,
         date,
         time
       } = this.props
       dispatch(fetchEmptyClassroom(date, time))
    }
    this.setState({
      modalVisible: visible
    })
  }
  setDate = date => {
    const {dispatch} = this.props
    dispatch(updateDate(date))
  }
  setTime = (time) => {
    const {dispatch} = this.props
    dispatch(updateTime(time))
  }
  render() {
    return (
      <View style={{flex: 1}}>
      	<Appbar style={{backgroundColor: Colors.deepPurple500}}>
        	<Appbar.BackAction onPress={() => this.props.navigation.goBack()}/>
        	<Appbar.Content title="空教室" />
      	</Appbar>
      	<Spinner
          visible={this.props.loading}
          textContent={'Loading...'}
        />
        <Snackbar onDismiss={() => this.setState({snackBarVisible: false})} visible={this.props.error}>
          {this.props.errMessage}
        </Snackbar>
        <TouchableRipple
          onPress={() => {
            this.setModalVisible(true)
          }}
          rippleColor='rgba(0, 0, 0, .32)'
          style={{...styles.floatingWindow, display: this.props.error ? 'none' : 'flex'}}>
          <Icon name={'edit'} size={22}/>
        </TouchableRipple>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={styles.modalContainer}>
            <Subheading>选择日期</Subheading>
            <DatePickerIOS
              onDateChange={this.setDate}
              date={this.props.date}
              mode={'date'}
              minimumDate={new Date()}
            />
            <Subheading>选择时间区间</Subheading>
            <Picker
              selectedValue={this.props.time}
              onValueChange={this.setTime}
            >
              <Picker.Item label="全天" value="8:00-22:00"/>
              <Picker.Item label="上午(8:00~12:00)" value="8:00-12:00" />
              <Picker.Item label="下午(14:00~18:00)" value="14:00-18:00" />
              <Picker.Item label="晚上(19:00~22:00)" value="19:00-22:00" />
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
        <FlatList
          data={this.props.list}
          renderItem={({item}) => <EmptyClassroomItem {...item}/>}
          keyExtractor={item => item.roomName}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  const {loading, list, date, time, error, errMessage} = state.emptyClassroom
  return {
    loading: loading,
    list: list,
    date: date,
    time: time,
    error: error,
    errMessage: errMessage
  }
}
export default WithStore(connect(mapStateToProps)(withNavigation(EmptyClassroom)), store)
