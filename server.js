const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose
  .connect(process.env.MONGODB_URI||DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch(() => console.log("DB connection unsuccessful"));

const port = process.env.PORT || 2020;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
