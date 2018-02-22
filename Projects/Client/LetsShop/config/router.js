import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';


import MyLists from '../screens/MyLists';
import Me from '../screens/Me';
import ShoppingListDetails from '../screens/ShoppingListDetails';
import PictureManager from "../screens/PictureManager";

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
            title: `${navigation.state.params.name.toUpperCase()} ${navigation.state.params.id.toUpperCase()}`,
        }), //D.R. : now we'd like to get the first and last name from the navigation , is thia
    },
    ImagesDetail: {
        screen: PictureManager,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.name.toUpperCase()} ${navigation.state.params.id.toUpperCase()}`,
        }), //D.R. : now we'd like to get the first and last name from the navigation , is thia
    }
});

export const Images = StackNavigator({
    ShoppingListDetail:{
        screen: ShoppingListDetails,
        navigationOptions: {
            title: 'Item Images',
        }},
    ImagesDetail: {
        screen: PictureManager,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.name.toUpperCase()} ${navigation.state.params.id.toUpperCase()}`,
        }), //D.R. : now we'd like to get the first and last name from the navigation , is thia
    }


})

export const Tabs = TabNavigator({
    Feed: {
        screen: MyListsStack,
        navigationOptions: {
            tabBarLabel: 'Feed'
        },
    },
    Me: {
        screen: Me,
        navigationOptions: {
            tabBarLabel: 'Me'
        },
    },
});
