package ParticipantManagement;

import DataModel.Participant;
import DbUtil.DataAccess;
import Requests.EditParticipantRequest;
import Responses.GetParticipantResponse;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class EditParticipant implements RequestHandler<EditParticipantRequest, GetParticipantResponse> {

    public static void main(String[] args)
    {
        EditParticipantRequest listRequest = new EditParticipantRequest("10f53f45-d49d-437c-bf36-fa51b87bd34d","main_test","main@main.com",true);
        EditParticipant finishShopping = new EditParticipant();
        GetParticipantResponse result = finishShopping.handleRequest(listRequest, null);
        System.out.println(result.getParticipant().getID() +" \n"+result.getExceptionMessage());
    }
    @Override
    public GetParticipantResponse handleRequest(EditParticipantRequest editParticipant, Context context) {
        GetParticipantResponse participantResponse = new GetParticipantResponse();

        try {

            if(editParticipant== null)
            {
                throw new Exception("Null request");
            }

            Participant participant = DataAccess.getInstance().load(Participant.class, editParticipant.getParticipantId());
            if (participant == null) {
                throw new Exception("No Shopping List with ID : " + editParticipant.getParticipantId());
            }

            participant.setEmail(editParticipant.getEmail());
            participant.setShowNotifications(editParticipant.isAllowSettings());
            participant.setNickname(editParticipant.getNickName());

            DataAccess.getInstance().save(participant);

            participantResponse.setParticipant(participant);
            participantResponse.setExceptionMessage("");
        }
        catch (Exception ex)
        {
            participantResponse.setExceptionMessage(ex.getMessage());
        }
        finally {
            return participantResponse;
        }
    }
}
