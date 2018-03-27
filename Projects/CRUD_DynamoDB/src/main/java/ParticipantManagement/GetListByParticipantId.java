package ParticipantManagement;

import DataModel.Item;
import DataModel.ItemInList;
import DataModel.Participant;
import DataModel.ShoppingList;
import DbUtil.DataAccess;
import Responses.GetListByParticipantResponse;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.ArrayList;
import java.util.List;

public class GetListByParticipantId implements RequestHandler<String, GetListByParticipantResponse> {


public static void main(String[] args) {

        String participantId = "10f53f45-d49d-437c-bf36-fa51b87bd34d";
        GetListByParticipantId getParticipantById = new GetListByParticipantId();
        GetListByParticipantResponse result = getParticipantById.handleRequest(participantId, null);
        System.out.println((result.getShoppingListWithItems() != null) + " \n" + result.getExceptionMessage());
        }


    @Override
    public GetListByParticipantResponse handleRequest(String participantId, Context context) {
        Participant participant = null;
        GetListByParticipantResponse listByParticipantResponse = new GetListByParticipantResponse();
        List<GetListByParticipantResponse.ShoppingListWithItems> shoppingListWithItemsList = new ArrayList<>();

        try {

            if(participantId == null || participantId.equals("") )
            {
                throw new Exception("Null request");
            }

            participant = DataAccess.getInstance().load(Participant.class, participantId);
            if (participant == null) {
                throw new Exception("No participant List with ID : " + participantId);

            }

            for(String shoppingListId : participant.getShoppingListIds())
            {
                GetListByParticipantResponse.ShoppingListWithItems shoppingListWithItems = listByParticipantResponse.new ShoppingListWithItems();

                ShoppingList shoppingList;
                try
                {
                    shoppingList =  DataAccess.getInstance().load(ShoppingList.class, shoppingListId);
                    if(shoppingList == null)
                    {
                        throw new Exception("Couldn't fetch shopping list : " + shoppingListId + ", with participant " + participantId);
                    }
                    List<ItemInList> itemsInList = new ArrayList<>();
                    for(String itemId : shoppingList.getItemInListIds())
                    {
                        ItemInList itemInList;
                        try
                        {
                            itemInList = DataAccess.getInstance().load(ItemInList.class, itemId);
                            if(itemInList == null)
                            {
                                throw new Exception("Couldn't fetch itemInList : "+ itemId +",with shopping list : " + shoppingListId + ", with participant " + participantId);
                            }

                            itemsInList.add(itemInList);
                        }
                        catch(Exception ex)
                        {
                            //TODO : log + logic : what happens if iten doesn't exist at list for user
                        }
                    }
                    shoppingListWithItems.setItemInLists(itemsInList);
                    shoppingListWithItems.setShoppingList(shoppingList);
                    shoppingListWithItemsList.add(shoppingListWithItems);
                }
                catch(Exception ex)
                {
                    //TODO : log + logic : what happens if list doesn't exist for user
                }
            }
            listByParticipantResponse.setShoppingListWithItems(shoppingListWithItemsList);
        }
        catch (Exception ex)
        {
            listByParticipantResponse.setExceptionMessage(ex.getMessage());
        }
        finally {
            return listByParticipantResponse;
        }
    }
}
