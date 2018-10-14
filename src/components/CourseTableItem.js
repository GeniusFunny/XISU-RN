import React from 'react'
import {Card, Text, Subheading} from 'react-native-paper'

const CourseTableItem = (props) => {
  let icon = require('../../assets/imgs/material-10.png')
  let iconIndex = props.index % 8
  switch (iconIndex) {
    case 1:
      icon = require('../../assets/imgs/material-1.png')
      break
    case 2:
      icon = require('../../assets/imgs/material-2.png')
      break
    case 3:
      icon = require('../../assets/imgs/material-3.png')
      break
    case 4:
      icon = require('../../assets/imgs/material-4.png')
      break
    case 5:
      icon = require('../../assets/imgs/material-5.png')
      break
    case 6:
      icon = require('../../assets/imgs/material-7.png')
      break
    case 7:
      icon = require('../../assets/imgs/material-8.png')
      break
    case 8:
      icon = require('../../assets/imgs/material-9.png')
      break
    default:
      break
  }
  return (
    <Card elevation={5} style={{marginBottom: 10}}>
      <Card.Cover source={icon}/>
      <Card.Content>
        <Subheading>
          {props.courseName}
        </Subheading>
        <Text>
          授课教师：{props.teacher}
        </Text>
        <Text>
          课程安排：第{props.plan}周
        </Text>
        <Text>
          教室：{props.classroom}
        </Text>
      </Card.Content>
    </Card>
  )
}
export default CourseTableItem
