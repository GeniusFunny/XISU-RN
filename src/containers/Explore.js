import React from 'react'
import {View, FlatList} from 'react-native'
import {Searchbar} from 'react-native-paper'
import ExploreItem from '../components/ExploreItem'

const styles = {
  root: {
    paddingBottom: 100
  },
  header: {
    padding: 5,
    paddingTop: 20,
    paddingBottom: 10
  }
}
export default class Explore extends React.Component {
  state = {
    firstQuery: '',
    data: [
      {
        img: [
          require('../../assets/imgs/material-9.png'),
          require('../../assets/imgs/material-8.png'),
          require('../../assets/imgs/material-7.png'),
        ]
      }, {
        img: [
          require('../../assets/imgs/material-6.png'),
          require('../../assets/imgs/material-5.png'),
          require('../../assets/imgs/material-4.png'),
        ]
      }, {
        img: [
          require('../../assets/imgs/material-3.png'),
          require('../../assets/imgs/material-2.png'),
          require('../../assets/imgs/material-1.png'),
        ]
      }, {
        img: [
          require('../../assets/imgs/material-10.png'),
          require('../../assets/imgs/material-11.png'),
          require('../../assets/imgs/material-12.png'),
        ]
      }, {
        img: [
          require('../../assets/imgs/material-13.png'),
          require('../../assets/imgs/material-14.png'),
          require('../../assets/imgs/material-15.png'),
        ]
      }, {
        img: [
          require('../../assets/imgs/material-16.png'),
          require('../../assets/imgs/material-17.png'),
          require('../../assets/imgs/material-18.png'),
        ]
      }, {
        img: [
          require('../../assets/imgs/material-19.png'),
          require('../../assets/imgs/material-10.png'),
          require('../../assets/imgs/material-11.png')
        ]
      }
    ]
  }
  render() {
    const query = this.state.firstQuery
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({item, index}) => {
            return <ExploreItem data={item} index={index}/>
          }}
          keyExtractor={(item, index) => index.toString()}
          style={styles.content}
          ListHeaderComponent={<View style={styles.header}>
            <Searchbar
              value={this.state.firstQuery}
              onChangeText={query => {this.setState({firstQuery: query})}}
            />
          </View>}
        />
      </View>
    )
  }
}
