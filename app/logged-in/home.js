import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'

const home = () => {
    // const data = useLocalSearchParams()
    // const data2 = useGlobalSearchParams()
    // console.log(data);
    // console.log(data2);

    return (
        <SafeAreaView>
            <Text>test</Text>
        </SafeAreaView>
    )
}

export default home