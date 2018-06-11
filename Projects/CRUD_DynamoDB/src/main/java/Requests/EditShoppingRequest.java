package Requests;

import java.util.List;

public class EditShoppingRequest {
    private String shopperId;
    private String shoppingListId;
    private String name;

    public void setParticipantsIds(List<String> participantsIds) {
        this.participantsIds = participantsIds;
    }

    private List<String> participantsIds;

    public EditShoppingRequest() {
    }

    public EditShoppingRequest(String shopperId, String shoppingListId, String name,List<String> participantsIds) {
        this.shopperId = shopperId;
        this.shoppingListId = shoppingListId;
        this.name = name;
        this.participantsIds = participantsIds;
    }

    public String getShopperId() {
        return shopperId;
    }

    public void setShopperId(String shopperId) {
        this.shopperId = shopperId;
    }

    public String getShoppingListId() {
        return shoppingListId;
    }

    public void setShoppingListId(String shoppingListId) {
        this.shoppingListId = shoppingListId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getParticipantsIds() {
        return participantsIds;
    }

}
