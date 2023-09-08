import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router';

const signupProfile = () => {
    const router = useRouter()
    const data = useLocalSearchParams()
    console.log(data);
  return (
    <View>
      <Text>signupProfile</Text>
    </View>
  )
}

export default signupProfile

const styles = StyleSheet.create({})