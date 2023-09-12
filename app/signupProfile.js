import { useRouter, useLocalSearchParams } from "expo-router";
import {
createUserWithEmailAndPassword,
onAuthStateChanged,
} from "firebase/auth";
import {
Firestore,
addDoc,
collection,
doc,
setDoc,
serverTimestamp,
} from "firebase/firestore";
import React, { useState } from "react";
import {
TouchableOpacity,
TextInput,
StyleSheet,
Text,
View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS, SIZES } from "../constants/theme";
import useUser from "../context/user/useUser";
import { FBAUTH, FBDB, FBSTORAGE } from "../firebaseConfig";
import { ActivityIndicator, Avatar, Button } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const signupProfile = () => {
    const router = useRouter();
    const data = useLocalSearchParams();
    const auth = FBAUTH;
    const { setUserID, setProfile } = useUser();

    const [age, setAge] = useState(0);
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async () => {
        let isSuccess = false;
        let uid;
        try {
        const response = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password,
        );
        uid = response.user.uid;
        isSuccess = true;
        } catch (err) {
        console.log("Sign up failed: " + err.message);
        }
        if (isSuccess) {
        createUser(uid);
        // setUserID(uid)

        }
    };

    const createUser = async (uid) => {
        const image_uri = await uploadImageAsync(image);
        const userCollection = collection(FBDB, "users");
        const profile = {
        email: data.email,
        username: data.username,
        location,
        age,
        bio,
        distance_traveled: 0,
        created_at: serverTimestamp(),
        profile_pic: image_uri
        };
        const userRef = doc(userCollection, uid);
        const userData = await setDoc(userRef, profile);
        setUserID(uid);
    };

    const pickImage = async () => {
        setIsLoading(true)
        let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        
            // console.log(result);
        
            if (!result.canceled) {
                setImage(result.assets[0].uri);
                setInterval(() => {
                    setIsLoading(false)
                }, 2000)
            } else {
                setInterval(() => {
                    setImage(null);
                    setIsLoading(false)
                }, 2000)
            }
    }

    const handleRemoveImage = () => {
        setImage(null)
    }

    const uploadImageAsync = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              resolve(xhr.response);
            };
            xhr.onerror = function (e) {
              console.log(e);
              reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
          });
        
        try{
            const fileRef = ref(FBSTORAGE, `userProfiles/image-${Date.now()}`);
            console.log(fileRef);
            const result = await uploadBytes(fileRef, blob);
            
            // We're done with the blob, close and release it
            blob.close();
            const uploaded = await getDownloadURL(fileRef);
            return uploaded
        } catch (e) {
            alert(`Error :  ${e}`)
        }
        
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
                {
                    !image ? (
                        <TouchableOpacity style={{padding: 5,  
                            backgroundColor: 'white', 
                            borderRadius: "10%", 
                            alignItems: 'center'}} 
                        onPress={pickImage}>
                            { isLoading ? (
                                <View>
                                    <ActivityIndicator color={COLORS.fg2}/>
                                </View>
                            ) : (
                                <Text style={{color: COLORS.fg2}} >Pick An Image</Text>
                            )
                        }
                        </TouchableOpacity>
                    ) : (
                        <View style={{padding:10, alignItems: 'center', justifyContent: 'center', gap: 5}}>
                            <Avatar.Image size={96} source={{uri: image}} />
                            <Button buttonColor='white' textColor={COLORS.fg2} mode="text" onPress={handleRemoveImage}>Remove Image</Button>
                        </View>
                    )
                }
                <TextInput
                    style={styles.inputField}
                    placeholder="Location"
                    onChangeText={(text) => setLocation(text)}
                    value={location}
                />
                <TextInput
                    style={styles.inputField}
                    keyboardType="numeric"
                    placeholder="Age"
                    onChangeText={(text) => setAge(parseInt(text))}
                    value={parseInt(age)}
                />
                <TextInput
                    style={[styles.inputField, { height: "auto" }]}
                    multiline
                    placeholder="Personal Bio"
                    onChangeText={(text) => setBio(text)}
                    value={bio}
                />
            </View>

            <View>
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text>Complete Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
    );
};

export default signupProfile;

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
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    button: {
        backgroundColor: COLORS.fg1,
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
});
