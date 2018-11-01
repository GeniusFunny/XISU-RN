import React from 'react'
import {connect} from 'react-redux'
import {Appbar, Snackbar, Colors, Text} from 'react-native-paper'
import {FlatList, View} from 'react-native'
import {withNavigation} from 'react-navigation'
import CourseTableItem from '../components/CourseTableItem'
import WithStore from './WithStore'
import store from '../stores/courseTable'
import {fetchCourseTable} from '../constants/courseTable'
import Spinner from 'react-native-loading-spinner-overlay'
class CourseTable extends React.Component {
  state = {
    snackBarVisible: false
  }
  componentDidMount() {
    const {dispatch} = this.props
    dispatch(fetchCourseTable())
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Appbar style={{backgroundColor: Colors.deepPurple500}}>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()}/>
          <Appbar.Content title="我的课程"/>
        </Appbar>
        <Spinner
          visible={this.props.loading}
          textContent={'Loading...'}
        />
        <Snackbar
          onDismiss={() => this.setState({snackBarVisible: false})} visible={this.props.error}
        >
          {this.props.errMessage}
        </Snackbar>
        <FlatList
          data={this.props.list}
          renderItem={({item}) => <CourseTableItem {...item}/>}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text>暂无数据</Text>}
        />
      </View>
    )
  }
}
function mapStateToProps(state) {
  const {loading, items, error, errMessage} = state.courseTable
  return {
    loading: loading,
    list: items,
    error: error,
    errMessage: errMessage
  }
}

export default WithStore(connect(mapStateToProps)(withNavigation(CourseTable)), store)

