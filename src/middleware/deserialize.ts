import { Request, Response, NextFunction } from "express";
import { User } from "../model/user.model";
import { decode, encode } from "../utils/jwt.utils";
import { decode as decodeJWT } from "jsonwebtoken";


// Case 1 : Access Token not exist
// Case 2 : Access Token valid
// Case 3 : Refresh token not exist
// Case 4 : Refresh token expired
// Case 5 : Inconsistent
export const deserialize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get access token from headers
    let accessToken = req.headers["authorization"];

    if (!accessToken) return next();

    accessToken = accessToken.replace(/^Bearer\s/, "");
    // Decode access token to get the payload and append user object to request
    const { decoded: decoded_access } = decode(accessToken);
    if (decoded_access) {
      // @ts-ignore
      req.user = decoded_access;

      // @ts-ignore
      req.role = await User.getAllRoles((decoded_access as User)["user_id"]);
      return next();
    }

    // The flow continue to below if access token is expired
    const dataCookies = req.cookies;
    if (!("refreshToken" in dataCookies)) {
      return res.status(403).json({
        code: 403,
        status: "Forbidden",
        msg : 'Refresh Token does not exists in cookie'
      });
    }
    
    const refreshToken = dataCookies.refreshToken;

    const { decoded: decoded_refresh } = decode(refreshToken);

    // Check the expired refresh token
    if (!decoded_refresh) {
      return res
      .status(403)
      .json({
        code: 403,
        status: "Forbidden",
        msg: "Refresh Token is expired",
      });
    }

    // Check the consistency between refresh token and access token
    const access_jwt = decodeJWT(accessToken, { complete: true });

    if (
      access_jwt &&
      (access_jwt.payload as User)["user_id"] !==
        (decoded_refresh as User)["user_id"]
    ) {
      return res.status(403).json({
        code: 403,
        status: "Forbidden",
        msg: "Found the inconsistence between access token and refresh token",
      });
    }

    const user = await User.findByUsername(
      (access_jwt?.payload as User).username
    );

    // Create new Access Token
    const newAccessToken = encode(user, { expiresIn: "20s" });

    if (newAccessToken) {
      // Add the new access token to the response header
      res.set('x-access-token', newAccessToken);
      // @ts-ignore
      const { exp } = decodeJWT(newAccessToken);
      res.set("x-access-token-exp", exp)

      const { decoded: decoded_newAccess } = decode(newAccessToken);

      // @ts-ignore
      req.user = decoded_newAccess;

      // @ts-ignore
      req.role = await User.getAllRoles(user.user_id);
    }
    return next();
  } catch (error) {next(error);}
};
