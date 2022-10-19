import { Callback, Context } from "aws-lambda";
import { AuthService } from "../../core/auth/auth.service";
import { MongoDb } from "../../core/common/db";

export const handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("Auth");

  if (typeof event.authorizationToken === "undefined") {
    if (process.env.DEBUG === "true") {
      console.log("AUTH: No token");
    }
    callback("Unauthorized");
  }

  const split = event.authorizationToken.split("Bearer");
  if (split.length !== 2) {
    if (process.env.DEBUG === "true") {
      console.log("AUTH: no token in Bearer");
    }
    callback("Unauthorized");
  }
  const token = split[1].trim();

  const db = new MongoDb();

  if (!db.isConnected()) {
    await db.getConnection();
  }

  const authService = new AuthService(db);
  const data = authService.verifyToken(token);
  if (!data) {
    callback("Unauthorized");
  }

  callback(null, generatePolicy(data!.id, "Allow", event.methodArn));
};

const generatePolicy = function (
  principalId: string,
  effect: string,
  resource: any
) {
  const authResponse: any = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument: any = {};
    policyDocument.Version = "2012-10-17";
    policyDocument.Statement = [];
    const statementOne: any = {};
    statementOne.Action = "execute-api:Invoke";
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};
