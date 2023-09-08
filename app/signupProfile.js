import { TouchableOpacity, TextInput, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { FBAUTH, FBDB } from '../firebaseConfig'

import { COLORS, SIZES } from "../constants/theme"

const signupProfile = () => {
    const router = useRouter()
    const data = useLocalSearchParams()
    console.log(data);

    const [age, setAge] = useState("")
    const [location, setLocation] = useState("")
    const [bio, setBio] = useState("")

    const handleSignUp = async () => {
        // let isSuccess = false;
        // try {
        //     const response = await createUserWithEmailAndPassword(auth, data.email, data.password)
        //     console.log(response);
        //     isSuccess = true;
        // } catch (err) {
        //     console.log("Sign up failed: " + err.message);
        // }
        // if (isSuccess) {
        //     router.push('/logged-in/home');
        //     createUser()
        // }
    }
    
    const createUser = async () => {
        const userData = await addDoc(collection(FBDB, "users"), {email: data.email, username: data.username});
    }
    return (
        <SafeAreaView>
            <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputField} placeholder="Location"/>
                        <TextInput style={styles.inputField} placeholder="Age"/>
                        <TextInput style={[styles.inputField, { height: "auto"}]} multiline={true} placeholder="Personal Bio"/>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                            <Text>Sign Up</Text>
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