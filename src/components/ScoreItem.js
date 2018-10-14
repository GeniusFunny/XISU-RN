import React from 'react'
import {Text, List, Divider, Colors} from 'react-native-paper'
import {View} from 'react-native'

const styles = {
  leftElement: {
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.deepPurple200
  }
}

const ScoreItem = (props) => {
  let term = props.year + (props.term === '1' ? ' 第一学期' : ' 第二学期')
  return (
    <>
      <List.Item
        title={props.className}
        description={term + props.kind}
        left={() => <View style={styles.leftElement}><Text>{props.score}</Text></View>}
      />
      <Divider/>
    </>
  )
}
export default ScoreItem
