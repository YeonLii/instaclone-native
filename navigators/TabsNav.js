import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import TabIcon from './../components/nav/TabIcon';
import SharedStackNav from "./SharedStackNav";
import useMe from "../hooks/useMe";
import { Image } from "react-native";


const Tabs = createBottomTabNavigator();
export default function TabsNav() {
    const { data } = useMe();
    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { backgroundColor: "black", borderTopColor: "rgba(255,255,255,0.5)" },
                tabBarActiveTintColor: 'white',
            }}
        >
            <Tabs.Screen
                name="Feed"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        //color => ActiveTintColor를 받음
                        <TabIcon iconName={"home"} color={color} focused={focused} />
                    ),
                }}
            >
                {() => <SharedStackNav screenName="Feed" />}
            </Tabs.Screen>
            <Tabs.Screen
                name="Search"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        //color => ActiveTintColor를 받음
                        <TabIcon iconName={"search"} color={color} focused={focused} />
                    ),
                }}
            >
                {() => <SharedStackNav screenName="Search" />}
            </Tabs.Screen>
            <Tabs.Screen
                name="Camera"
                component={View}
                listeners={({ navigation }) => {
                    return {
                        tabPress: (e) => {
                            e.preventDefault();
                            navigation.navigate("Upload");
                        },
                    };
                }}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        //color => ActiveTintColor를 받음
                        <TabIcon iconName={"camera"} color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Notifications"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        //color => ActiveTintColor를 받음
                        <TabIcon iconName={"heart"} color={color} focused={focused} />
                    ),
                }}
            >
                {() => <SharedStackNav screenName="Notifications" />}
            </Tabs.Screen>
            <Tabs.Screen
                name="Me"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        //color => ActiveTintColor를 받음
                        data?.me?.avatar ? (
                            <Image
                                source={{ uri: data.me.avatar }}
                                style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                    ...(focused && { borderColor: "white", borderWidth: 1 }),
                                }}
                            />
                        ) : (
                            <TabIcon iconName={"person"} color={color} focused={focused} />
                        )
                    ),
                }}
            >
                {() => <SharedStackNav screenName="Me" />}
            </Tabs.Screen>
        </Tabs.Navigator>
    );
}