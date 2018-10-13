import React from 'react'
import {Paragraph} from 'react-native-paper'
import uiTheme from '../config'

const AppText = (props) => {
  return (
    <Paragraph style={{fontSize: uiTheme.fontSize.text, ...props.style, fontFamily: uiTheme.fontFamily}}>
      {props.text}
    </Paragraph>
  )
}

export default AppText
