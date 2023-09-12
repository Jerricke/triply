import { useContext, createContext, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore"
import { FBDB } from "../../firebaseConfig";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {

    const [userID, setUserID] = useState(null)
    const [profile, setProfile] = useState(null)

    useEffect( () => {
        console.log(userID);
        if (userID) { 
            getUserData()
        }   
    }, [userID])

    const getUserData = async () => {
        const docRef = doc(FBDB, "users", userID);
        console.log(docRef);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setProfile(docSnap.data())
        } else {
            console.log(userID);
        // docSnap.data() will be undefined in this case
            alert("No data")
        }
    }


    return (
        <UserContext.Provider
            value={{userID, setUserID, profile, setProfile}}
        >
                {children}
        </UserContext.Provider>
    ) 
}

const useUser = () => {
  return useContext(UserContext);
}

export default useUser;