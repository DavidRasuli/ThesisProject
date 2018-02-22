package DataModel;

import DateUtil.DateFormatting;
import com.amazonaws.services.dynamodbv2.datamodeling.*;

import java.time.LocalDateTime;

@DynamoDBTable(tableName="Participants")
public class Participant {

	private String ID;

	private LocalDateTime creationDate;

	private String firstName;

	private String middleName;

	private String lastName;

	private String nickname;

	private String facebookUserId;

	private String googleUserId;

	private LocalDateTime dateOfBirth;

	private String gender;

	private String email;

	private String phone;

	private String addressId;

	private String mobileID;

	@DynamoDBHashKey(attributeName="ID")
	@DynamoDBAutoGeneratedKey
	public String getID() {
		return ID;
	}

	@DynamoDBAttribute(attributeName="CreationDate")
	public String getCreationDate() {
		return DateFormatting.getFormattedDate( creationDate);
	}

	@DynamoDBAttribute(attributeName="FirstName")
	public String getFirstName() {
		return firstName;
	}

	@DynamoDBAttribute(attributeName="MiddleName")
	public String getMiddleName() {
		return middleName;
	}

	@DynamoDBAttribute(attributeName="LastName")
	public String getLastName() {
		return lastName;
	}

	@DynamoDBAttribute(attributeName="Nickname")
	public String getNickname() {
		return nickname;
	}

	@DynamoDBAttribute(attributeName="FacebookUserId")
	public String getFacebookUserId() {
		return facebookUserId;
	}

	@DynamoDBAttribute(attributeName="GoogleUserId")
	public String getGoogleUserId() {
		return googleUserId;
	}

	@DynamoDBAttribute(attributeName="DateOfBirth")
	public String getDateOfBirth() {
		return DateFormatting.getFormattedDate(dateOfBirth);
	}

	@DynamoDBAttribute(attributeName="Gender")
	public String getGender() {
		return gender;
	}

	@DynamoDBAttribute(attributeName="Email")
	public String getEmail() {
		return email;
	}

	@DynamoDBAttribute(attributeName="Phone")
	public String getPhone() {
		return phone;
	}

	@DynamoDBAttribute(attributeName="AddressId")
	public String getAddressId() {
		return addressId;
	}

	@DynamoDBAttribute(attributeName="MobileID")
	public String getMobileID() {
		return mobileID;
	}

	public void setID(String ID) {
		this.ID = ID;
	}

	public void setCreationDate(String creationDate) {
		this.creationDate = DateFormatting.setToFormattedDate(creationDate);
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public void setFacebookUserId(String facebookUserId) {
		this.facebookUserId = facebookUserId;
	}

	public void setGoogleUserId(String googleUserId) {
		this.googleUserId = googleUserId;
	}

	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = DateFormatting.setToFormattedDate(dateOfBirth);
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public void setAddressId(String addressId) {
		this.addressId = addressId;
	}

	public void setMobileID(String mobileID) {
		this.mobileID = mobileID;
	}

	public Participant( String firstName, String middleName, String lastName, String nickname, String facebookUserId, String googleUserId, LocalDateTime dateOfBirth, String gender, String email, String phone, String addressId, String mobileID) {
		creationDate = LocalDateTime.now();
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.nickname = nickname;
		this.facebookUserId = facebookUserId;
		this.googleUserId = googleUserId;
		this.dateOfBirth = dateOfBirth;
		this.gender = gender;
		this.email = email;
		this.phone = phone;
		this.addressId = addressId;
		this.mobileID = mobileID;
	}

	public Participant(){creationDate = LocalDateTime.now();}
}
