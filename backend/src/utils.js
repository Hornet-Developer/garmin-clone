import { AuthenticationError } from "apollo-server-core";
import jwt from "jsonwebtoken";

export const APP_SECRET = "s3cr3t"
export const expiresIn = () => Date.now() + 24 * 24 * 60 * 60 * 1000;

export const getTokenPayload = (token) => {
  try {
    const { sub, exp, iat } = jwt.verify(token, APP_SECRET);
    return {
      sub,
      exp,
      iat,
    };
  } catch (error) {
    return {
      statusCode: 403,
      errorMessage: "Forbidden access",
    };
  }
};

export const generatePayload = (sub) => ({
  sub,
  iat: Date.now(),
  exp: expiresIn(),
});

export const signToken = (sub) => jwt.sign(generatePayload(sub), APP_SECRET);

export async function getUserId(ctx) {
  const authHeader = ctx.connectionParams?.Authorization;
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  if (!token) return null;
  const payload = getTokenPayload(token);
  if (payload?.statusCode === 403) return null;

  if (payload.exp - Date.now() <= 0) return null;

  return payload.sub;
}

export const getUserAuth = (req, authToken) => {
  if (req) {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader.length === 0){
      return {
        userId: null,
        token: null,
        expiresIn: undefined,
      };}
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token)
        return {
          userId: null,
          token: null,
          expiresIn: undefined,
        };
      const payload = getTokenPayload(token);
      if (payload?.statusCode === 403)
        throw new ForbiddenError(payload.errorMessage);
      const { sub, exp } = payload;

      if (exp - Date.now() <= 0)
        return {
          userId: null,
          token: null,
          expiresIn: undefined,
        };

      return {
        userId: sub,
        expiresIn: exp,
        token,
      };
    }
  } else if (authToken) {
    const payload = getTokenPayload(authToken);
    if (payload?.statusCode === 403)
      throw new ForbiddenError(payload.errorMessage);
    const { sub, exp } = payload;

    if (exp - Date.now() <= 0)
      return {
        userId: null,
        token: null,
        expiresIn: undefined,
      };

    return {
      userId: sub,
      expiresIn: exp,
      token,
    };
  }

  return {
    userId: null,
  };
};

// export async function getDynamicContext(userQuery, ctx) {
//   const authHeader = ctx.connectionParams.Authorization;
//   if (!authHeader) return null;
//   const token = authHeader.replace("Bearer ", "");
//   if (!token) {
//     throw new AuthenticationError("No token found");
//   }
//   const { userId, userRole } = await getUserId(userQuery, undefined, token);
//   return { userId, userRole };
// }

export const updateCartItems = ({ id, item, cartQueryUpdate }) =>
  cartQueryUpdate({
    where: { id },
    data: {
      cartItems: {
        create: [item],
      },
    },
  });

export const cartItem = (item) => {
  const createdItem = {
    product: { connect: { id: item.productId } },
  };
  if (item.modelId) createdItem.model = { connect: { id: item.modelId } };
  if (item.features) {
    createdItem.features = { create: [...item.features] };
  }
  return createdItem;
};
