import React from 'react'
import {View, Image} from 'react-native'
import {WIDTH} from '../config'

const styles = {
  normalItem: {
    img: {
      width: WIDTH / 3,
      height: 120,
    },
    root: {
      flexDirection: 'row',
      marginLeft: -0.5,
      marginRight: -0.5
    },
    imgContainer: {
      padding: 0.5
    }
  },
  comboItem: {
    img: {
      width: WIDTH / 3,
      height: 120,
      padding: 0.5
    },
    imgContainer: {
      padding: 0.5
    },
    root: {
      flexDirection: 'row',
      marginLeft: -0.5,
      marginRight: -0.5
    },
    bigImg: {
      width: WIDTH / 3 * 2,
      height: 240,
    },
    bigImgContainer: {
      padding: 0.5
    }
  }
}
const NormalItem = (props) => {
  const images = props.items
  return (
    <View style={styles.normalItem.root}>
      {
        images.map((item, index) => {
          return (
            <View style={styles.normalItem.imgContainer} key={index + item}>
              <Image source={item} style={styles.normalItem.img}/>
            </View>
          )
        })
      }
    </View>
  )
}
const ComboItem = (props) => {
  const images = props.items
  return (
    <View style={styles.comboItem.root}>
      <View>
        <View style={styles.comboItem.imgContainer}>
          <Image source={images[0]} style={styles.comboItem.img}/>
        </View>
        <View style={styles.comboItem.imgContainer}>
          <Image source={images[1]} style={styles.comboItem.img}/>
        </View>
      </View>
      <View style={styles.comboItem.bigImgContainer}>
        <Image source={images[2]} style={styles.comboItem.bigImg}/>
      </View>
    </View>
  )
}
const ExploreItem = (props) => {
  if ((props.index + 1) % 3 === 2 && props.data.img.length === 3) {
    return <ComboItem items={props.data.img}/>
  } else {
    return <NormalItem items={props.data.img}/>
  }
}

export default ExploreItem
