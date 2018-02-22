import React, { Component } from 'react';
import {
    Image, Button, ScrollView, StyleSheet,View,TouchableHighlight,Text
} from 'react-native';
import { PhotoGrid } from 'react-native-photo-grid-frame';
import { itemsInList} from '../config/data';
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


    render()
    {
        return (
            <ScrollView>
                <PhotoGrid PhotosList={itemsInList.imageUrls} borderRadius={10}/>
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
                <Image source={this.state.avatarSource}  style={styles.imageShow}  />
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
    }
);

export default PictureManager;
