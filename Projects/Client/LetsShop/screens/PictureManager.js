import React, { Component } from 'react';
import {
    Image, Button, ScrollView, StyleSheet,ActivityIndicator
} from 'react-native';
import { PhotoGrid } from 'react-native-photo-grid-frame';
var ImagePicker = require('react-native-image-picker');

//Need to learn about this
var options = {
    title: 'Select Avatar',
    customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


class PictureManager extends Component {

    constructor() {
        super();


        this.state = {
            avatarSource: '',
            itemInList : null,
            ready : false
        };
    }


    BrowseDevice = ()=> {
        ImagePicker.launchImageLibrary(options, (response)  => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }



    componentWillMount() {
        if(this.props.navigation.state.params.imageUrls != null) {
            this.setState(
                {
                    itemInList:this.props.navigation.state.params,

                    /*
                    this.props.navigation.state.params.imageUrls.map(function (item) {
                        return {url: item};
                    }),
                     */

                    ready : true
                }
            );
        }
        else {

            this.setState(
                {

                    ready: true
                }
            );
        }
    }

    takeCameraPicture = ()=>{
        ImagePicker.launchCamera(options, (response)  => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                //Call backend-
                //Update the table ÏtemsInList with the picture, and have a list of pictures as a field there too.
                //Broadcast the image to other participants of the list, notify and use a push to update the users.
                //Should consider trade offs of how to  pass a picture :
                //1.URL - have to save on an external storage(Amazon Glacier provides up to 10GB)
                //2.Stream - save nothing on backend, and pass the stream to the relevant participants, save on client's storage.
                this.setState({
                    avatarSource: source,
                });
            }
        });

    };

    uploadPicture =() =>
    {
        var urls = this.state.itemInList.imageUrls;

        urls.push(this.state.avatarSource.uri);

        debugger;
        urls = urls.map(function (item) {
                    return item;
                });

        const url = "https://dn9tujddr2.execute-api.us-east-1.amazonaws.com/Staging/updateiteminlist";
        fetch( url,{
            method: 'POST',
            headers:
                new Headers({'Content-Type': 'application/json'})
            ,
            body:
             JSON.stringify({
                "itemInListId": this.state.itemInList.ID,
                "imageUrls": urls,
                 "measurementVolume" : this.state.itemInList.measurementVolume,
                 "measurementUnit" : this.state.itemInList.measurementUnit,
                 "itemName" : this.state.itemInList.itemName,
                 "available" : this.state.itemInList.available,
                 "alternativeItem" : this.state.itemInList.alternativeItem
            }),
        }).then((response) => response.json())
            .then((data) =>
            {
                let res = data.toString();
                alert("response : "+JSON.stringify( res));
            }).catch((error) => {
            alert("error : " +error);
        });

    }




    render() {
        if (!this.state.ready) {
            return (<ActivityIndicator/>);
        }
        return (
            <ScrollView>
                <PhotoGrid
                    PhotosList=
                        {this.state.itemInList.imageUrls.map(function (item) {
                                                                        return {url: item};
                                                                    })
                        }
                    borderRadius={10}/>
                <Button title="Take a picture"
                        onPress={() =>
                            this.takeCameraPicture()
                        }
                />
                <Button title="Browse device"
                        onPress={() =>
                            this.BrowseDevice()
                        }
                />
                <Image source={ this.state.avatarSource} style={styles.imageShow}/>
                <Button onPress={() => this.uploadPicture()} title="Upload image"/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create(
    {
        imageShow:
            {
                width: 50,
                height: 50
            },
        buttonShow:
            {
                width: 50,
                height: 50
            },
        buttonHide:
            {
                height: 0, opacity: 0,flex:0,width :0, fontSize :0
            }
    }

);

export default PictureManager;
