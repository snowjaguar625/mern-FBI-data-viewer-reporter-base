const Report = require("../models/report.model");
const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.JWT_SECRET;

module.exports = {
  findAllReports: async (req, res) => {
    try {
      jwt.verify(req.token, SECRET);
      const findAllReports = await Report.find({})
        .populate("createdBy", "firstName lastName email")
        .sort("typeOfCrime");
      res.status(201).json(findAllReports);
    } catch (err) {
      res.status(400).json({ message: "error in findAll", error: err });
    }
  },

  createReport: async (req, res) => {
    console.log("req - ", req);
    try {
      const user = jwt.verify(req.token, SECRET);
      const newReport = await Report.create({
        ...req.body,
        createdBy: user._id,
      });
      console.log("newReport - ", newReport);
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.status(201).json(newReport);
    } catch (err) {
      res.status(400).json({ message: "error in create", error: err });
    }
  },

  getReportById: async (req, res) => {
    try {
      jwt.verify(req.token, SECRET);
      console.log("find one id", req.params.id);
      const oneReport = await Report.findOne({ _id: req.params.id });
      console.log("oneReport - ", oneReport);
      res.status(201).json(oneReport);
    } catch (err) {
      res.status(400).json({ message: "error in find one", error: err });
    }
  },

  updateReport: async (req, res) => {
    try {
      jwt.verify(req.token, SECRET);
      const updateOneReportById = await Report.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(201).json(updateOneReportById);
    } catch (err) {
      res.status(400).json({ message: "error in update Game", error: err });
    }
  },

  deleteReport: async (req, res) => {
    try {
      jwt.verify(req.token, SECRET);
      const deleteOneReportById = await Report.deleteOne({
        _id: req.params.id,
      });
      console.log("deleteOneReportById", deleteOneReportById);
      res.status(200).json(deleteOneReportById);
    } catch (err) {
      res.status(400).json({ message: "error in delete report", error: err });
    }
  },

  getFBICrimeData: async (req, res) => {
    try {
      const location = req.query.location;
      const yearFrom = req.query.yearFrom;
      const yearTo = req.query.yearTo;
      const { data } = await axios.get(
        `https://api.usa.gov/crime/fbi/sapi/api/estimates/${location}/${yearFrom}/${yearTo}?API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv`
      );
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: "error in delete report", error: err });
    }
  },
};
