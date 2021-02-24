import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Item: {
            deviceId: uuid.v4(),
            userId: "1234",
            department: data.department,
            quaranteeStartAt: data.quaranteeStartAt,
            quaranteeFinishAt: data.quaranteeFinishAt,
            deviceName: data.deviceName,
            serialNumber: data.serialNumber,
            category: data.category,
            ulNumber: data.ulNumber,
            createdAt: Date.now(),
        }
    };

    await dynamoDb.put(params);

    return params.Item;
});