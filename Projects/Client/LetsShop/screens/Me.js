import React, { Component } from 'react';
import {ScrollView, ActivityIndicator, TextInput, StyleSheet ,Switch,View,Text} from 'react-native';
import { Tile, ListItem, Button } from 'react-native-elements';
import {me} from '../config/data';

class Me extends Component {
    handleSettingsPress = () => {
        //this.props.navigation.navigate('Settings');
        //https://dn9tujddr2.execute-api.us-east-1.amazonaws.com/Staging

        if(this.state.isEdit == true)
        {
            this.setState({
                settingsMode:"Edit Details",
                isEdit : false
            })
            //update api
            this.updateUser();
            //set state to Edit Details

        }
        else //this.state.isEdit == false
        {
            this.setState({
                settingsMode:"Done",
                isEdit : true
            });
            //allow edit
            //set state to Done

        }


    };
    constructor()
    {
        super();
        this.state = {
            user : null,
            ready : false,
            isEdit : false,
            settingsMode : "Edit Details",
            email: "",
            nickName: "",
            showNotifications: false,

        };
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
                    this.props.userId)
        }).then((response) => response.json())
            .then((data) =>
            {
                let participant = data.participant;
                //alert(participant);
                this.setState({
                    ready:true,
                    user:participant,
                    email: participant.email,
                    nickName : participant.nickname,
                    showNotifications : participant.showNotifications
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


    updateUser =() =>
    {

        const url = "https://dn9tujddr2.execute-api.us-east-1.amazonaws.com/Staging/editparticipant";
        fetch( url,{
            method: 'POST',
            headers:
                new Headers({'Content-Type': 'application/json'})
            ,
            body:
                JSON.stringify({
                    "participantId": this.state.user.ID,
                    "nickName": this.state.nickName,
                    "email" : this.state.email,
                    "allowSettings" : this.state.showNotifications,
                }),
        }).then((response) => response.json())
            .then((data) =>
            {
                let participant = data.participant;
                this.setState({
                    ready:true,
                    user:participant,
                    email: participant.email,
                    nickName : participant.nickname,
                    showNotifications : participant.showNotifications
                });
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
                    title={this.state.settingsMode}
                    buttonStyle={{marginTop: 20}}
                    onPress={this.handleSettingsPress}
                />

                <View style={styles.row}>
                    <Text style={styles.desc}>
                        Email :
                    </Text>

                    {this.state.isEdit == false &&
                    <Text style={styles.data}>
                        {this.state.email}
                    </Text>
                    }

                    {this.state.isEdit &&

                    <TextInput style={styles.data}
                               placeholder={ (!this.state.email  || this.state.email == '') ? 'Enter your email' : this.state.email}                                placeholder='Enter your email' //add email validation
                               onChangeText ={(value) => this.setState({ email : value})}
                    />
                    }
                </View>

                <View style={styles.row}>

                    <Text style={styles.desc}>
                        Nickname :
                    </Text>

                    {this.state.isEdit == false &&
                    <Text style={styles.data}>
                        {
                            this.state.nickName
                        }
                    </Text>
                    }
                    {this.state.isEdit &&
                    <TextInput style={styles.data}
                               placeholder={ (!this.state.nickName || this.state.nickName == '') ? 'Enter your nickname' : this.state.nickName} //add name validation
                               onChangeText ={
                                   (value) =>
                                       this.setState({
                                           nickName : value
                                       })}
                    />
                    }
                </View>

                <View style={styles.row}>

                    <Text style={styles.desc}>
                        Allow notifications :
                    </Text>

                    <Switch
                        style={styles.data}
                        disabled={this.state.isEdit == false}
                        value={this.state.showNotifications}
                        onValueChange={
                            (value) =>
                                this.setState({
                                     showNotifications: value
                                })}
                    />

                </View>

            </ScrollView>
        );

    }
}
const styles = StyleSheet.create(
    {
        desc:
            {
                flex:1,
                padding:10,
            },
        data:
            {
                flex:2,
                padding:10
            },
        row:
            {
                flexDirection:'row',
                justifyContent:'center',
                marginBottom:1,
                backgroundColor: 'ghostwhite'
            },
    });
Me.defaultProps = { ...me };
export default Me;