import auth from "../Config/Auth";

export const VerifyToken = async (req: any, res: any, next: any) => {
    const token = req.headers.authorization.split(" ")[1];
  
    try {
      const decodeValue = await auth.verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue;
        return next();
      }
    } catch (e) {
      return res.json({ message: "Internal Error" });
    }
};