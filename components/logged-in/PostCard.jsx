import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BorderlessButton, TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../../constants/theme"
import { Card, Avatar } from "react-native-paper";
import { Octicons } from "@expo/vector-icons";

const PostCard = ({ post }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.postCard}>
                {/* <View style={styles.textBox}>
                    <Text style={styles.text_username}>{post?.user_username}</Text>
                    <Text style={styles.text_content}>{post?.content}</Text>
                </View> */}
                <Card.Title
                key={post?.id}
                title = {post?.user_username}
                subtitle = {post?.content}
                subtitleNumberOfLines= {5}
                left={ () => <Avatar.Icon size={50} icon={(<Octicons name="person" size={12} color="black"/>)}/>}
                />
            </TouchableOpacity>
        </View>
    )
};

export default PostCard;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        marginVertical: 5,
        paddingVertical: 3,
        backgroundColor: COLORS.bg2,
        width: '80%',
        borderRadius: "15%"
    },  
    postCard: {
        margin: 3,
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
