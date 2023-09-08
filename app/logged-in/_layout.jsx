import { Stack } from "expo-router";

export default function LoggedInLayout () {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="home" />
        </Stack>
    )
}