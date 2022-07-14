import { AuthenticationError } from "apollo-server-core";
import jwt from "jsonwebtoken";

export const APP_SECRET = "App-secret";

function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
}

export async function getUserId(userQuery, req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new AuthenticationError("No token found");
      }
      const { userId } = getTokenPayload(token);
      const { role: userRole } = await userQuery.findUnique({
        where: { id: userId },
      });
      return { userId, userRole };
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    const user = await userQuery.findUnique({
      where: { id: userId },
    });
    return { userId, userRole: user.role };
  }

  throw new AuthenticationError("Not authenticated");
}

export async function getDynamicContext(userQuery, ctx) {
  const authHeader = ctx.connectionParams.Authorization;
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    throw new AuthenticationError("No token found");
  }
  const { userId, userRole } = await getUserId(userQuery, undefined, token);
  return { userId, userRole };
}
