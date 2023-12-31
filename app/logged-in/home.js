import { FlatList, View, Text, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FBDB } from '../../firebaseConfig'
import { collection, getDocs, onSnapshot, docs } from "firebase/firestore";
import PostCard from '../../components/logged-in/PostCard';
import NewPost from '../../components/logged-in/newPost';
import { COLORS } from '../../constants/theme';


const home = () => {

    const [displayData, setDisplayData] = useState(null)

    useEffect( () => {
        const ref = collection(FBDB, "community-posts")

        const subscriber = onSnapshot(ref, {
            next: (snapshot) => {
                const posts = [];
                // console.log(snapshot)
                snapshot.docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                setDisplayData(posts)
            }
        })
        return () => subscriber();
    },[])

    // const getData = async () => {
    //     const querySnapshot = await getDocs(collection(FBDB, "community-posts"));
    //     if (querySnapshot) {
    //         const temp = [];
    //         querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //             temp.push(doc.data());
    //         });
    //         setDisplayData(temp);
    //         console.log({temp, displayData});
    //     } else {
    //         alert("error")
    //     }
    // }

    return (
        <KeyboardAvoidingView  behavior="padding">
            <SafeAreaView style={{backgroundColor: COLORS.bg1,}}>
                <View style={{height: "10%", borderColor: "black", borderWidth: 2}}>
                    <Text>test Navigation box</Text>
                </View>
                <View style={{height: "70%"}}>
                    <FlatList 
                        data={displayData}
                        renderItem={ ({item}) => <PostCard post={item}/>}
                        keyExtractor={ post => post.id}
                    />
                </View>
                <View style={{height: "20%"}}>
                    <NewPost />
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default home