import React, { Component } from 'react';
import { ScrollView,View,ListView ,Text,StyleSheet,Button, TouchableHighlight,Image,TextInput} from 'react-native';

class ShoppingListDetails extends Component {



    constructor() {

        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});



        this.state = {
            shoppingListId : null,
            shoppingListDataSource: ds,
            productName: 'Enter product',
            productQty: 'Quantity',
            measurementUnit : '#', //todo : to dropdownlist/selector


            blankLeft_style : styles.blankLeft,
            blankRight_style : styles.blankRight,

            productName_style : styles.hide,
            productQty_style : styles.hide,
            measurementUnit_style : styles.hide,
            minus_highlight : styles.hide,
            minus_image: styles.imageHide,
            plus_highlight : styles.show,
            plus_image: styles.imageShow,
            add_comment : styles.addComment,
            comments : styles.comments,
            viewImages : styles.viewImages
        };

    }


    fetchShoppingItems() {

        this.setState({
            shoppingListId : this.props.navigation.state.params.shoppingList.ID,
            shoppingListDataSource: this.state.shoppingListDataSource.cloneWithRows(this.props.navigation.state.params.itemInLists)
        });
    }

    componentDidMount() {
        this.fetchShoppingItems();
    }

    addItemClicked = () => {
        this.setState({
                plus_highlight: styles.hide
            }
        );
        this.setState({
                plus_image: styles.imageHide
            }
        );
        this.setState({
                minus_highlight: styles.show
            }
        );
        this.setState({
                minus_image: styles.imageShow
            }
        );
        this.setState({
                productName_style: styles.productNameStyle
            }
        );
        this.setState({
                productQty_style: styles.productQtyStyle
            }
        );
        this.setState({
                measurementUnit_style: styles.measurementUnitStyle
            }
        );

        this.setState({
            blankLeft_style: styles.hide
            }
        );
        this.setState({
            blankRight_style: styles.hide
            }
        );
    }


    cancelItemClicked = () => {
        this.setState({
                plus_highlight: styles.show
            }
        );
        this.setState({
                plus_image: styles.imageShow
            }
        );
        this.setState({
                minus_highlight: styles.hide
            }
        );
        this.setState({
                minus_image: styles.imageHide
            }
        );
        this.setState({
                productName_style: styles.hide
            }
        );
        this.setState({
                productQty_style: styles.hide
            }
        );
        this.setState({
                measurementUnit_style: styles.hide
            }
        );
        this.setState({
                blankLeft_style: styles.blankLeft
            }
        );
        this.setState({
                blankRight_style: styles.blankRight
            }
        );
    }

    /*
        addItemClicked()
        {


            if plus :

            1.turn sign into minus
            2.add textbox - item
            3.add textbox - qty
            4.add "v" confirm sign.

            if minus :
            1.turn sign into plus.
            2. purge the textboxes and the confirmation






        this.setState({
            plus_highlight: styles.hide}
            );




    }*/



    onNewItemConfirmation()
    {
        /*
        call services - add item to list.
        call or recieve items of the list.

         */
    }

    onFinish(){
        //call services- finish list

    }

    onParticipantSignClicked()
    {
        //move to participants activity
    }

    onAddCommentClicked = () =>
    {
        const url = "https://dn9tujddr2.execute-api.us-east-1.amazonaws.com/Staging/appenditemtoshoppinglist";
        fetch( url,{
            method: 'POST',
            headers:
                new Headers({'Content-Type': 'application/json'})
            ,
            body:
                JSON.stringify({
                    //"itemInListId": this.state.itemInList.ID,
                    "listId" : this.state.shoppingListId ,
                    //"imageUrls": this.state.itemInList.urls,
                    "measurementVolume" : this.state.productQty,
                    "measurementUnit" : this.state.measurementUnit,
                    "itemName" : this.state.productName,
                    //"available" : this.state.itemInList.available,
                    //"alternativeItem" : this.state.itemInList.alternativeItem,
                    //"comments" : comments
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


    navigateToImages = (itemInList)=>{
        this.props.navigation.navigate('ImagesDetail',{...itemInList});

    };

    navigateToComments = (itemInList)=>{
        this.props.navigation.navigate('Notes',{...itemInList});
    };


    renderRow(shoppingListRow, sectionId, rowId, highlightRow) {



        return (

            <View style={styles.row}>
                <TouchableHighlight onPress={() => this.navigateToComments(shoppingListRow)} style={this.state.plus_highlight}>
                    <Image

                        style={this.state.add_comment}
                        source={require('./../Images/AddComment.png')}
                    />
                </TouchableHighlight>
                <Text style={styles.productNameStyle}>{shoppingListRow.name}</Text>
                <Text style={styles.productQtyStyle}>{shoppingListRow.measureVolume} </Text>
                <Text style={styles.measurementUnitStyle}>{shoppingListRow.measureUnit}</Text>
                <Text style={styles.show}></Text>

                    <TouchableHighlight onPress={() => this.navigateToImages(shoppingListRow)}
                                        style={this.state.plus_highlight}>
                        <Image

                            style={this.state.add_comment}
                            source={require('./../Images/Images.png')}
                        />
                    </TouchableHighlight>

            </View>
        )
    }

    render() {

        return (
            <View>
                <ListView
                    dataSource={this.state.shoppingListDataSource}
                    renderRow={this.renderRow.bind(this)}
                />

                <View style={styles.row}>

                    <Text
                        style={this.state.blankLeft_style}
                    >Enter new product</Text>

                    <TextInput
                        style={this.state.productName_style}
                        value={this.state.productName}
                        onChangeText ={
                            (value) =>
                                this.setState({
                                    productName : value
                                })}
                    />

                    <TextInput
                        style={this.state.productQty_style}
                        value={this.state.productQty}
                        onChangeText ={
                            (value) =>
                                this.setState({
                                    productQty : value
                                })}
                    />

                    <TextInput
                        style={this.state.measurementUnit_style}
                        value={this.state.measurementUnit}
                        onChangeText ={
                            (value) =>
                                this.setState({
                                    measurementUnit : value
                                })}
                    />



                    <TouchableHighlight onPress={this.addItemClicked} style={this.state.plus_highlight}>
                        <Image

                            style={this.state.plus_image}
                            source={require('./../Images/Plus.png')}
                        />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={this.cancelItemClicked} style={this.state.minus_highlight}>
                        <Image
                            style={this.state.minus_image}
                            source={require('./../Images/Minus.png')}
                        />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={this.onAddCommentClicked} style={this.state.minus_highlight} >
                        <Image

                            style={this.state.minus_image}
                            source={require('./../Images/Add.png')}
                        />
                    </TouchableHighlight>

                    <View
                        style={this.state.blankRight_style}
                    />

                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create(
    {
        myView:
            {
                backgroundColor:'blue'
            },
        myText:
            {
                color:'yellow'
            },
        row:
            {
                flexDirection:'row',
                justifyContent:'center',
                marginBottom:1,
                backgroundColor: 'ghostwhite'
            },
        productNameStyle:
            {
                flex:8,
                padding:10,
            },
        productQtyStyle:
            {
                flex:1,
                padding:10,
            },
        measurementUnitStyle:
            {
                flex:1,
                padding:10,
            },
        show:
            {
                flex: 2,
                padding :10,
            },
        blankRight:
            {
                flex: 1,
                padding :10,
            },
        blankLeft:
            {
                textAlign: 'center',
                flex:9,
                padding:10,
            },
        hide:
            {
                height: 0, opacity: 0,flex:0,width :0
            },
        imageHide:
            {
                width: 0,
                height: 0
            },
        imageShow:
            {
                width: 50,
                height: 50
            },
        addComment:
            {
                width : 25,
                height: 25
            },
        viewImages:
            {
                width : 25,
                height: 25
            },
        comments:
            {
                width : 25,
                height: 25
            }
    }
);

export default ShoppingListDetails;


