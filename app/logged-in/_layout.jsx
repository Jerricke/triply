import { Tabs } from "expo-router";
import { Octicons,FontAwesome5 } from '@expo/vector-icons'; 
import { COLORS } from "../../constants/theme";

export default function LoggedInLayout () {
    return (
        <Tabs screenOptions={{headerShown: false, tabBarActiveTintColor: COLORS.fg2}} >
            <Tabs.Screen name="home" options={{tabBarShowLabel: false, tabBarIcon: ({color}) => (<Octicons name="people" size={28} color={color} />)}}/>
            <Tabs.Screen name="startATrip" options={{tabBarShowLabel: false, tabBarIcon: ({color}) => (<FontAwesome5 name="route" size={28} color={color} />)}}/>
            <Tabs.Screen name="currentUserProfile" options={{tabBarShowLabel: false, tabBarIcon: ({color}) => (<Octicons name="person" size={28} color={color} />)}}/>
        </Tabs>
    )
}
