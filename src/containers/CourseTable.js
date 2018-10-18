import React from 'react'
import {connect} from 'react-redux'
import {Snackbar} from 'react-native-paper'
import {FlatList, View} from 'react-native'
import CourseTableItem from '../components/CourseTableItem'
import WithStore from './WithStore'
import store from '../stores/courseTable'
import {fetchCourseTable} from '../constants/courseTable'
class CourseTable extends React.Component {
  static navigationOptions = {
    title: '课程表'
  }
  state = {
    snackBarVisible: false
  }
  componentDidMount() {
    const {dispatch} = this.props
    dispatch(fetchCourseTable())
  }
  render() {
    return (
      <View>
        <Snackbar message={'获取数据失败，网络异常'} onDismiss={() => this.setState({snackBarVisible: false})} visible={this.state.snackBarVisible}/>
        <FlatList
          data={this.props.list}
          renderItem={({item}) => <CourseTableItem {...item}/>}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}
function mapStateToProps(state) {
  const {loading, list} = state.courseTable
  return {
    loading: loading,
    list: list
  }
}

export default WithStore(connect(mapStateToProps)(CourseTable), store)

