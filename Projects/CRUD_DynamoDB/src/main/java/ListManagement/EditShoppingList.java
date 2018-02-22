package ListManagement;

import DataModel.ShoppingList;
import DbUtil.DataAccess;
import Requests.EditShoppingRequest;
import Responses.EditShoppingResponse;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class EditShoppingList implements RequestHandler<EditShoppingRequest, EditShoppingResponse> {

    public static void main(String[] args)
    {
        EditShoppingRequest listRequest = new EditShoppingRequest("10f53f45-d49d-437c-bf36-fa51b87bd34d","8426976b-ac2e-45b4-922a-3f86c1352abd","New Name 1");
        EditShoppingList finishShopping = new EditShoppingList();
        EditShoppingResponse result = finishShopping.handleRequest(listRequest, null);
        System.out.println(result.getShoppingListId() +" \n"+result.getExceptionMessage());
    }

    @Override
    public EditShoppingResponse handleRequest(EditShoppingRequest editShoppingRequest, Context context) {
        EditShoppingResponse finishShoppingResponse = new EditShoppingResponse();

        try {

            if(editShoppingRequest== null)
            {
                throw new Exception("Null request");
            }

            ShoppingList shoppingList = DataAccess.getInstance().load(ShoppingList.class, editShoppingRequest.getShoppingListId());
            if (shoppingList == null) {
                throw new Exception("No Shopping List with ID : " + editShoppingRequest.getShoppingListId());
            }
            if (shoppingList.getShopperId().equals(editShoppingRequest.getShopperId())== false) {
                throw new Exception("Shopper with ID : " + editShoppingRequest.getShopperId() + " is not the owner of the Shopping List");
            }
            shoppingList.setName(editShoppingRequest.getName());
            DataAccess.getInstance().save(shoppingList);

            finishShoppingResponse.setShoppingListId(editShoppingRequest.getShoppingListId());
            finishShoppingResponse.setExceptionMessage("");

        }
        catch (Exception ex)
        {
            finishShoppingResponse.setExceptionMessage(ex.getMessage());
        }
        finally {
            return finishShoppingResponse;
        }
    }
}
