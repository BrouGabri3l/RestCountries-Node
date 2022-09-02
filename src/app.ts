import express from "express";
import { NextFunction } from "express";
import * as dotenv from "dotenv";
import routes from "./routes/index";
import path from "path";
import { errorMiddleware } from "./exceptions/ErrorMiddleware";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.get(
  "/",
  (req: express.Request, res: express.Response, next: NextFunction) => {
    return res
      .status(200)
      .json({ message: "Hello to rest countries to Excel" });
  }
);
app.use("/api", routes);
app.use(errorMiddleware);
app.listen(PORT || 3000, () => {
  console.log(`Listen on port ${process.env.PORT}`);
});
