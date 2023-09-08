import { View, Text } from 'react-native'
import React from 'react'
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'

const currentUserProfile = () => {
    const data = useGlobalSearchParams()
    const userUID = data.path.split('=')[1]

    console.log(data.path);
    console.log(userUID);
    return (
      <View>
        <Text>profile</Text>
      </View>
  )
}

export default currentUserProfile