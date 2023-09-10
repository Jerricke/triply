import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BorderlessButton, TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../../constants/theme"

const PostCard = ({ post }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.postCard}>
                <View style={styles.textBox}>
                    <Text style={styles.text_username}>{post?.user_username}</Text>
                    <Text style={styles.text_content}>{post?.content}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};

export default PostCard;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        marginVertical: 2,
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: COLORS.bg2,
        width: '80%',
        borderRadius: "15%"
    },  
    postCard: {
        margin: 5,
        marginHorizontal: 10
    },
    textBox: {
        width: '80%',
    },
    text_username: {
        fontSize: SIZES.large,
        marginBottom: 10,
    },
    text_content: {
        fontSize: SIZES.medium
    },
});
