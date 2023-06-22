import React from 'react'
import {
  View,
  Text,
  Image,
} from 'react-native'
import { icons } from '../../../constants'
import { checkImageUrl } from '../../../utils'
import styles from './company.style'

const Company = ({ companyLogo, jobTitle, companyName, location }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={{
            uri: companyLogo
          }}
          resizeMode="contain"
          style={styles.logoImage} />
      </View>
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle} numberOfLines={1}>{jobTitle}</Text>
      </View>
      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName} numberOfLines={1}>{companyName} / </Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode="contain"
            style={styles.locationImage} />
          <Text style={styles.locationName} numberOfLines={1}>{location}</Text>
        </View>
      </View>

    </View>
  )
}

export default Company