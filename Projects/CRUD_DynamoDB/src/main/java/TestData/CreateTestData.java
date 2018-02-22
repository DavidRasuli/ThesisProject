package TestData;

import DataModel.*;
import DbUtil.DataAccess;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedList;


import java.time.LocalDateTime;
import java.util.Arrays;


public class CreateTestData {

    public static void main(String[] args)
    {
/*
        //no dependencies
        createAddress(3);
        createActivityLogs(3);
        createItems(3);

        //depends on addresses
        createParticipants(3);
        createStores(3);

        //depends on participants and stores
        createShoppingLists(3);
        //depends on items and lists
        createItemsInLists(3);

        //depends on list & participant
        createNotificationLogs(3);
*/


    }

    static void createAddress(int count)
    {
        for(int i=0; i < count; i++)
        {
            Address address = new Address("street1_"+ i,"street2_"+i,"city_"+i,"zip_"+i,"State_"+i,"Country_"+i);
            DataAccess.getInstance().save(address);
        }
    }

    static void createActivityLogs(int count)
    {
        for(int i=0; i < count; i++)
        {
            ActivityLog activityLog = new ActivityLog("Some Log_"+i, LocalDateTime.now());
            DataAccess.getInstance().save(activityLog);
        }
    }

    static void createItems(int count)
    {
        for(int i=0; i < count; i++)
        {
            Item item = new Item("Item Name_"+i,"Alt Name_"+i,"Item Type_"+i,"Category_"+i);
            DataAccess.getInstance().save(item);
        }
    }

    static void createItemsInLists(int count)
    {
            for(int i=0; i < count; i++)
            {
                ItemInList itemInList = new ItemInList(getExistingListId(),getExistingItemId(),i,"KG",true,true,getExistingItemId());
                DataAccess.getInstance().save(itemInList);
            }
    }

    static void createNotificationLogs(int count)
    {
        for(int i=0; i < count; i++)
        {
            NotificationsLog notificationsLog = new NotificationsLog(getExistingListId(),getExistingUser(),LocalDateTime.now(),"Notification_"+i,"success");
            DataAccess.getInstance().save(notificationsLog);
        }
    }

    static void createParticipants(int count)
    {
        String strDatewithTime = "2015-08-04T10:11:30";
        LocalDateTime birthdate = LocalDateTime.parse(strDatewithTime);
        for(int i=0; i < count; i++)
        {
            Participant participant = new Participant("First_"+i,String.valueOf(i),"Last_"+i,"Mr_"+i,null,null,birthdate,"M",i+"@gmail.com","05555555",getExistingAddress(),"052222222");
            DataAccess.getInstance().save(participant);
        }
    }

    static void createShoppingLists(int count)
    {
        for(int i=0; i < count; i++)
        {
            ShoppingList shoppingList = new ShoppingList(getExistingUser(),"Shopping List Name_"+i,true, Arrays.asList(getExistingUser()),getExistingStore());
            DataAccess.getInstance().save(shoppingList);
        }
    }

    static void createStores(int count)
    {
        for(int i=0; i < count; i++)
        {
            Store store = new Store(getExistingAddress(),"Store name_"+i,"Brand_"+i,"www.website"+i+".com");
            DataAccess.getInstance().save(store);
        }
    }

    static String getExistingListId()
    {
        try {
            PaginatedList itemList = DataAccess.getInstance().scan(ShoppingList.class,
                    new DynamoDBScanExpression().withLimit(1));

            if (itemList == null || itemList.size() == 0) {
                throw new Exception("No shopping items in table ShoppingLists");
            }
            return ((ShoppingList) itemList.get(0)).getID();
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
            return "";
        }
    }

    static String getExistingItemId()
    {
        try {
            PaginatedList itemList = DataAccess.getInstance().scan(Item.class,
                    new DynamoDBScanExpression().withLimit(1));

            if (itemList == null || itemList.size() == 0) {
                throw new Exception("No shopping lists in table Items");
            }
            return ((Item) itemList.get(0)).getID();
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
            return "";
        }
    }

    static String getExistingUser()
    {
        try {

            PaginatedList itemList = DataAccess.getInstance().scan(Participant.class,
                    new DynamoDBScanExpression().withLimit(1));

            if (itemList == null || itemList.size() == 0) {
                throw new Exception("No shopping items in table Participants");
            }
            return ((Participant) itemList.get(0)).getID();
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
            return "";
        }
    }


    static String getExistingAddress()
    {
        try {
            PaginatedList itemList = DataAccess.getInstance().scan(Address.class,
                    new DynamoDBScanExpression().withLimit(1));

            if (itemList == null || itemList.size() == 0) {
                throw new Exception("No shopping items in table Addresses");
            }
            return ((Address) itemList.get(0)).getID();
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
            return "";
        }
    }


    static String getExistingStore()
    {
        try {
            PaginatedList itemList = DataAccess.getInstance().scan(Store.class,
                    new DynamoDBScanExpression().withLimit(1));

            if (itemList == null || itemList.size() == 0) {
                throw new Exception("No shopping items in table Stores");
            }
            return ((Store) itemList.get(0)).getID();
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
            return "";
        }
    }

}
