import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { config } from "dotenv";

// init routes
import drawRouter from "./routes/drawroutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

// register a route from the routes folder in es6 syntax
app.use("/api", drawRouter);

app.listen(PORT, () => {
  console.log(`Server running at : ${PORT}`);
});
