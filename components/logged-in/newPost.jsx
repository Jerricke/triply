import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../constants/theme'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

const NewPost = () => {
    const [post, setPost] = useState("")

    const handleCreatePost = () => {}

    return (
        <View style={styles.container}>
            <View  style={styles.textInput}>
                <TextInput style={{marginHorizontal: 5}} multiline placeholder='New Post' onChangeText={text => setPost(text)} value={post}/>
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
        backgroundColor: COLORS.fg1,
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