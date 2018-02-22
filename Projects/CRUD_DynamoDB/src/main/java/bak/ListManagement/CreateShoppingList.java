package ListManagement;

import DataModel.Participant;
import DataModel.ShoppingList;
import DbUtil.DataAccess;
import Requests.CreateListRequest;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.ArrayList;

public class CreateShoppingList implements RequestHandler<CreateListRequest, String> {


    public static void main(String[] args)
    {
        CreateListRequest listRequest = new CreateListRequest("123",new ArrayList<String>(),new ArrayList<String>(),"some shopping list","123");
        CreateShoppingList createList = new CreateShoppingList();
        String result = createList.handleRequest(listRequest, null);
        System.out.println(result);
    }

    @Override
    public String handleRequest(CreateListRequest request, Context context) {
       try {


           Participant shopper = DataAccess.getInstance().load(Participant.class,request.getShopperId());
           if(shopper == null)
           {
               throw new Exception("No shopper with Id : " + request.getShopperId());
           }

           ShoppingList shoppingList = new ShoppingList( request.getShopperId(), "Shopping List 1", true, request.getParticipantIds(),request.getStoreId());

           DataAccess.getInstance().save(shoppingList);
           return String.format("Hello Address with id : ", shoppingList.getID());
       }
        catch (Exception ex) {
            return String.format("Bad %s." + ex.getMessage());
        }
    }
}
