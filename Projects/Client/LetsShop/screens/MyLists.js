import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Button, ListView,ActivityIndicator
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { shoppingLists } from '../config/data';

class MyLists extends  Component{


    constructor() {

        super();

        this.state = {
            ready:false,
            shoppingListDataSource: null,
        }
    }

    componentDidMount() {
        this.getShoppingLists(); // Call API
    }

    getShoppingLists = () => {

        const url = "https://dn9tujddr2.execute-api.us-east-1.amazonaws.com/Staging/getlistbyparticipantid";
        fetch( url,{
            method: 'POST',
            headers:
                new Headers({'Content-Type': 'application/json'})
            ,
            body:
                JSON.stringify(
                    "10f53f45-d49d-437c-bf36-fa51b87bd34d")
        }).then((response) => response.json())
            .then((data) =>
            {
                let shoppingListObj = data.shoppingListWithItems;
                //alert('Data received (ShoppingListDetails):' +shoppingListObj[0].shoppingList.name )

                this.setState({
                    ready:true,
                    shoppingListDataSource:shoppingListObj
                },function() {
                    // do something with new state
                    //alert('Component did mount (ShoppingListDetails):' +this.state.shoppingListDataSource.shoppingList.name )
                });

            }).catch((error) => {
            alert("error : " +error);
        });
    }

    onLearnMore = (shoppingList)=>{
      this.props.navigation.navigate('Details',{...shoppingList});

    };

    render() {
        if (!this.state.ready) {
            return ( <ActivityIndicator/> );
        }
        return (

            <ScrollView>
                <List>
                    {this.state.shoppingListDataSource.map((shoppingList) => (
                        <ListItem
                            key={shoppingList.shoppingList.ID}
                            //avatar={{ uri: shoppingList.shoppingList.active }}
                            title={`${shoppingList.shoppingList.name.toUpperCase()} (${shoppingList.shoppingList.ID})`}
                            onPress={() => this.onLearnMore(shoppingList)}
                        />
                    ))}
                </List>
            </ScrollView>

        );
    }
}

export default MyLists;


