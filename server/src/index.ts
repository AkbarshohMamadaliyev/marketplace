import express from "express";
import "dotenv/config";
import { urlencoded } from "body-parser";
import sequelize from "./db/database";
import { initAdmin } from "./helper/init";
import adminRouter from "./routes/admin/admin.routes";
import categoryRouter from "./routes/admin/category.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import path from "path";

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("Server is running and responding!");
});

app.use("/admin/auth", adminRouter);
app.use("/admin/category", categoryRouter);

app.use("/files", express.static(path.join(__dirname, "./public/files")));

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
    await sequelize.sync();
    console.log("Models connected successfully");

    await initAdmin();

    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
