import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Button, ListView,ActivityIndicator
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {me} from '../config/data';
import Me from "./Me";

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
                    this.props.userId)
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

    getFirstPicture(shoppingList)
    {
        var imageUrl;
        if(shoppingList.shoppingList.active )
        {
            imageUrl = require('./../Images/ActiveShopping.png');
        }
        else
        {
            imageUrl = require('./../Images/FinishedShopping.png');
        }
        return imageUrl;
    }

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
                            avatar={this.getFirstPicture(shoppingList)}
                            title={shoppingList.shoppingList.name.toUpperCase()}
                            subtitle={shoppingList.shoppingList.creationDate.split('T')[0]}
                            onPress={() => this.onLearnMore(shoppingList)}
                        />
                    ))}
                </List>
            </ScrollView>

        );
    }
}
MyLists.defaultProps = { ...me };

export default MyLists;


