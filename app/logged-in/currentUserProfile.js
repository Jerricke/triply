import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { signOut } from "firebase/auth";
import { getDocs, query, collection, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Avatar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS, SIZES } from "../../constants/theme";
import useUser from "../../context/user/useUser";
import { FBDB, FBAUTH } from "../../firebaseConfig";

const currentUserProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { profile, setUserID, getUserData } = useUser();
    const auth = FBAUTH;
    const router = useRouter();

    useEffect( () => {
        getUserData()
    }, [])

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            setUserID(null);
            router.push("/login");
        })
        .catch((error) => {
            // An error happened.
            alert(error.message);
        });
    };

    if (isLoading) {
        return (
        <SafeAreaView>
            <ActivityIndicator size="large" color="black" />
        </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
        <View style={styles.pfpContainer}>
            {/* will change into image soon */}
            <Avatar.Image style={styles?.pfpIcon} size={100} source={{uri: profile.profile_pic}} />
        </View>
        <View style={styles.bodyContainer}>
            <View style={styles.profile}>
            <View
                style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomWidth: 2,
                borderColor: "black",
                padding: 2,
                }}
            >
                <Text variant="titleMedium">{profile?.username}</Text>
                <Text variant="titleSmall">{profile?.location}</Text>
            </View>
            <View
                style={{ borderBottomWidth: 2, borderColor: "black", padding: 2 }}
            >
                <Text variant="titleMedium">
                Distance Traveled: {profile?.distance_traveled}
                </Text>
            </View>
            <View>
                <Text variant="titleMedium">{profile?.bio}</Text>
            </View>
            </View>
        </View>

        <View>
            <TouchableOpacity>
            <Text onPress={handleSignOut}>Log Out</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.tripContainer} />
        </SafeAreaView>
    );
};

export default currentUserProfile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },
  pfpContainer: {
    height: "25%",
    width: "100%",
    justifyContent: "center",
    alignItems: "start",
    paddingLeft: "10%",
    backgroundColor: COLORS.bg1,
  },
  bodyContainer: {
    alignItems: "center",
    height: "auto",
    width: "100%",
    paddingVertical: 10,
    backgroundColor: COLORS.bg2,
  },
  profile: {
    gap: 10,
    justifyContent: "start",
    width: "80%",
  },
  tripContainer: {},
});
