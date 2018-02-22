package Requests;

public class EditShoppingRequest {
    private String shopperId;
    private String shoppingListId;
    private String name;

    public EditShoppingRequest() {
    }

    public EditShoppingRequest(String shopperId, String shoppingListId, String name) {
        this.shopperId = shopperId;
        this.shoppingListId = shoppingListId;
        this.name = name;
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
}
