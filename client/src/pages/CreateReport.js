import { Typography } from "@mui/material";
import ReportForm from "../components/ReportForm";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useState } from "react";
import axiosInstance from "../utils/axios";

const CreateReport = () => {
  const navigate = useNavigate();
  const [socket] = useState(() => io(":8000"));
  const submitHandler = (report, setErrors) => {
    axiosInstance
      .post("api/reports", report)
      .then((response) => {
        console.log(response);
        socket.emit("new_report_added", response.data);

        socket.disconnect();
        navigate("/reports");
      })
      .catch((err) => {
        // console.log("error response data errors", err.response.data.errors);
        setErrors(err.response.data.error.errors);
      });
  };
  return (
    <div>
      <Typography variant="h4" component="div" gutterBottom>
        Criminal Report
      </Typography>
      <Typography variant="h6" component="div" gutterBottom>
        Please Fill out the Form Below to Report a Crime!
      </Typography>
      <ReportForm submitHandler={submitHandler} buttonText="Submit Report" />
    </div>
  );
};

export default CreateReport;
