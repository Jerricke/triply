import { KeyboardAvoidingView, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import { useRouter } from "expo-router";

import { signInWithEmailAndPassword } from "firebase/auth"
import { FBAUTH } from '../../firebaseConfig';
import useUser from '../../context/user/useUser';

const LoginMenu = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();
    const auth = FBAUTH;
    const { setUserID } = useUser()

    function handleRegisterPress() {
        router.push('/signup');
    }

    const handleSignIn = async () => {
        let uid;
        let isSuccess = false;
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            isSuccess = true;
            uid = response.user.uid
            setUserID(uid)
        } catch (err) {
            alert("Sign in failed: " + err.message)
        } 
        if (isSuccess) {
            router.push({pathname: '/logged-in/home', params: {userUID: uid}});
        }
    }

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
        >
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} autoCapitalize='none' placeholder='Email' value={email} onChangeText={text => setEmail(text)}/>
                <TextInput style={styles.input} autoCapitalize='none' placeholder='Password' value={password} onChangeText={text => setPassword(text)}/>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSignIn} >
                    <Text style={{fontSize: SIZES.medium}}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.noAcc}>Dont have an account yet?</Text>
                <TouchableOpacity style={styles.button2} onPress={handleRegisterPress} >
                    <Text style={{fontSize: SIZES.medium}}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginMenu

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer : {
        width: '80%',
        backgroundColor: COLORS.fg2,
        borderRadius: 10,
        padding: SIZES.xLarge,
        gap: 5
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonContainer: {
        width: '60%',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: COLORS.fg1,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    button2: {
        backgroundColor: COLORS.fg1,
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    noAcc: {
        marginTop: 40,
        fontSize: SIZES.small,
        fontWeight: "bold",
    }
})