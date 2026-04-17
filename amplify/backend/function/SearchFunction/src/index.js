/* eslint-disable @typescript-eslint/no-require-imports */
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS"
  };
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const searchTerm = event.queryStringParameters?.term;
  const tableName = `Employee-${process.env.API_TESTEMPLOYEETASK_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`;

  const limitRaw = Number.parseInt(event.queryStringParameters?.limit ?? "10", 10);
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 50) : 10;

  let exclusiveStartKey;
  const nextKey = event.queryStringParameters?.nextKey;
  if (nextKey) {
    try {
      exclusiveStartKey = JSON.parse(decodeURIComponent(nextKey));
    } catch {
      return {
        statusCode: 400,
        headers: getCorsHeaders(),
        body: JSON.stringify({ message: "Invalid nextKey" })
      };
    }
  }

  if (!tableName) {
    return {
      statusCode: 500,
      headers: getCorsHeaders(),
      body: JSON.stringify({ message: "Table name is not configured" })
    };
  }

  if (!searchTerm) {
    return {
      statusCode: 400,
      headers: getCorsHeaders(),
      body: JSON.stringify({ message: "Search term is required" })
    };
  }

  const params = {
    TableName: tableName,
    Limit: limit,
    ExclusiveStartKey: exclusiveStartKey,
    FilterExpression: "contains(#n, :s)",
    ExpressionAttributeNames: {
      "#n": "name"
    },
    ExpressionAttributeValues: {
      ":s": searchTerm
    }
  };

  try {
    const data = await ddbDocClient.send(new ScanCommand(params));

    return {
      statusCode: 200,
      headers: getCorsHeaders(),
      body: JSON.stringify({
        items: data.Items ?? [],
        nextKey: data.LastEvaluatedKey
          ? encodeURIComponent(JSON.stringify(data.LastEvaluatedKey))
          : null
      })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: getCorsHeaders(),
      body: JSON.stringify({ error: err?.message || "Internal server error" })
    };
  }
};
