import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import uiTheme from '../config'

const AppIcon = (props) => {
  return (
    <Icon size={uiTheme.header.icon.size} color={uiTheme.palette.FontColor} {...props}/>
  )
}
export default AppIcon
