import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ReportForm from "../components/ReportForm";
import axiosInstance from "../utils/axios";
import { Typography } from "@mui/material";
import io from "socket.io-client";

const UpdateReport = () => {
  const [socket] = useState(() => io(":8000"));
  const [currentReport, setCurrentReport] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) {
      axiosInstance
        .get(`api/reports/${id}`)
        .then(({ data }) => {
          console.log("data from update report-", data);
          setCurrentReport(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setCurrentReport(state);
      console.log("coming from state", state);
    }
  }, [id, state]);

  const submitHandler = (report, setErrors) => {
    axiosInstance
      .put(`api/reports/${id}`, report)
      .then((response) => {
        console.log(response);
        socket.emit("report_updated", response.data);

        socket.disconnect();
        navigate("/reports");
      })
      .catch((err) => {
        // console.log("error response data", err.response.data);
        console.log("error response data errors", err.response.data.errors);
        setErrors(err.response.data.error.errors);
      });
  };
  return currentReport ? (
    <>
      <Typography variant="h4" component="div" gutterBottom>
        Edit - {currentReport.typeOfCrime} Report
      </Typography>
      <ReportForm
        submitHandler={submitHandler}
        currentReport={currentReport}
        buttonText="Edit Report"
      />
    </>
  ) : null;
};

export default UpdateReport;
