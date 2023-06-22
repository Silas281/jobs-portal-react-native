import React, { useState } from 'react'
import {
  View, Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import { COLORS, icons, SIZES } from '../../../constants'
import { useRouter } from 'expo-router'

import styles from './popularjobs.style'
import useFetch from '../../../hook/useFetch'

const Popularjobs = () => {
  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState(false)
  const [selectedJob, setSelectedJob] = useState()

  const { data, isLoading, error, refetch } = useFetch({ endpoint: 'search', query: { query: 'web developer', page: '1', num_pages: '1' } });

  //console.log(data, isLoading, error)
  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity onPress={() => { }}>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (<ActivityIndicator size="large" color={COLORS.primary} />)
          : error ? (<Text>Something Went Wrong</Text>) : (
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <PopularJobCard
                  item={item}
                  selectedJob={selectedJob}

                />
              )}
              keyExtractor={item => item?.job_id}
              contentContainerStyle={{ columnGap: SIZES.medium }}
              horizontal
            />
          )
        }
      </View>
    </View>
  )
}

export default Popularjobs