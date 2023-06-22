import React, { useCallback, useState } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    RefreshControl
} from 'react-native'

import { Stack, useRouter, useSearchParams } from 'expo-router';
import { Company, JobAbout, JobTabs, JobFooter, ScreenHeaderBtn, Specifics } from '../../components';
import { COLORS, SIZES, icons, images } from '../../constants';
import useFetch from '../../hook/useFetch';

const tabs = ['About', 'Qualifications', 'Responsibilities']

const JobDetails = () => {
    const router = useRouter();
    const params = useSearchParams();
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const { data, isLoading, error, refetch } = useFetch({ endpoint: `job-details`, query: { job_id: params.id } })

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, []);
    const displayTabContent = () => {
        switch (activeTab) {
            case 'About':
                return <JobAbout
                    info={data[0].job_description ? data[0].job_description : 'No Data Provided'}
                />
            case 'Qualifications':
                return <Specifics
                    title='Qualifications'
                    points={data[0].job_highlights?.Qualifications.length > 0 ? data[0].job_highlights?.Qualifications : ['N/A']}
                />
            case 'Responsibilities':

                return <Specifics
                    title='Responsibilities'
                    points={data[0].job_highlights?.Responsibilities ? data[0].job_highlights?.Responsibilities : ['N/A']}
                />
            default:
                return null;
        }
    }

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension='60%'
                        />
                    ),
                    headerTitle: "",

                }}
            />
            <>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                    {isLoading ? (
                        <ActivityIndicator size='large' color={COLORS.primary} />)
                        : error ? (
                            <Text>Something Went Wrong</Text>
                        ) : data.length === 0 ? (
                            <Text>No Data Found</Text>
                        ) : (
                            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                                <Company
                                    companyLogo={data[0].employer_logo}
                                    jobTitle={data[0].job_title}
                                    companyName={data[0].employer_name}
                                    location={data[0].job_country}

                                />

                                <JobTabs
                                    tabs={tabs}
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                />
                                {displayTabContent()}

                            </View>
                        )}



                </ScrollView>

                <JobFooter
                    url={data[0]?.job_google_link ? data[0]?.job_google_link : 'https://careers.google.com/jobs/results'}
                />
            </>


        </SafeAreaView>
    )
}

export default JobDetails;