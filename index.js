import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.js";
import restaurantRoutes from "./routes/restaurant.js";
import dotenv from "dotenv";
// import { restaurant3 } from "./controllers/restaurant.js";
dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/user", userRoutes);
app.use("/restaurant", restaurantRoutes);

app.get("/", (req, res) => {
  res.send("Working fine");
});

const PORT = process.env.PORT || 8000;
// restaurant3();

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(
      PORT,
      console.log(`server is up and database is connected on PORT: ${PORT}`)
    );
  })
  .catch((error) => {
    console.log(error.message);
  });

mongoose.set("useFindAndModify", false);
