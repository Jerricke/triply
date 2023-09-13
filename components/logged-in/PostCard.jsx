import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View, Text } from "react-native";
import { TextInput, TouchableOpacity} from "react-native-gesture-handler";
import { COLORS, SIZES } from "../../constants/theme"
import { Card, Avatar, IconButton } from "react-native-paper";
import { Octicons } from "@expo/vector-icons";
import useUser from "../../context/user/useUser";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { FBDB } from "../../firebaseConfig";

const PostCard = ({ post }) => {
    const { userID } = useUser()
    const [text, setText] = useState(post?.content);
    const [editing, setEditing] = useState(false);
    const [isShow, setIsShow] = useState(false)

    let isOwner = false

    // console.log(post);
    // console.log(userID, " split ", post.user_id);

    if (userID === post.user_id) {
        isOwner = true;
    }
  
    const handlePress = () => {
        setEditing(true);
    };
  
    const handleSave = async () => {
        await setDoc(doc(FBDB, "community-posts", `${post.id}`), {
            ...post,
            content: text
          });
        setEditing(false);

    };
  
    const handleChangeText = (newText) => {
        setText(newText);
    };

    const showContent = () => {
        setIsShow(!isShow);
    };

    const handleDelete = async () => {
        await deleteDoc(doc(FBDB, "community-posts", `${post.id}`));
    }; 


    return (
        <View style={[styles.container, isOwner ? {backgroundColor: COLORS.fg1} : {backgroundColor: COLORS.bg2} ]}>
            {
                editing ? (
                    <View style={styles.textEditContainer}>
                        <TextInput
                        value={text}
                        onChangeText={handleChangeText}
                        onBlur={handleSave}
                        autoFocus
                        multiline
                        style={styles.textEdit}
                        />
                        <View style={styles.iconContainer}>
                            <IconButton
                                icon="check"
                                iconColor={COLORS.fg2}
                                size={24}
                                onPress={handleSave}
                            />
                            <IconButton
                                icon="trash-can"
                                iconColor={COLORS.fg2}
                                size={24}
                                onPress={handleDelete}
                            />
                        </View>
                    </View>
                ) : (
                    <View style={styles.postCard} >
                        {
                            isOwner ? 
                            <IconButton
                                style={{position: 'absolute', top: -10, right: -40, backgroundColor: COLORS.fg1}}
                                icon="file-edit-outline"
                                iconColor={COLORS.fg2}
                                size={12}
                                onPress={handlePress}
                            /> : <></>
                        }
                        <TouchableOpacity onPress={showContent}>
                            <Card.Title
                            key={post?.id}
                            title = {post?.user_username}
                            subtitle = {text}
                            subtitleNumberOfLines= {isShow ? null : 4}
                            left={ () => <Avatar.Image size={50} source={{uri: post.user_profile_pic}}/>}
                            />
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    )
};

export default PostCard;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        marginVertical: 5,
        paddingVertical: 3,
        width: '80%',
        borderRadius: "15%",
    },  
    postCard: {
        margin: 3,
        position: "relative",
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
    modal: {
        backgroundColor: "white",
    },
    textEditContainer: {
        minHeight: 75,
        position: "relative",
    },
    textEdit: {
        marginHorizontal: 10,
        marginBottom: 50,
    },
    iconContainer: {
        position: "absolute",
        flex: 1,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        bottom: -10
    }
});
