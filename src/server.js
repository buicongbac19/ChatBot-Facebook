import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import webRoutes from "./routes/web";

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);

webRoutes(app);

let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
