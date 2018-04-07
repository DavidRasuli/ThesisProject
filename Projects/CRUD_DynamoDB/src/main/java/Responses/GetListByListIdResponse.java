package Responses;

import DataModel.ItemInList;
import DataModel.ShoppingList;

import java.util.List;

public class GetListByListIdResponse {

    public ShoppingListWithItems getShoppingListWithItems() {
        return shoppingListWithItems;
    }

    public void setShoppingListWithItems(ShoppingListWithItems shoppingListWithItems) {
        this.shoppingListWithItems = shoppingListWithItems;
    }

    private ShoppingListWithItems shoppingListWithItems;
    private String exceptionMessage;

    public GetListByListIdResponse(ShoppingListWithItems shoppingListWithItems, String exceptionMessage) {
        this.shoppingListWithItems = shoppingListWithItems;
        this.exceptionMessage = exceptionMessage;
    }

    public GetListByListIdResponse() {

    }


    public String getExceptionMessage() {
        return exceptionMessage;
    }

    public void setExceptionMessage(String exceptionMessage) {
        this.exceptionMessage = exceptionMessage;
    }
}
