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

const EmptyClassroomItem = (props) => {
  return (
    <>
      <List.Item
        title={props.roomName}
        description={`${props.date} ${props.time}`}
        left={() => <View style={styles.leftElement}>
          <Text>{props.size}</Text>
        </View>}
      />
      <Divider/>
    </>
  )
}
export default EmptyClassroomItem
