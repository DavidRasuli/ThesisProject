package ListManagement;

import DataModel.ShoppingList;
import DbUtil.DataAccess;
import Requests.FinishShoppingRequest;
import Responses.FinishShoppingResponse;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.time.LocalDateTime;

public class FinishShoppingList implements RequestHandler<FinishShoppingRequest, FinishShoppingResponse> {

    public static void main(String[] args)
    {
        FinishShoppingRequest listRequest = new FinishShoppingRequest("10f53f45-d49d-437c-bf36-fa51b87bd34d","8426976b-ac2e-45b4-922a-3f86c1352abd");
        FinishShoppingList finishShopping = new FinishShoppingList();
        FinishShoppingResponse result = finishShopping.handleRequest(listRequest, null);
        System.out.println(result.getShoppingListId() +" \n"+result.getExceptionMessage());
    }

    @Override
    public FinishShoppingResponse handleRequest(FinishShoppingRequest finishShoppingRequest, Context context) {

        FinishShoppingResponse finishShoppingResponse = new FinishShoppingResponse();

        try {

            if(finishShoppingRequest== null)
            {
                throw new Exception("Null request");
            }

            ShoppingList shoppingList = DataAccess.getInstance().load(ShoppingList.class, finishShoppingRequest.getShoppingListId());
            if (shoppingList == null) {
                throw new Exception("No Shopping List with ID : " + finishShoppingRequest.getShoppingListId());
            }
            if (shoppingList.getShopperId().equals(finishShoppingRequest.getShopperId())== false) {
                throw new Exception("Shopper with ID : " + finishShoppingRequest.getShopperId() + " is not the owner of the Shopping List");
            }
            shoppingList.setEndedAt(LocalDateTime.now().toString());
            shoppingList.setActive(false);
            DataAccess.getInstance().save(shoppingList);

            finishShoppingResponse.setShoppingListId(finishShoppingRequest.getShoppingListId());
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
