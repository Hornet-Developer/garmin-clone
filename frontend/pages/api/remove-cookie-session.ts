import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(req.body.name, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "lax",
      path: "/",
    })
  );
  res.status(200).json({ success: true });
};