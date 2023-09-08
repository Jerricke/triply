import { Tabs } from "expo-router";

export default function LoggedInLayout () {
    return (
        <Tabs screenOptions={{headerShown: false}}>
            <Tabs.Screen name="home" />
            <Tabs.Screen name="startATrip" />
            <Tabs.Screen name="currentUserProfile" />
        </Tabs>
    )
}