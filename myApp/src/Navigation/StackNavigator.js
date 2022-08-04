import * as React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import { useAuthContext } from '../components/context/AuthContext';
import Contact from '../screens/Frontend/Contact'
import About from '../screens/Frontend/About'
import Home from '../screens/Frontend/Home'
import TabNavigation from './TabNavigation';
import Header from '../components/Header/Header';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    const { Authenticated, handleLogout } = useAuthContext()
    return (
        <NavigationContainer >
            {!Authenticated
                ? (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen
                            name="Login"
                            component={Login}
                        />
                        <Stack.Screen name="register" component={Register} />
                    </Stack.Navigator>
                ) : (
                    <>
                        <Header />
                        <Stack.Navigator
                            screenOptions={{
                                headerShown: false
                            }}
                            initialRouteName={"Home"}
                        >

                            <Stack.Screen
                                options={{
                                    headerRight: () => (
                                        <Button
                                            onPress={() => handleLogout()}
                                            title="LOGOUT"
                                            color="#222"
                                        />
                                    ),
                                }}
                                name="Tab"
                                component={TabNavigation}
                            />
                            <Stack.Screen name="Contact" component={Contact} />
                            <Stack.Screen name="About" component={About} />
                        </Stack.Navigator>
                    </>
                )
            }

        </NavigationContainer>
    )
}