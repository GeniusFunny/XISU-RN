import React from 'react'
import {Title} from 'react-native-paper'
import uiTheme from '../config'

const MainTitle = (props) => {
  return (
    <Title style={{fontSize: uiTheme.fontSize.title, ...props.style}}>
      {props.title}
    </Title>
  )
}
const SubTitle = (props) => {
  return (
    <Title style={{fontSize: uiTheme.fontSize.subTitle, ...props.style}}>
      {props.title}
    </Title>
  )
}

export {
  MainTitle,
  SubTitle
}
