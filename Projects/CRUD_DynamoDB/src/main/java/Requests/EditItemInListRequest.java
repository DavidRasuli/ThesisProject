package Requests;

import org.apache.commons.lang3.StringUtils;

import java.util.List;


public class EditItemInListRequest {
    private String listId;
    private String itemInListId;
    private int measurementVolume;
    private String measurementUnit;
    private String itemName;
    private String alternativeItem;
    private List<String> imageUrls;
    private List<String> comments;


    public EditItemInListRequest()
    {

    }

    public EditItemInListRequest(String itemInListId, int measurementVolume, String measurementUnit, String itemName, String alternativeItem, boolean available, List<String> imageUrls,
                                 List<String> comments,String listId) {
        this.itemInListId = itemInListId;
        this.measurementVolume = measurementVolume;
        this.measurementUnit = measurementUnit;
        this.itemName = itemName;
        this.alternativeItem = alternativeItem;
        this.available = available;
        this.imageUrls = imageUrls;
        this.comments = comments;
        this.listId = listId;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    private boolean available;




    public String getItemInListId() {
        return itemInListId;
    }

    public void setItemInListId(String itemInListId) {
        if(StringUtils.isEmpty(itemInListId) == false) {
            this.itemInListId = itemInListId;
        }
    }

    public int getmeasurementVolume() {
        return measurementVolume;
    }

    public void setmeasurementVolume(int measurementVolume) {
        if (measurementVolume > 0) {
            this.measurementVolume = measurementVolume;
        }
    }

    public String getMeasurementUnit() {
        return measurementUnit;
    }

    public void setMeasurementUnit(String measurementUnit) {
        if (StringUtils.isEmpty(measurementUnit) == false) {
            this.measurementUnit = measurementUnit;
        }
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        if (StringUtils.isEmpty(itemName) == false) {
            this.itemName = itemName;
        }
    }

    public String getAlternativeItem() {
        return alternativeItem;
    }

    public void setAlternativeItem(String alternativeItem) {
        if (StringUtils.isEmpty(alternativeItem) == false) {
            this.alternativeItem = alternativeItem;
        }
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public List<String> getComments() {
        return comments;
    }

    public void setComments(List<String> comments) {
        this.comments = comments;
    }

    public String getListId() {
        return listId;
    }

    public void setListId(String listId) {
        if(StringUtils.isEmpty(itemInListId) == false) {
            this.itemInListId = itemInListId;
        }
    }
}
