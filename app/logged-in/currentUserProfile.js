import { TouchableOpacity, View, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FBDB } from '../../firebaseConfig'
import { getDocs, query, collection, where } from 'firebase/firestore'
import { FlatList } from 'react-native-gesture-handler'
import { Avatar, Text } from 'react-native-paper';
import { COLORS, SIZES } from '../../constants/theme'
import useUser from '../../context/user/useUser'
import { signOut } from "firebase/auth";
import { FBAUTH } from '../../firebaseConfig'


const currentUserProfile = () => {
    const loc = useLocalSearchParams()
    const glob = useGlobalSearchParams()
    const userUID = glob.path.split('=')[1]
    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const { profile } = useUser();
    const auth = FBAUTH
    const router = useRouter()

    console.log(profile)

    const handleSignOut = () => {
        signOut(auth).then(() => {
        // Sign-out successful.
            router.push('/login')
        }).catch((error) => {
        // An error happened.
            alert(error.message)
        })
    }

    if (isLoading) {
        return (
            <SafeAreaView>
                <ActivityIndicator size='large' color={"black"} />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.pfpContainer}>
                {/* will change into image soon */}
                <Avatar.Text style={styles.pfpIcon} size={100} label="JE" /> 
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.profile}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 2, borderColor: "black", padding: 2}}>
                        <Text variant='titleMedium'>{userData.username}</Text>
                        <Text variant='titleSmall'>{userData.location}</Text>
                    </View>
                    <View style={{borderBottomWidth: 2, borderColor: "black", padding: 2}}>
                        <Text variant='titleMedium'>Distance Traveled: {userData.distance_traveled}</Text>
                    </View>
                    <View>
                        <Text variant='titleMedium'>{userData.bio}</Text>
                    </View>
                </View>
            </View>

            <View>
                <TouchableOpacity>
                    <Text onPress={handleSignOut}>Log Out</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tripContainer}>

            </View>
        </SafeAreaView>
    )
}

export default currentUserProfile

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
    },
    pfpContainer: {
        height: '25%',
        width: "100%",
        justifyContent: 'center',
        alignItems: 'start',
        paddingLeft: "10%",
        backgroundColor: COLORS.bg1,

    },
    bodyContainer: {
        alignItems: 'center',
        height: "auto",
        width: "100%",
        paddingVertical: 10,
        backgroundColor: COLORS.bg2,

    },
    profile: {
        gap: 10,
        justifyContent: 'start',
        width: "80%",
    },
    tripContainer: {}
})