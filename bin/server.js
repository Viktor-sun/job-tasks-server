const app = require("../src/app");
const db = require("../src/model/db");
require("dotenv").config();

const PORT = process.env.PORT || 9999;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}).catch((e) => {
  console.log(`Error: ${e.message}`);
});
