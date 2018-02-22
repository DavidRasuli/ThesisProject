package DbUtil;

        import com.amazonaws.regions.Regions;
        import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
        import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
        import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;

public final class DataAccess {

    private static volatile DynamoDBMapper instance = null;

    public static DynamoDBMapper getInstance() {
        if (instance == null) {
            synchronized(DataAccess.class) {
                if (instance == null) {
                    AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard()
                            .withRegion(Regions.US_EAST_1)
                            .build();
                    instance = new DynamoDBMapper(client);
                }
            }
        }
        return instance;
    }

}
