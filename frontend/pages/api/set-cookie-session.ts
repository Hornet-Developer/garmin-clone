import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(req.body.name, req.body.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: req.body.expiresIn ? new Date(parseInt(req.body.expiresIn)) : undefined,
      sameSite: "lax",
      path: "/",
    })
  );
  res.status(200).json({ success: true });
};