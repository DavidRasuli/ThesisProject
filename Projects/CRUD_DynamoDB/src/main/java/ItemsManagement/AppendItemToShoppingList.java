package ItemsManagement;

import DataModel.ItemInList;
import DataModel.Participant;
import DataModel.ShoppingList;
import DbUtil.DataAccess;
import ListManagement.CreateShoppingList;
import Requests.CreateListRequest;
import Requests.EditItemInListRequest;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.ArrayList;

public class AppendItemToShoppingList  implements RequestHandler<EditItemInListRequest, String> {


    public static void main(String[] args)
    {
        EditItemInListRequest listRequest = new EditItemInListRequest(null,5,"#","Bread",null,false,null,null,"8426976b-ac2e-45b4-922a-3f86c1352abd");
        AppendItemToShoppingList appendItemToShoppingList = new AppendItemToShoppingList();
        String result = appendItemToShoppingList.handleRequest(listRequest, null);
        System.out.println(result);
    }

    @Override
    public String handleRequest(EditItemInListRequest request, Context context) {
        try {



            ShoppingList shoppingList = DataAccess.getInstance().load(ShoppingList.class, request.getListId());

            if (shoppingList == null) {
                throw new Exception("No shoppingList with Id : " + shoppingList.getID());
            }

            ItemInList newItemInList = new ItemInList(shoppingList.getID(), null/*TODO : what should be the ID here ?*/, request.getmeasurementVolume(), request.getMeasurementUnit(), true, false, null, request.getItemName());

            DataAccess.getInstance().save(newItemInList);

            shoppingList.getItemInListIds().add(newItemInList.getID());

            DataAccess.getInstance().save(shoppingList);
            return String.format(shoppingList.getID());
        } catch (Exception ex) {
            return String.format(ex.getMessage());
        }
    }
}
