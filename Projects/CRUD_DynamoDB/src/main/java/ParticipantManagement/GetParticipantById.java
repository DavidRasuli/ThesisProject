package ParticipantManagement;


import DataModel.Participant;
import DbUtil.DataAccess;
import Responses.GetParticipantResponse;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class GetParticipantById implements RequestHandler<String, GetParticipantResponse> {


    public static void main(String[] args) {

        String participantId = "10f53f45-d49d-437c-bf36-fa51b87bd34d";
        GetParticipantById getParticipantById = new GetParticipantById();
        GetParticipantResponse result = getParticipantById.handleRequest(participantId, null);
        System.out.println(result.getParticipant() + " \n" + result.getExceptionMessage());
    }
    @Override
    public GetParticipantResponse handleRequest(String participantId, Context context) {
        Participant participant = null;
        GetParticipantResponse participantResponse = new GetParticipantResponse();
        try {

            if(participantId == null || participantId.equals("") )
            {
                throw new Exception("Null request");
            }

            participant = DataAccess.getInstance().load(Participant.class, participantId);
            if (participant == null) {
                throw new Exception("No participant List with ID : " + participantId);

            }

            participantResponse.setParticipant(participant);
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
