import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';


import MyLists from '../screens/MyLists';
import Me from '../screens/Me';
import ShoppingListDetails from '../screens/ShoppingListDetails';
import PictureManager from "../screens/PictureManager";
import ItemNotes from "../screens/ItemNotes"

export const MyListsStack = StackNavigator({
    MyList:{
        screen:MyLists,
        navigationOptions: {
            title: 'My Lists', //D.R. : title of the first page
        },
    },
    Details:{
        screen: ShoppingListDetails,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.shoppingList.name.toUpperCase()}`,
        }), //D.R. : now we'd like to get the first and last name from the navigation , is thia
    },
    ImagesDetail: {
        screen: PictureManager,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.name.toUpperCase()}`,
        }), //D.R. : now we'd like to get the first and last name from the navigation , is thia
    },
    Notes : {
        screen: ItemNotes,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.name.toUpperCase()}`,
        }), //
    }
});

export const Tabs = TabNavigator({
    Feed: {
        screen: MyListsStack,
        navigationOptions: {
            tabBarLabel: 'Shopping Lists'
        },
    },
    Me: {
        screen: Me,
        navigationOptions: {
            tabBarLabel: 'Settings'
        },
    },
});
