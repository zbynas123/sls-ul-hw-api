import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      deviceId: event.pathParameters.id,
    },
    UpdateExpression: "SET department = :department, quaranteeStartAt = :quaranteeStartAt, quaranteeFinishAt = :quaranteeFinishAt, deviceName = :deviceName, serialNumber = :serialNumber, category = :category, ulNumber = :ulNumber, userId = :userId",
    ExpressionAttributeValues: {
      ":department": data.department || null,
      ":quaranteeStartAt": data.quaranteeStartAt || null,
      ":quaranteeFinishAt": data.quaranteeFinishAt || null,
      ":deviceName": data.deviceName || null,
      ":serialNumber": data.serialNumber || null,
      ":category": data.category || null,
      ":ulNumber": data.ulNumber || null,
      ":userId": data.userId || null,
    },
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});