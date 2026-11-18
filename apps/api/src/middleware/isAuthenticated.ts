import { Request, Response, NextFunction } from "express";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authenticatedRequest = req as Request & { user?: unknown };

  if (!authenticatedRequest.user) {
    return res.status(401).json({
      message: "Please sign in first",
    });
  }

  next();
};

export default requireAuth;
