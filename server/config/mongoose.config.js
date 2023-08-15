const mongoose = require("mongoose");
const dbName = 'FBICrimeDataExplorerDatabase';



mongoose
  .connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Successfully connected to ${dbName}`);
  })
  .catch((err) => {
    console.log("There was an error connecting to MongoDB", err);
  });