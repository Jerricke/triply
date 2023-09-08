import { Stack } from "expo-router";

export default function RootLayout () {
    const test = "this works"
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" />
            <Stack.Screen name="signup"/>
            <Stack.Screen name="signupProfile" />
        </Stack>
    )
}