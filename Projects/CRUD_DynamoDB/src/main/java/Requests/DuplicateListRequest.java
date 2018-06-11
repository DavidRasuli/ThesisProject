package Requests;

public class DuplicateListRequest {

    private String shopperId;

    private String originListId;

    public String getNewShoppingListName() {
        return newShoppingListName;
    }

    public void setNewShoppingListName(String newShoppingListName) {
        this.newShoppingListName = newShoppingListName;
    }

    private String newShoppingListName;

    public DuplicateListRequest(String shopperId, String originListId,String newShoppingListName) {
        this.shopperId = shopperId;
        this.originListId = originListId;
        this.newShoppingListName = newShoppingListName;
    }

    public DuplicateListRequest()
    {

    }

    public String getShopperId() {
        return shopperId;
    }

    public void setShopperId(String shopperId) {
        this.shopperId = shopperId;
    }

    public String getOriginListId() {
        return originListId;
    }

    public void setOriginListId(String originListId) {
        this.originListId = originListId;
    }
}
