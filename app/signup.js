import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useRouter, Stack } from 'expo-router'
import { COLORS, SIZES } from '../constants/theme'
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { FBAUTH, FBDB } from '../firebaseConfig'
import { SafeAreaView } from 'react-native-safe-area-context'
import { addDoc, collection } from 'firebase/firestore'

const signup = () => {
    const router = useRouter()
    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const auth = FBAUTH;

    function handleReturn() {
        router.push('/login')
    }

    function handleSignUpClick() {
        if (username.length <= 6) {
            alert("Please enter a username longer than 6 characters")
        } else if (!email) {
            alert('Email is required.')
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Email is invalid.')
        } else if (!password) {
            alert('Password is required.')
        } else if (password.length < 6) {
            alert('Password must be at least 6 characters.')
        } else {
            router.push({pathname: '/signupProfile', params: {
                username: username,
                email: email,
                password: password
            }})
            setEmail("")
            setPassword("")
            setUsername("")
        }
    }

    // useEffect( () => {
    //     onAuthStateChanged(auth, user => { 
    //         console.log('Auth change');
    //     })
    // }, [])


    return (
        <SafeAreaView style={styles.sav}>
            <View style={{flex: 1 }}>
                <TouchableOpacity style={styles.returner} onPress={handleReturn}>
                    <Text style={{ color: COLORS.bg2, fontSize: SIZES.medium}}>Return</Text>
                </TouchableOpacity>

                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputField} autoCapitalize='none' placeholder="Username" onChangeText={text => setUsername(text)} value={username}/>
                        <TextInput style={styles.inputField} autoCapitalize='none' placeholder="Email" onChangeText={text => setEmail(text)} value={email}/>
                        <TextInput style={styles.inputField} autoCapitalize='none' placeholder="Password" onChangeText={text => setPassword(text)} value={password}/>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.button} onPress={handleSignUpClick}>
                            <Text>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </SafeAreaView>
  )
}

export default signup

const styles = StyleSheet.create({
    sav: {
        flex: 1,
    },
    returner: {
        padding: 5,
        marginLeft: 5,
        backgroundColor: COLORS.fg2,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        width: "20%",
    },
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