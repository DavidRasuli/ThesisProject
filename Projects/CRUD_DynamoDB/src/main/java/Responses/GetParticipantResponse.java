package Responses;

import DataModel.Participant;

public class GetParticipantResponse {

    private Participant participant;
    private String exceptionMessage;

    public GetParticipantResponse()
    {

    }

    public GetParticipantResponse(Participant participant, String exceptionMessage) {
        this.participant = participant;
        this.exceptionMessage = exceptionMessage;
    }


    public String getExceptionMessage() {
        return exceptionMessage;
    }

    public void setExceptionMessage(String exceptionMessage) {
        this.exceptionMessage = exceptionMessage;
    }

    public Participant getParticipant() {
        return participant;
    }

    public void setParticipant(Participant participant) {
        this.participant = participant;
    }
}
