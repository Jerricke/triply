import { FlatList, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FBDB } from '../../firebaseConfig'
import { collection, getDocs } from "firebase/firestore";
import PostCard from '../../components/logged-in/PostCard';


const home = () => {
    const [displayData, setDisplayData] = useState(null)

    useEffect( () => {
        getData();
    },[])

    const getData = async () => {
        const querySnapshot = await getDocs(collection(FBDB, "community-posts"));
        if (querySnapshot) {
            const temp = [];
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
                temp.push(doc.data());
            });
            setDisplayData(temp);
            console.log({temp, displayData});
        } else {
            alert("error")
        }
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, borderColor: "black", borderWidth: 2}}>
                <Text>test Navigation box</Text>
            </View>
            <View style={{flex: 9}}>
                <FlatList 
                    data={displayData}
                    renderItem={ ({item}) => <PostCard post={item}/>}
                    keyExtractor={ post => post.id}
                />
            </View>
            <View style={{flex: 2, borderColor: "black", borderWidth: 2}}>
                <Text>test new post box</Text>
            </View>
        </SafeAreaView>
    )
}

export default home