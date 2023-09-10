import { Redirect, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import useUser from "../context/user/useUser";
import { FBAUTH } from "../firebaseConfig";

export default function Page() {
    const { setUserID } = useUser();
    const router = useRouter();
    const auth = FBAUTH;
    const [loaded, setLoaded] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user?.uid) {
            setUserID(user.uid);
            setIsLogged(true);
        }
        });
        setTimeout(() => {
        setLoaded(true);
        }, 500);
    }, []);

    if (loaded) {
        if (isLogged) {
        return <Redirect href="/logged-in/home" />;
        } else {
        return <Redirect href="/login" />;
        }
    }

    return (
        <ActivityIndicator
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        size={42}
        color="black"
        />
    );
}
