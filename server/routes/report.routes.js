const ReportController = require("../controllers/report.controller");
const verifyToken = require("../utils/verifyToken");

// this is used in server.js
module.exports = (app) => {
  app.get("/api/reports", verifyToken, ReportController.findAllReports);
  app.get("/api/reports/:id", verifyToken, ReportController.getReportById);
  app.post("/api/reports", verifyToken, ReportController.createReport);
  app.put("/api/reports/:id", verifyToken, ReportController.updateReport);
  app.delete("/api/reports/:id", verifyToken, ReportController.deleteReport);
  app.get("/fbi/reports", ReportController.getFBICrimeData);
};
