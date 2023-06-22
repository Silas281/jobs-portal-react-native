import React from 'react'
import {
  View, Text,
  TouchableOpacity,
  Image
} from 'react-native'
import { useRouter } from 'expo-router'
import styles from './popularjobcard.style'
import { checkImageUrl } from '../../../../utils'

const PopularJobCard = ({ item, selectedJob }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => {
        router.push(`/job-details/${item.job_id}`)
      }}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{
            uri: item?.employer_logo
          }}
          resizeMode="contain"
          style={styles.logoImage} />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>{item.employer_name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>{item.job_title}</Text>
        <Text style={styles.location} numberOfLines={1}>{item.job_country}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PopularJobCard