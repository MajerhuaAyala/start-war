import {
  APIGatewayProxyCallback,
  APIGatewayProxyEvent,
  Context,
} from "aws-lambda";
import { Server } from "./server";
import sourceMapSupport from "source-map-support";

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: APIGatewayProxyCallback,
): Promise<void> => {
  sourceMapSupport.install();
  context.callbackWaitsForEmptyEventLoop = false;
  const instanceApp: Server = new Server();
  return instanceApp.getApp().run(event, context, callback);
};
