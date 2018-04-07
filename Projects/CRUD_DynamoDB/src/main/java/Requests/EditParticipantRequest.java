package Requests;

import ParticipantManagement.EditParticipant;
import org.apache.commons.lang3.StringUtils;

public class EditParticipantRequest {
    private String participantId;
    private String nickName;
    private String email;
    private boolean allowSettings;

    public EditParticipantRequest()
    {

    }

    public EditParticipantRequest(String participantId, String nickName, String email, boolean allowSettings) {
        this.participantId = participantId;
        this.nickName = nickName;
        this.email = email;
        this.allowSettings = allowSettings;
    }

    public String getParticipantId() {
        return participantId;
    }

    public void setParticipantId(String participantId) {
        if(StringUtils.isEmpty(participantId) == false) {
            this.participantId = participantId;
        }
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        if(StringUtils.isEmpty(nickName) == false) {
            this.nickName = nickName;
        }
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        if(StringUtils.isEmpty(email) == false) {
            this.email = email;
        }
    }

    public boolean isAllowSettings() {
        return allowSettings;
    }

    public void setAllowSettings(boolean allowSettings) {
        this.allowSettings = allowSettings;
    }
}
