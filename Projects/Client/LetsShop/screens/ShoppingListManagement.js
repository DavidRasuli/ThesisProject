import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Button, ListView, ActivityIndicator, TextInput, Picker
} from 'react-native';
import SelectMultiple from 'react-native-select-multiple'
import { List, ListItem } from 'react-native-elements';
import MyLists from "./MyLists";
import {me} from "../config/data";


class ShoppingListManagement extends  Component {


    constructor() {

        super();

        this.state = {
            isNewShoppingList : false,
            ready: false,
            shoppingListId: null,
            isAdmin: false,
            shoppingListName : '',
            participants: null,
            selectedParticipants : null,
            newAdminId : null
        }
    }

    componentWillMount() {

        if(this.props.navigation.state.params == null) // new list
        {
            this.setState({
                ready: true,
                isNewShoppingList : true,
                isAdmin : true,
                shoppingListName: 'Some name',
                participants: [
                    "123","124"
                ],
                selectedParticipants : []
            });

        }
        else { // existing list
            this.setState({
                ready: true,
                isAdmin: me.userId == this.props.navigation.state.params.shopperId,
                shoppingListId: this.props.navigation.state.params.ID,
                shoppingListName: this.props.navigation.state.params.name,
                participants: [
                    "123","124"
                ],
                selectedParticipants : []
            });
        }
    }

    onSelectionsChange = (selectedParticipants) => {
        if(this.state.isAdmin == false)
        {
            return;
        }
        this.setState({ selectedParticipants })

    }

    render() {
        if (!this.state.ready) {
            return (<ActivityIndicator/>);
        }
        let serviceItems = this.state.participants.map( (s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        });
        return (



            <ScrollView>
                <Text>
                    Shopping List Name :
                </Text>


                <TextInput
                           onChangeText={(value) => this.setState({shoppingListName: value})}
                           placeholder={this.state.shoppingListName}
                />

                <Text>
                    Edit participants :
                </Text>

                <View>
                    <SelectMultiple
                    items={this.state.participants}
                    selectedItems={this.state.selectedParticipants}
                    onSelectionsChange={this.onSelectionsChange} />
                </View>

                <Text>
                    Change administrator :
                </Text>

                {this.state.isAdmin && <Picker
                    selectedValue='123'
                    onValueChange={(itemValue) => this.setState({newAdminId: itemValue})}>
                    {serviceItems}

                </Picker>
                }
            </ScrollView>

        );

    }
}

export default ShoppingListManagement;