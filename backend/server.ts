import cookieParser from "cookie-parser";
import e from "express";
import { config } from "./config/config";
import { connectToDb } from "./db/config/db";
import { errorHandler, notFound } from "./middlewares/error.middleware";
import { logMiddleware } from "./middlewares/log.middleware";
import userRoutes from "./routes/user.route";

const app = e();

app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logMiddleware);

app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectToDb();
    app.listen(config.PORT, () => {
      console.log(`Server is runing on port: ${config.PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${(error as Error).message}`);
  }
};

startServer();
