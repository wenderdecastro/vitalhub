import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home } from "../Home/Home"
import { Profile } from "../Profile/Profile"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ContentIcon, TextIcon } from "./Style";
import { FontAwesome5 } from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator()


export const Main = () => {
    return (
        <BottomTab.Navigator
            initialRouteName="Home"

            screenOptions={({ route }) => ({
                tabBarStyle: { backgroundColor: "#FFFFFF", height: 80, paddingTop: 10 },
                tabBarActiveBackgroundColor: 'transparent',
                tabBarShowLabel: false,
                headerShown: false,

                tabBarIcon: ({ focused }) => {
                    if (route.name === "Home") {
                        return (
                            <ContentIcon
                            >
                                {focused ? <MaterialCommunityIcons name="calendar-check" size={24} color="#607EC5" /> : <MaterialCommunityIcons name="calendar-check" size={24} color="4E4B59" />}
                                <TextIcon textColor={focused ? "#607EC5" : "#4E4B59"}>Agenda</TextIcon>
                            </ContentIcon>
                        )
                    } else if (route.name === "Profile") {
                        return (
                            <ContentIcon
                            >

                                {focused ? <FontAwesome5 name="user-circle" size={22} color="#607EC5" /> : <FontAwesome5 name="user-circle" size={22} color="#4E4B59" />}
                                <TextIcon textColor={focused ? "#607EC5" : "#4E4B59"}>Perfil</TextIcon>
                            </ContentIcon>
                        )
                    }
                }
            })}>


            <BottomTab.Screen
                name="Home"
                component={Home}
            />

            <BottomTab.Screen
                name="Profile"
                component={Profile}
            />
        </BottomTab.Navigator>
    )
}