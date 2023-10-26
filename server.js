const express = require("express");
const app = express();

// initiate db connection.
const { sequelize } = require("./models/connection");

sequelize
   .sync()
   .then(() => {
      console.log("DB connected and synced successfully.");
   })
   .catch((e) => {
      console.log("Error: ", e);
   });

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
   console.log("API running...");
});

// define routes.
app.use("/userauth", require("./routes/userauth"));

// run server.
const PORT = 5000;
app.listen(PORT, () => {
   console.log(`Server started at port: ${PORT}`);
});
