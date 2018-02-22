package Responses;

public class FinishShoppingResponse {
    private String shoppingListId;
    private String exceptionMessage;

    public FinishShoppingResponse(String shoppingListId, String exceptionMessage) {
        this.shoppingListId = shoppingListId;
        this.exceptionMessage = exceptionMessage;
    }

    public FinishShoppingResponse() {
    }

    public String getShoppingListId() {
        return shoppingListId;
    }

    public void setShoppingListId(String shoppingListId) {
        this.shoppingListId = shoppingListId;
    }

    public String getExceptionMessage() {
        return exceptionMessage;
    }

    public void setExceptionMessage(String exceptionMessage) {
        this.exceptionMessage = exceptionMessage;
    }
}
