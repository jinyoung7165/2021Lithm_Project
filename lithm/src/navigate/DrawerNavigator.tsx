import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from '../screen/Profile';
import Manage from '../screen/Manage';
import AuthScreen from '../screen/AuthScreen';
import StackNavigator from './Stack';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator screenOptions={{headerShown: false}} drawerContent = {(props) => <DrawerContent {...props}/>}>
             <Drawer.Screen name ="Home" component = {StackNavigator}/>
             <Drawer.Screen name ="Profile" component = {Profile}/>
             <Drawer.Screen name ="Manage" component = {Manage}/>
             <Drawer.Screen name="Logout" component={AuthScreen}/>     
         </Drawer.Navigator>
    );
}

export default DrawerNavigator;