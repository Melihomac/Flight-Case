import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const port = process.env.PORT || 5001;
import userRotes from "./routes/userRoutes.js";

const app = express();

app.use("/api/users", userRotes);
app.get("/", (req, res) => res.send("Server is ready"));
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
