const express = require("express");
const morgan = require("morgan");

const router = require("./routes");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use(router);

app.listen(PORT, () => {
  console.log(`Server jalan di port : ${PORT}`);
});
