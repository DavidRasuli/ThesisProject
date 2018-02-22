package Responses;

import DataModel.ItemInList;
import DataModel.ShoppingList;

import java.util.List;

public class GetListByParticipantResponse {

    public List<ShoppingListWithItems> getShoppingListWithItems() {
        return shoppingListWithItems;
    }

    public void setShoppingListWithItems(List<ShoppingListWithItems> shoppingListWithItems) {
        this.shoppingListWithItems = shoppingListWithItems;
    }

    private List<ShoppingListWithItems> shoppingListWithItems;
    private String exceptionMessage;

    public GetListByParticipantResponse(List<ShoppingListWithItems> shoppingListWithItems, String exceptionMessage) {
        this.shoppingListWithItems = shoppingListWithItems;
        this.exceptionMessage = exceptionMessage;
    }

    public GetListByParticipantResponse() {

    }


    public String getExceptionMessage() {
        return exceptionMessage;
    }

    public void setExceptionMessage(String exceptionMessage) {
        this.exceptionMessage = exceptionMessage;
    }


    public class ShoppingListWithItems
    {
        private ShoppingList shoppingList;
        private List<ItemInList> itemInLists;

        public ShoppingListWithItems(ShoppingList shoppingList, List<ItemInList> itemInLists) {
            this.shoppingList = shoppingList;
            this.itemInLists = itemInLists;
        }

        public ShoppingListWithItems()
        {

        }

        public ShoppingList getShoppingList() {
            return shoppingList;
        }

        public void setShoppingList(ShoppingList shoppingList) {
            this.shoppingList = shoppingList;
        }

        public List<ItemInList> getItemInLists() {
            return itemInLists;
        }

        public void setItemInLists(List<ItemInList> itemInLists) {
            this.itemInLists = itemInLists;
        }
    }


}

/*

"id": "123",
        "name": "Weekly Grocery",
        "itemsInList":
        [
            {
                "id":"212",
                "name":"Milk",
                "measurementUnit" : "",
                "volume" : "1"
            },
            {
                "id":"213",
                "name":"Whole Wheat Bread",
                "measurementUnit" : "",
                "volume" : "1"
            },
            {
                "id":"214",
                "name":"Tomatoes",
                "measurementUnit" : "Kg",
                "volume" : "1.5"
            }
        ],
        "isActive" : true,
        "picture" : "http://www.bankcheckingsavings.com/wp-content/uploads/2016/01/shopping-cart-trick.png"

 */