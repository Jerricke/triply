import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../constants/theme'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import useUser from '../../context/user/useUser'
import {addDoc,collection,serverTimestamp} from "firebase/firestore";
import { FBDB } from '../../firebaseConfig'

const NewPost = () => {
    const [content, setContent] = useState("")
    const {userID, profile} = useUser()


    const handleCreatePost = async () => {
        const post = {
            content: content,
            user_id: userID,
            user_username: profile.username,
            created_at: serverTimestamp(),
        }
        const ref = collection(FBDB, "community-posts")
        const useRef = await addDoc(ref, post)
        setContent("")
    }

    return (
        <View style={styles.container}>
            <View  style={styles.textInput}>
                <TextInput style={{marginHorizontal: 5}} multiline placeholder='New Post' onChangeText={text => setContent(text)} value={content}/>
            </View>
            <View style={styles.postBtnContainer}>
                <TouchableOpacity style={styles.postBtn} onPress={handleCreatePost}>
                    <Text>Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NewPost

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: '15%',
        width: '90%',
        backgroundColor: COLORS.fg2,
    },
    textInput: {
        marginTop: 10,
        width: '95%',
        height: "50%",
        backgroundColor: COLORS.bg2,
        borderRadius: '10%',
    },
    postBtnContainer: {
        flex: 1,
        width: '95%',
        marginTop: 10,
        alignItems: "flex-end",
    },
    postBtn: {
        backgroundColor: COLORS.bg1,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: '10%',
    }

})