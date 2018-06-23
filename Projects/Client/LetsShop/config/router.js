import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';


import MyLists from '../screens/MyLists';
import Me from '../screens/Me';
import ShoppingListDetails from '../screens/ShoppingListDetails';
import PictureManager from "../screens/PictureManager";
import ItemNotes from "../screens/ItemNotes"
import ShoppingListManagement from "../screens/ShoppingListManagement";

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
        }),
    },
    ImagesDetail: {
        screen: PictureManager,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.name.toUpperCase()}`,
        }),
    },
    ExistingListManagement : {
        screen: ShoppingListManagement,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.name.toUpperCase()}`,
        }),
    },
    NewListManagement : {
        screen: ShoppingListManagement,
        navigationOptions: () => ({
            title: `New Shopping List`,
        }),
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
