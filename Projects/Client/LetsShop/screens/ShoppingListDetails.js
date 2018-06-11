import React, { Component } from 'react';
import { ScrollView,View,ListView ,Text,StyleSheet,Button, TouchableHighlight,Image,TextInput,Picker} from 'react-native';
import CheckBox from 'react-native-check-box';
import {me} from '../config/data';

class ShoppingListDetails extends Component {

    constructor() {

        super();
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2 || r1.available != r2.available });



        this.state = {
            shoppingListId : null,
            shoppingListDataSource: ds,
            productName: '',
            productQty: '',
            measurementUnit : '', //todo : to dropdownlist/selector
            itemsAvailability : [],
            isAdmin : false,
            isActive : false,

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
            shoppingListDataSource: this.state.shoppingListDataSource.cloneWithRows(this.props.navigation.state.params.itemInLists),
            isAdmin : me.userId == this.props.navigation.state.params.shoppingList.shopperId,
            isActive : this.props.navigation.state.params.shoppingList.active,
            itemsAvailability : this.props.navigation.state.params.itemInLists.map((r) => {return {key : r.ID , value : r.available}})
        });
    }

    componentDidMount() {

        this.fetchShoppingItems();
        return;
        this.interval = setInterval(
            () =>
            {
                alert("about to call getShoppingLists ")
                this.getShoppingLists();

            }, 30000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
                productName_style: styles.productNameStyle_NewProduct
            }
        );
        this.setState({
                productQty_style: styles.productQtyStyle_NewProduct
            }
        );
        this.setState({
                measurementUnit_style: styles.measurementUnitStyle_NewProduct
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

    DuplicateShoppingList = () =>
    {
        const url = "https://dn9tujddr2.execute-api.us-east-1.amazonaws.com/Staging/duplicatelist";
        fetch( url,{
            method: 'POST',
            headers:
                new Headers({'Content-Type': 'application/json'})
            ,
            body:
                JSON.stringify({
                    "shopperId": me.userId,
                    "originListId": this.state.shoppingListId,
                    "newShoppingListName" : "duplicate"
                }),

        }).then((response) => response.json())
            .then((data) =>
            {
                let res = data.toString();
                alert(res);
            }).catch((error) => {
            alert("error : " +error);
        });
    }

    FinishShopping = () =>
    {
        const url = "https://dn9tujddr2.execute-api.us-east-1.amazonaws.com/Staging/finishshopping";
        fetch( url,{
            method: 'POST',
            headers:
                new Headers({'Content-Type': 'application/json'})
            ,
            body:
                JSON.stringify({
                    "shopperId": me.userId,
                    "shoppingListId": this.state.shoppingListId

                }),

        }).then((response) => response.json())
            .then((data) =>
            {
                let res = data.toString();
                alert("Finished Shopping!");
            }).catch((error) => {
            alert("error : " +error);
        });
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


    navigateToImages = (itemInList,isAdmin)=>{
        this.props.navigation.navigate('ImagesDetail',{...itemInList,isAdmin});

    };

    /*
    navigateToComments = (itemInList)=>{
        this.props.navigation.navigate('Notes',{...itemInList});
    };
    */

    getFirstPicture(shoppingListRow)
    {
        var imageUrl;
        if(shoppingListRow.imageUrls != null && shoppingListRow.imageUrls.length > 0 )
        {
            imageUrl = {uri :  shoppingListRow.imageUrls[0]};
        }
        else
        {
            imageUrl = require('./../Images/ImageAdd.png');
        }
        return imageUrl;
    }

    getShoppingLists = () => {

        const url = "https://dn9tujddr2.execute-api.us-east-1.amazonaws.com/Staging/getlistbylistid";
        fetch( url,{
            method: 'POST',
            headers:
                new Headers({'Content-Type': 'application/json'})
            ,
            body:
                JSON.stringify(
                    this.props.navigation.state.params.shoppingList.ID)
        }).then((response) => response.json())
            .then((data) =>
            {
                let shoppingListObj = data.shoppingListWithItems;
                //alert('Data received (ShoppingListDetails):' +shoppingListObj[0].shoppingList.name )

                var newDs = [];
                newDs = shoppingListObj.itemInLists.slice();

                this.setState({
                    shoppingListDataSource:this.state.shoppingListDataSource.cloneWithRows(newDs),
                    isActive : shoppingListObj.shoppingList.active,

                },function() {
                    // do something with new state
                    //alert('Component did mount (ShoppingListDetails):' +this.state.shoppingListDataSource.shoppingList.name )
                });
            }).catch((error) => {
            alert("error : " +error);
        });
    }

    updateItemAvailability = (item) =>
    {
        const url = "https://dn9tujddr2.execute-api.us-east-1.amazonaws.com/Staging/updateiteminlist";
        fetch( url,{
            method: 'POST',
            headers:
                new Headers({'Content-Type': 'application/json'})
            ,
            body:
                JSON.stringify({
                    "itemInListId": item.ID,
                    "listId" : item.listId ,
                    "imageUrls": item.urls,
                    "measurementVolume" : item.measureVolume,
                    "measurementUnit" : item.measureUnit,
                    "itemName" : item.name,
                    "available" : !item.available, // flip availability
                    "alternativeItem" : item.alternativeItem,
                    "comments" : item.comments
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

    getValue(id)
    {
        for(var i =0;i<this.state.itemsAvailability.length;i++){
            if(this.state.itemsAvailability[i].key == id )
            {
                return this.state.itemsAvailability[i].value;
            }
        }
    }

    renderRow(shoppingListRow, sectionId, rowId, highlightRow) {



        return (

            <View style={styles.row}>


                <Text style={styles.productNameStyle}>{shoppingListRow.measureVolume} {shoppingListRow.measureUnit} : {shoppingListRow.name}</Text>

                <CheckBox
                    style={styles.itemAvailablityStyle}
                    onClick={()=>
                    {
                        let itemsAvailability = this.state.itemsAvailability.map(el => (
                            el.key===shoppingListRow.ID ? {...el, key: shoppingListRow.ID, value : !shoppingListRow.available }: el
                        ))
                        this.setState({ itemsAvailability : itemsAvailability });

                        var i=0;
                        while(i<this.state.itemsAvailability.length)
                        {
                            if(this.state.itemsAvailability[i].key == shoppingListRow.ID) {
                                if (this.state.itemsAvailability[i].value === shoppingListRow.available) {
                                    this.updateItemAvailability(shoppingListRow);
                                    i = this.state.itemsAvailability.length;
                                }
                            }
                            i++;
                        }



                        //console.log(this.isChecked);
                        //if(shoppingListRow.available != this.props.isChecked) {
                        //    this.updateItemAvailability(shoppingListRow);
                        //}
                    }}

                    isChecked={
                        this.getValue(shoppingListRow.ID)

                    }//{shoppingListRow.available}

                    disabled={this.state.isActive == false || this.state.isAdmin == false}

                    //leftText={leftText}
                    checkedImage={<Image source={require('./../Images/Check.png')} />}
                    //unCheckedImage={<Image source={require('../../page/my/img/ic_check_box_outline_blank.png')} style={this.props.theme.styles.tabBarSelectedIcon}/>}
                />


                <TouchableHighlight onPress={() => this.navigateToImages(shoppingListRow,this.state.isAdmin)} style={this.state.plus_highlight}>
                    <Image

                        style={this.state.add_comment}
                        source={this.getFirstPicture(shoppingListRow)}
                    />
                </TouchableHighlight>
            </View>
        )
    }

    render() {

        return (
            <ScrollView>
                <View>
                    <Button title="Duplicate"
                            onPress={() =>
                                this.DuplicateShoppingList()
                            }
                    />
                    <ListView
                        dataSource={this.state.shoppingListDataSource}
                        renderRow={this.renderRow.bind(this)}
                    />


                    {this.state.isActive == true &&
                    <View style={styles.row}>

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

                        <Text
                            style={this.state.blankLeft_style}
                        >Add a product...</Text>

                        <TextInput
                            style={this.state.productName_style}
                            value={this.state.productName}
                            placeholder="Enter product"
                            onChangeText={
                                (value) =>
                                    this.setState({
                                        productName: value
                                    })}
                        />

                        <TextInput
                            style={this.state.productQty_style}
                            value={this.state.productQty}
                            placeholder="Quantity"
                            onChangeText={
                                (value) =>
                                    this.setState({
                                        productQty: value
                                    })}
                        />

                        <TextInput
                            style={this.state.measurementUnit_style}
                            value={this.state.measurementUnit}
                            placeholder="#/lb/oz.."
                            onChangeText={
                                (value) =>
                                    this.setState({
                                        measurementUnit: value
                                    })}
                        />

                        <TouchableHighlight onPress={this.onAddCommentClicked} style={this.state.minus_highlight}>
                            <Image

                                style={this.state.minus_image}
                                source={require('./../Images/Add.png')}
                            />
                        </TouchableHighlight>

                        <View
                            style={this.state.blankRight_style}
                        />

                    </View>

                    }
                    <View>
                        {this.state.isAdmin == true && this.state.isActive == true &&
                        <Button title="Check out"
                                onPress={() =>
                                    this.FinishShopping()
                                }
                        />
                        }
                        {this.state.isActive == false &&
                        <Text style={styles.finishShopping}>
                            Shopping List Ended
                        </Text>
                        }
                    </View>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create(
    {
        finishShopping:
            {
                fontSize : 22,
                flex:5,
                padding:8,
                justifyContent: 'center',
            },
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
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom:1,
                backgroundColor: 'ghostwhite'
            },
        productNameStyle:
            {
                fontSize : 22,
                flex:11,
                padding:8,
            },

        productNameStyle_NewProduct:
            {
                fontSize : 15,
                flex:5,
                padding:8,
            },
        productQtyStyle_NewProduct:
            {
                fontSize : 15,
                flex:2,
                padding:2,
            },
        measurementUnitStyle_NewProduct:
            {
                fontSize : 15,
                flex:2,
                padding:2,
            },

        itemAvailablityStyle:
            {
                flex:1,
                padding:2,
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
            },
        show:
            {
                flex: 2,
                padding :8,
            },
        blankRight:
            {
                flex: 1,
                padding :8,
            },
        blankLeft:
            {
                fontSize : 22,
                justifyContent: 'center',
                alignItems: 'center',
                flex:9,
                padding:4,
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
                width : 50,
                height: 50
            },
        viewImages:
            {
                width : 50,
                height: 50
            },
        comments:
            {
                width : 50,
                height: 50
            }
    }
);

ShoppingListDetails.defaultProps = { ...me };

export default ShoppingListDetails;


