import express from "express";

export const errorMiddleware = (
  error: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(`error ${error.message}`);
  const status = error.status || 400;
  res.status(status).json({ message: error.message });
};
