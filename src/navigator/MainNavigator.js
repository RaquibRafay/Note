import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import NoteListScreen from '../screens/NoteListScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import EditNoteScreen from '../screens/EditNoteScreen';

const Stack = createStackNavigator();
const Drawer = createStackNavigator()

const DrawerNav = () => {
    return (
        <DrawerNav.Navigator initialRouteName="NoteList">
            <DrawerNav.Screen
                name="NoteList"
                component={NoteListScreen}
                options={{
                    title: 'Daily Fashion',
                    headerStyle: {
                        backgroundColor: '#D1E5C2'
                    },
                    headerTitleAlign: 'center',
                    drawerIcon: config =>
                        <Icon
                            name="home"
                            type="antdesign"
                        />
                }}
            />
        </DrawerNav.Navigator>
    )
}
const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Drawer">
                <Stack.Screen
                    name="Drawer"
                    component={Drawer}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
            {/* <Stack.Navigator initialRouteName="NoteList">
                <Stack.Screen
                    name="NoteList"
                    component={NoteListScreen}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="CreateNote"
                    component={AddNoteScreen}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="EditNote"
                    component={EditNoteScreen}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator> */}
        </NavigationContainer >
    )
};
export default MainNavigator;