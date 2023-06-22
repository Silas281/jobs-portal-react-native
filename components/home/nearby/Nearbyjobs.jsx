import React from 'react'
import {
  View, Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import { COLORS } from '../../../constants'
import { useRouter } from 'expo-router'

import styles from './nearbyjobs.style'
import useFetch from '../../../hook/useFetch'

const Nearbyjobs = () => {
  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState(false)

  const { data, isLoading, error, refetch } = useFetch({ endpoint: 'search', query: { query: 'web developer', page: '1', num_pages: '1' } });

  //console.log(data, isLoading, error)
  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity onPress={() => { }}>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (<ActivityIndicator size="large" color={COLORS.primary} />)
          : error ? (<Text>Something Went Wrong</Text>) : (
            data?.map((job, index) => (
              <NearbyJobCard
                key={`nearby-job-${job?.job_id}`}
                job={job}
                handleNavigate={() => router.push(`/job-details/${job.job_id}`)
                }
              />
            ))
          )
        }
      </View>
    </View>
  )
}

export default Nearbyjobs;