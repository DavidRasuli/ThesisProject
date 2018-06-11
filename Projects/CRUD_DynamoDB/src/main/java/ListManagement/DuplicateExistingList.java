package ListManagement;

import DataModel.Participant;
import DataModel.ShoppingList;
import DbUtil.DataAccess;
import ParticipantManagement.GetListByParticipantId;
import Requests.DuplicateListRequest;
import Responses.GetListByParticipantResponse;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class DuplicateExistingList implements RequestHandler<DuplicateListRequest, GetListByParticipantResponse> {

    public static void main(String[] args)
    {
        DuplicateListRequest listRequest = new DuplicateListRequest("10f53f45-d49d-437c-bf36-fa51b87bd34d","8426976b-ac2e-45b4-922a-3f86c1352abd","Duplicate");
        DuplicateExistingList createList = new DuplicateExistingList();
        GetListByParticipantResponse result = createList.handleRequest(listRequest, null);
        System.out.println(result);
    }

    @Override
    public GetListByParticipantResponse handleRequest(DuplicateListRequest duplicateListRequest, Context context) {
        GetListByParticipantResponse listByParticipantResponse;
        try {
            if (duplicateListRequest == null) {
                throw new Exception("Null request");
            }

            Participant shopper = DataAccess.getInstance().load(Participant.class,duplicateListRequest.getShopperId());

            if(shopper == null)
            {
                throw new Exception("No shopper with Id : " + duplicateListRequest.getShopperId());
            }

            ShoppingList originalList = DataAccess.getInstance().load(ShoppingList.class, duplicateListRequest.getOriginListId());

            if(originalList == null)
            {
                throw new Exception("No list with Id : " + duplicateListRequest.getOriginListId());
            }

            ShoppingList newShoppingList = originalList.createClone(duplicateListRequest.getShopperId(),duplicateListRequest.getNewShoppingListName());
            shopper.getShoppingListIds().add(newShoppingList.getID());
            DataAccess.getInstance().save(shopper);
            //TODO : Calling another web method, but in the same request
            GetListByParticipantId getListByParticipantId = new GetListByParticipantId();
            listByParticipantResponse = getListByParticipantId.handleRequest(duplicateListRequest.getShopperId(),context);
        }
        catch (Exception ex)
        {
            listByParticipantResponse = new GetListByParticipantResponse();
            listByParticipantResponse.setExceptionMessage(ex.getMessage());
        }
        return listByParticipantResponse;
    }
}
