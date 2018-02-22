package Requests;

public class FinishShoppingRequest {
    private String shopperId;
    private String shoppingListId;

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

    public FinishShoppingRequest() {
    }

    public FinishShoppingRequest(String shopperId, String shoppingListId) {
        this.shopperId = shopperId;
        this.shoppingListId = shoppingListId;
    }
}
