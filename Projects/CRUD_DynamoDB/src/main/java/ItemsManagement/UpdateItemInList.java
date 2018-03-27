package ItemsManagement;
import DataModel.ItemInList;
import DbUtil.DataAccess;
import Requests.EditItemInListRequest;
import Requests.EditShoppingRequest;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class UpdateItemInList implements RequestHandler <EditItemInListRequest,String>{

    public static void main(String[] args)
    {
        EditItemInListRequest request = new EditItemInListRequest("d73243cb-5efc-4c7e-8917-d38ed9ce50d3", 3, "#", "Milky", null, true, Arrays.asList(new String[]{
        "https://ih1.redbubble.net/image.57167014.3696/flat,1000x1000,075,f.jpg"}),Arrays.asList(new String[]{
                ""}),null);
        UpdateItemInList finishShopping = new UpdateItemInList();
        String result = finishShopping.handleRequest(request, null);
        System.out.println(result);
    }


    @Override
    public String handleRequest(EditItemInListRequest editItemInListRequest, Context context) {
        String response = "";

        try {

            if(editItemInListRequest== null)
            {
                throw new Exception("Null request");
            }

            ItemInList itemInList = DataAccess.getInstance().load(ItemInList.class, editItemInListRequest.getItemInListId());
            if (itemInList == null) {
                throw new Exception("No Shopping List with ID : " + editItemInListRequest.getItemInListId());
            }

            itemInList.setAvailable(editItemInListRequest.isAvailable());
            itemInList.setMeasureUnit(editItemInListRequest.getMeasurementUnit());
            itemInList.setMeasureVolume(editItemInListRequest.getmeasurementVolume());
            itemInList.setSuggestionId(editItemInListRequest.getAlternativeItem());
            itemInList.setImageUrls(editItemInListRequest.getImageUrls());
            itemInList.setName(editItemInListRequest.getItemName());
            itemInList.setComments(editItemInListRequest.getComments());
            DataAccess.getInstance().save(itemInList);
        }
        catch (Exception ex)
        {
            response = ex.getMessage();
        }
        finally {
            return response;
        }
    }
}
