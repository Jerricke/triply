import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter, Stack } from 'expo-router'
import { COLORS, SIZES } from '../constants/theme'

const signup = () => {
    const router = useRouter()

    function handleReturn() {
        router.push('/login')
    }

    function handleSignUp() {
        console.log("yayeet");
    }

    return (
        <SafeAreaView style={styles.sav}>
            <View style={{flex: 1}}>
                <TouchableOpacity style={styles.returner} onPress={handleReturn}>
                    <Text style={{ color: COLORS.bg2, fontSize: SIZES.medium}}>Return</Text>
                </TouchableOpacity>

                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputField} placeholder="Username"/>
                        <TextInput style={styles.inputField} placeholder="Email"/>
                        <TextInput style={styles.inputField} placeholder="Password"/>
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