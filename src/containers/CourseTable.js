import React from 'react'
import {Snackbar} from 'react-native-paper'
import API_URLS from '../api/API_URLS'
import {FlatList, View} from 'react-native'
import CourseTableItem from '../components/CourseTableItem'
export default class CourseTable extends React.Component {
  static navigationOptions = {
    title: '课程表'
  }
  state = {
    snackBarVisible: false,
    data: []
  }
  componentDidMount() {
    fetch(API_URLS.schedule)
      .then(res => {
        let data = JSON.parse(res._bodyInit).map((item, index) => ({
          ...item,
          index: index
        }))
        this.setState({
          data: data
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          snackBarVisible: true
        })
      })
  }
  render() {
    return (
      <View>
        <Snackbar message={'获取数据失败，网络异常'} onDismiss={() => this.setState({snackBarVisible: false})} visible={this.state.snackBarVisible}/>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => <CourseTableItem {...item}/>}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}
