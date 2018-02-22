package Requests;

import java.util.ArrayList;
import java.util.List;

public class CreateListRequest {

    private String shopperId;

    private List<String> participantIds;

    private List<String> itemInListIds;

    private String name;

    private String storeId;

    public CreateListRequest(String shopperId, List<String> participantIds, List<String> itemInListIds, String name,String store) {
        this.shopperId = shopperId;
        this.participantIds = participantIds;
        this.itemInListIds = itemInListIds;
        this.name = name;
        this.storeId = store;
    }

    public String getShopperId() {
        return shopperId;
    }

    public void setShopperId(String shopperId) {
        this.shopperId = shopperId;
    }

    public List<String> getParticipantIds() {
        return participantIds;
    }

    public void setParticipantIds(ArrayList<String> participantIds) {
        this.participantIds = participantIds;
    }

    public List<String> getItemInListIds() {
        return itemInListIds;
    }

    public void setItemInListIds(List<String> itemInListIds) {
        this.itemInListIds = itemInListIds;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setParticipantIds(List<String> participantIds) {
        this.participantIds = participantIds;
    }

    public String getStoreId() {
        return storeId;
    }

    public void setStoreId(String storeId) {
        this.storeId = storeId;
    }
}
