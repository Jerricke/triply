import { TouchableOpacity, TextInput, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { FBAUTH, FBDB } from '../firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'

import { COLORS, SIZES } from "../constants/theme"

const signupProfile = () => {
    const router = useRouter()
    const data = useLocalSearchParams()
    const auth = FBAUTH;

    const [age, setAge] = useState(0)
    const [location, setLocation] = useState("")
    const [bio, setBio] = useState("")

    const handleSignUp = async () => {
        let isSuccess = false;
        let uid;
        try {
            const response = await createUserWithEmailAndPassword(auth, data.email, data.password)
            uid = response.user.uid
            isSuccess = true;
        } catch (err) {
            console.log("Sign up failed: " + err.message);
        }
        if (isSuccess) {
            createUser(uid)
            router.push({pathname: '/logged-in/home', params: {
                userUID: uid,
            }});
        }
    }
    
    const createUser = async (uid) => {
        const userData = await addDoc(collection(FBDB, "users"), {email: data.email, username: data.username, location: location, age: age, bio: bio, uid: uid});
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputField} placeholder="Location" onChangeText={text => setLocation(text)} value={location}/>
                        <TextInput style={styles.inputField} keyboardType='numeric' placeholder="Age" onChangeText={text => setAge(parseInt(text))} value={parseInt(age)}/>
                        <TextInput style={[styles.inputField, { height: "auto"}]} multiline={true} placeholder="Personal Bio" onChangeText={text => setBio(text)} value={bio}/>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                            <Text>Complete Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </SafeAreaView>
    )
}

export default signupProfile

const styles = StyleSheet.create({
    formContainer: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        gap: 5,
    },
    inputContainer: {
        width: "60%",
        padding: 10,
        backgroundColor: COLORS.fg2,
        borderRadius: 10,
    },
    inputField: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    button: {
        backgroundColor: COLORS.fg1,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    }
})
