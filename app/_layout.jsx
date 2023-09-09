import { Stack } from "expo-router";
import { UserProvider } from "../context/user/useUser";

export default function RootLayout () {
    const test = "this works"
    return (
        <UserProvider>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="login" />
                <Stack.Screen name="signup"/>
                <Stack.Screen name="signupProfile" />
            </Stack>
        </UserProvider>
    )
}