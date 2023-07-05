const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./database/index");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
//config
const port = process.env.PORT || 4002;
//router import
const userRouter = require("./router/userRouter");
const cartRouter = require("./router/cartRouter");
const bookRouter = require("./router/bookRouter");
const favBooksRouter = require("./router/favBooksRouter");

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

//routes
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/book", bookRouter);
app.use("/fav", favBooksRouter);

//app start
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

