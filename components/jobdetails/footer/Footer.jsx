import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking

} from 'react-native'

import { icons } from '../../../constants'
import styles from './footer.style'

const Footer = ({ url }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn}>
        <Image
          source={icons.heartOutline}
          resizeMode="contain"
          style={styles.likeBtnImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL(url)}
        style={styles.applyBtn}
      >
        <Text style={styles.applyBtnText}>Apply for Job</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer