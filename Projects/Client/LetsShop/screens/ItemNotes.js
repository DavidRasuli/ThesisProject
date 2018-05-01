import React, { Component } from 'react';
import { View,ListView ,ActivityIndicator,ScrollView,Button,TextInput,Text} from 'react-native';

class ItemNotes extends Component {

    constructor() {
        super();

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            itemNotesDataSource: ds,
            itemInList: '' ,
            ready : false,
            comment : '',
        };
    }

    renderRow(itemInList, sectionId, rowId, highlightRow) {



        return (

            <View>
                <Text>{itemInList}</Text>
            </View>
        )
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

    componentWillMount()
    {
        this.setState({
                itemInList: this.props.navigation.state.params,
                ready : true
            });
    }

    componentDidMount()
    {
        this.fetchComments();
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


    render() {
        if (!this.state.ready) {
            return (<ActivityIndicator/>);
        }

        return (
            <ScrollView>
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

export default ItemNotes;