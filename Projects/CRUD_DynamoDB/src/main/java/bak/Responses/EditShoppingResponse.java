package Responses;

public class EditShoppingResponse {
    private String shoppingListId; //TODO : Remove
    private String exceptionMessage;

    public EditShoppingResponse(String shoppingListId, String exceptionMessage) {
        this.shoppingListId = shoppingListId;
        this.exceptionMessage = exceptionMessage;
    }

    public EditShoppingResponse() {
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
