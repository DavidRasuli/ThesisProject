import React, { Component } from 'react';
import {
    Image, Button, ScrollView, StyleSheet,ActivityIndicator,ListView,TextInput,View,Text
} from 'react-native';
import CheckBox from 'react-native-check-box';
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

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            avatarSource: '',
            itemInList : null,
            itemNotesDataSource: ds,
            comment : '',
            productName :'',
            productQty:0,
            productMeasureUnit:'#',
            productAvailable:false,
            isAdministrator:false,
            ready : false
        };
    }

    fetchComments() {

        //this.props.navigation.state.params.itemInLists
        if(this.props.navigation.state.params.comments) {
            this.setState({
                itemNotesDataSource: this.state.itemNotesDataSource.cloneWithRows(this.props.navigation.state.params.comments)
            });
        }
        else
        {
            this.setState({
                itemNotesDataSource: this.state.itemNotesDataSource.cloneWithRows([])
            });
        }
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


    componentDidMount()
    {
        this.fetchComments();
    }

    componentWillMount() {
        this.setState(
            {
                itemInList: this.props.navigation.state.params,
                isAdministrator : this.props.navigation.state.params.isAdmin,
                /*
                this.props.navigation.state.params.imageUrls.map(function (item) {
                    return {url: item};
                }),
                 */
                productName :this.props.navigation.state.params.name,
                productQty:this.props.navigation.state.params.measureVolume,
                productMeasureUnit:this.props.navigation.state.params.measureUnit,
                productAvailable:this.props.navigation.state.params.available,
                ready: true
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

    uploadPicture =() =>
    {
        var urls = this.state.itemInList.imageUrls ? this.state.itemInList.imageUrls : [];

        urls.push(this.state.avatarSource.uri);

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
                 "measurementVolume" : this.state.itemInList.measureVolume,
                 "measurementUnit" : this.state.itemInList.measureUnit,
                 "itemName" : this.state.itemInList.name,
                 "available" : this.state.itemInList.available,
                 "alternativeItem" : this.state.itemInList.alternativeItem,
                 "comments" : this.state.itemInList.comments,

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

    updateItem =() =>
    {
        const url = "https://dn9tujddr2.execute-api.us-east-1.amazonaws.com/Staging/updateiteminlist";
        fetch( url,{
            method: 'POST',
            headers:
                new Headers({'Content-Type': 'application/json'})
            ,
            body:
                JSON.stringify({
                    "itemInListId": this.state.itemInList.ID,
                    "listId" : this.state.itemInList.listId,
                    "imageUrls": this.state.itemInList.imageUrls,
                    "measurementVolume" : this.state.productQty,
                    "measurementUnit" : this.state.productMeasureUnit,
                    "itemName" : this.state.productName,
                    "available" : this.state.productAvailable,
                    //"alternativeItem" : this.state.itemInList.alternativeItem,
                    "comments" : this.state.itemInList.comments
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

    addComment =() =>
    {
        var comments = this.state.itemInList.comments ? this.state.itemInList.comments : [];

        var currentComment = 'SomeUser:' +this.state.comment;
        comments.push(currentComment);

        const url = "https://dn9tujddr2.execute-api.us-east-1.amazonaws.com/Staging/updateiteminlist";
        fetch( url,{
            method: 'POST',
            headers:
                new Headers({'Content-Type': 'application/json'})
            ,
            body:
                JSON.stringify({
                    "itemInListId": this.state.itemInList.ID,
                    "listId" : this.state.itemInList.listId,
                    "imageUrls": this.state.itemInList.imageUrls,
                    "measurementVolume" : this.state.itemInList.measureVolume,
                    "measurementUnit" : this.state.itemInList.measureUnit,
                    "itemName" : this.state.itemInList.name,
                    "available" : this.state.itemInList.available,
                    //"alternativeItem" : this.state.itemInList.alternativeItem,
                    "comments" : comments
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

    renderRow(itemInList, sectionId, rowId, highlightRow) {



        return (

            <View>
                <Text>{itemInList}</Text>
            </View>
        )
    }

    render() {
        if (!this.state.ready) {
            return (<ActivityIndicator/>);
        }
        return (


            <ScrollView>

                {this.state.isAdministrator &&

                <View>

                    <View style={styles.row}>
                        <Text style={styles.desc}>
                            Name :
                        </Text>


                        <TextInput style={styles.data}
                                   onChangeText={(value) => this.setState({productName: value})}
                                   placeholder={this.state.productName}
                        />
                        <Text style={styles.desc}>
                            Available :
                        </Text>


                        <CheckBox style={styles.data}
                            //disabled={this.state.isActive == false }
                                  onClick={(value) => {
                                      this.setState({productAvailable: value})
                                  }}

                                  isChecked={this.state.itemInList.available}
                                  checkedImage={<Image source={require('./../Images/Check.png')}/>}
                        />
                    </View>


                    <View style={styles.row}>
                        <Text style={styles.desc}>
                            Quantity :
                        </Text>

                        <TextInput style={styles.data}
                                   onChangeText={(value) => this.setState({productQty: value})}
                                   placeholder={this.state.productQty.toString()}
                        />
                        <Text style={styles.desc}>
                            Measure unit :
                        </Text>

                        <TextInput style={styles.data}
                                   onChangeText={(value) => this.setState({productMeasureUnit: value})}
                                   placeholder={this.state.productMeasureUnit}
                        />

                    </View>


                    <Button title="UpdateItems"
                            onPress={() =>
                                this.updateItem()
                            }
                    />
                </View>
                }
                <PhotoGrid
                    PhotosList=
                        { this.state.itemInList.imageUrls ? this.state.itemInList.imageUrls.map(function (item) {
                                                                        return {url: item};
                                                                    }) : []
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


                    <View>
                        <ListView
                            dataSource={this.state.itemNotesDataSource}
                            renderRow={this.renderRow.bind(this)}
                        />
                    </View>
                    <TextInput value={this.state.comment}
                               onChangeText={
                                   (value) =>
                                       this.setState({
                                           comment: value
                                       })}
                    />
                    <Button
                        onPress={() => this.addComment()}
                        title="Add comment"
                    />

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
            },
        desc:
            {
                flex:2,
                padding:10,
            },
        data:
            {
                flex:3,
                padding:10
            },

        row:
            {
                flexDirection:'row',
                justifyContent:'center',
                marginBottom:1,
                backgroundColor: 'ghostwhite'
            },
    }

);

export default PictureManager;
