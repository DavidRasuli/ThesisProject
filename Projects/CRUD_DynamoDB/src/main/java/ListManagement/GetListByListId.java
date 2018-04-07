package ListManagement;

import DataModel.ItemInList;
import DataModel.ShoppingList;
import DbUtil.DataAccess;
import Responses.GetListByListIdResponse;
import Responses.ShoppingListWithItems;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.ArrayList;
import java.util.List;

public class GetListByListId implements RequestHandler<String, GetListByListIdResponse> {


    public static void main(String[] args) {

        String shoppingListId = "8426976b-ac2e-45b4-922a-3f86c1352abd";
        GetListByListId getListById = new GetListByListId();
        GetListByListIdResponse result = getListById.handleRequest(shoppingListId, null);
        System.out.println((result.getShoppingListWithItems() != null) + " \n" + result.getExceptionMessage());
    }


    @Override

    public GetListByListIdResponse handleRequest(String shoppingListId, Context context) {
        ShoppingList shoppingList = null;
        GetListByListIdResponse listByParticipantResponse = new GetListByListIdResponse();


        try {

            if (shoppingListId == null || shoppingListId.equals("")) {
                throw new Exception("Null request");
            }

            shoppingList = DataAccess.getInstance().load(ShoppingList.class, shoppingListId);
            if (shoppingList == null) {
                throw new Exception("No shopping list with ID : " + shoppingListId);

            }

            shoppingList = DataAccess.getInstance().load(ShoppingList.class, shoppingListId);
            if (shoppingList == null) {
                throw new Exception("Couldn't fetch shopping list : " + shoppingListId);
            }
            List<ItemInList> itemsInList = new ArrayList<>();
            for (String itemId : shoppingList.getItemInListIds()) {
                ItemInList itemInList;
                try {
                    itemInList = DataAccess.getInstance().load(ItemInList.class, itemId);
                    if (itemInList == null) {
                        throw new Exception("Couldn't fetch itemInList : " + itemId + ",with shopping list : " + shoppingListId );
                    }

                    itemsInList.add(itemInList);
                } catch (Exception ex) {
                    //TODO : log + logic : what happens if iten doesn't exist at list for user
                }
            }
            ShoppingListWithItems shoppingListWithItems = new ShoppingListWithItems(shoppingList,itemsInList);
            listByParticipantResponse.setShoppingListWithItems(shoppingListWithItems);
        } catch (Exception ex) {
            listByParticipantResponse.setExceptionMessage(ex.getMessage());
        } finally {
            return listByParticipantResponse;
        }
    }
}






