// Copyright 2012-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Apache License, Version 2.0.

package com.amazonaws.codesamples.gsg;

public class MoviesCreateTable {

    public static void main1(String[] args) throws Exception {

        try {
            /*
            AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard()
                    .withRegion(Regions.US_EAST_1)
                    .build();

            DynamoDB dynamoDB = new DynamoDB(client);

            String tableName = "ProductCatalog";

            Table table = dynamoDB.getTable(tableName);

            GetItemSpec spec = new GetItemSpec()
                    .withPrimaryKey("Id", 123)
                    .withConsistentRead(true);

            Item item = table.getItem(spec);

            System.out.println(item.toJSONPretty());



            List<AttributeDefinition> attributeDefinitions = new ArrayList<AttributeDefinition>();
            attributeDefinitions.add(new AttributeDefinition().withAttributeName("Id").withAttributeType("N"));

            List<KeySchemaElement> keySchema = new ArrayList<KeySchemaElement>();
            keySchema.add(new KeySchemaElement().withAttributeName("Id").withKeyType(KeyType.HASH));

            CreateTableRequest request = new CreateTableRequest()
                    .withTableName(tableName)
                    .withKeySchema(keySchema)
                    .withAttributeDefinitions(attributeDefinitions)
                    .withProvisionedThroughput(new ProvisionedThroughput()
                            .withReadCapacityUnits(5L)
                            .withWriteCapacityUnits(6L));

            Table table = dynamoDB.createTable(request);

            table.waitForActive();


// Build a list of related items
            List<Number> relatedItems = new ArrayList<Number>();
            relatedItems.add(341);
            relatedItems.add(472);
            relatedItems.add(649);

//Build a map of product pictures
            Map<String, String> pictures = new HashMap<String, String>();
            pictures.put("FrontView", "http://example.com/products/123_front.jpg");
            pictures.put("RearView", "http://example.com/products/123_rear.jpg");
            pictures.put("SideView", "http://example.com/products/123_left_side.jpg");

//Build a map of product reviews
            Map<String, List<String>> reviews = new HashMap<String, List<String>>();

            List<String> fiveStarReviews = new ArrayList<String>();
            fiveStarReviews.add("Excellent! Can't recommend it highly enough!  Buy it!");
            fiveStarReviews.add("Do yourself a favor and buy this");
            reviews.put("FiveStar", fiveStarReviews);

            List<String> oneStarReviews = new ArrayList<String>();
            oneStarReviews.add("Terrible product!  Do not buy this.");
            reviews.put("OneStar", oneStarReviews);

// Build the item
            Item item = new Item()
                    .withPrimaryKey("Id", 123)
                    .withString("Title", "Bicycle 123")
                    .withString("Description", "123 description")
                    .withString("BicycleType", "Hybrid")
                    .withString("Brand", "Brand-Company C")
                    .withNumber("Price", 500)
                    .withStringSet("Color", new HashSet<String>(Arrays.asList("Red", "Black")))
                    .withString("ProductCategory", "Bicycle")
                    .withBoolean("InStock", true)
                    .withNull("QuantityOnHand")
                    .withList("RelatedItems", relatedItems)
                    .withMap("Pictures", pictures)
                    .withMap("Reviews", reviews);

// Write the item to the table
            PutItemOutcome outcome = table.putItem(item);






             */
        }

        catch (Exception e) {
            System.err.println("Unable to create table: ");
            System.err.println(e.getMessage());
        }

    }
}
