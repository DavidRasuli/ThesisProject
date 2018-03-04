import React, { Component } from 'react';
import { ScrollView,ActivityIndicator } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import { me } from '../config/data';

class Me extends Component {
    handleSettingsPress = () => {
        //this.props.navigation.navigate('Settings');
        //https://dn9tujddr2.execute-api.us-east-1.amazonaws.com/Staging

    };
    constructor(props)
    {
        super(props);
        this.state = {
            user : null,
            ready : false
        }
    }


    componentDidMount()
    {
        this.getUser();
    }

    getUser = () => {
        const url = "https://dn9tujddr2.execute-api.us-east-1.amazonaws.com/Staging/getparticipantbyid";
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
            let participant = data.participant;
            //alert(participant);
            this.setState({
                ready:true,
                user:participant
            },function() {
                // do something with new state
                //alert('Component did mount : user :' +this.state.user )
            });
            /*
            alert(data.participant.firstName);
            this.state({
                ready:true,
                user:data.participant
            });
            */
        }).catch((error) => {
              alert("error : " +error);
          });
    }

    render() {
        if (!this.state.ready) {
            return ( <ActivityIndicator/> );
        }
// here you already have the data to know if he has a session
        return (

            <ScrollView>

                <Tile
                    imageSrc={{uri: this.state.user.imageUrl}}
                    featured
                    title={`${this.state.user.firstName.toUpperCase()} ${this.state.user.lastName.toUpperCase()}`}
                    caption={this.props.email}
                />

                <Button
                    title="Settings"
                    buttonStyle={{marginTop: 20}}
                    onPress={this.handleSettingsPress}
                />

                <List>
                    <ListItem
                        title="Email"
                        rightTitle={this.state.user.email.toUpperCase()}
                        hideChevron
                    />
                    <ListItem
                        title="Phone"
                        rightTitle={this.state.user.phone.toUpperCase()}
                        hideChevron
                    />
                </List>

                <List>
                    <ListItem
                        title="Nickname"
                        rightTitle={this.state.user.nickname.toUpperCase()}
                        hideChevron
                    />
                </List>

                <List>
                    <ListItem
                        title="Birthday"
                        rightTitle={this.state.user.dateOfBirth.split('T')[0]}
                        hideChevron
                    />
                </List>
            </ScrollView>
        );

    }
}

Me.defaultProps = { ...me };

export default Me;