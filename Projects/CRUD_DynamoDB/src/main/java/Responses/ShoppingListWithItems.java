package Responses;

import DataModel.ItemInList;
import DataModel.ShoppingList;

import java.util.List;

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
