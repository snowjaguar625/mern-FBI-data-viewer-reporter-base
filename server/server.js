require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bearerToken = require("express-bearer-token");
const bodyParser = require("body-parser");
require("./config/mongoose.config");
const socket = require("socket.io");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(bearerToken());
app.use(bodyParser.json());

require("./routes/user.routes")(app);
require("./routes/report.routes")(app);

const server = app.listen(process.env.PORT, () => {
  console.log(`You are connected to port ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Server Side socket id:" + socket.id);

  socket.on("new_report_added", (data) => {
    console.log("Server- new_report_added");
    socket.broadcast.emit("added_report", data);
  });

  socket.on("report_updated", (data) => {
    console.log("SERVER -  Updated report");
    socket.broadcast.emit("updated_report", data);
  });

  socket.on("deleted_report", (reportId) => {
    console.log("deleted report");
    socket.broadcast.emit("report_deleted", reportId);
  });
});
