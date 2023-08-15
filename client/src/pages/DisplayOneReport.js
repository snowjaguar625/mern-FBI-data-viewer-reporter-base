import { Box, CardContent, Typography } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";

const DisplayOneReport = () => {
  const [report, setReport] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`api/reports/${id}`)
      .then((response) => {
        // console.log("Data from display one report-", response);
        // console.log("response data from display one report-", response.data);
        setReport(response.data);
      })
      .catch((err) => {
        console.log("Error in display one report-", err);
      });
  }, [id]);
  return (
    <>
      <Box>
        <Typography variant="h4" component="div" gutterBottom>
          Crime - {report.typeOfCrime} Details
        </Typography>
        <div className="display-one-wrapper">
          <Card className = "display-card">
            <div className="display-one-row">
              <div className="display-one-column">
                {" "}
                <React.Fragment>
                  <CardContent className="display-one-container">
                    <Typography
                      className="color-1"
                      sx={{ fontSize: 22 }}
                      color="text.primary"
                      gutterBottom
                    >
                      Street:
                    </Typography>
                    <Typography
                      className="color-1"
                      sx={{ fontSize: 22 }}
                      color="text.primary"
                      gutterBottom
                    >
                      City:
                    </Typography>
                    <Typography
                      className="color-1"
                      sx={{ fontSize: 22 }}
                      color="text.primary"
                      gutterBottom
                    >
                      State:
                    </Typography>
                    <Typography
                      className="color-1"
                      sx={{ fontSize: 22 }}
                      color="text.primary"
                      gutterBottom
                    >
                      ZipCode:
                    </Typography>
                    <Typography
                      className="color-1"
                      sx={{ fontSize: 22 }}
                      color="text.primary"
                      gutterBottom
                    >
                      Incident Date:
                    </Typography>
                    <Typography
                      className="color-1"
                      sx={{ fontSize: 22 }}
                      color="text.primary"
                      gutterBottom
                    >
                      Description:
                    </Typography>
                    <Typography
                      className="color-1"
                      sx={{ fontSize: 22 }}
                      color="text.primary"
                      gutterBottom
                    >
                      Weapon:
                    </Typography>
                    <Typography
                      className="color-1"
                      sx={{ fontSize: 22 }}
                      color="text.primary"
                      gutterBottom
                    >
                      Type of Crime:
                    </Typography>
                  </CardContent>
                </React.Fragment>
              </div>
              <div className="display-one-column">
                <React.Fragment>
                  <CardContent className="display-one-container">
                    <Typography
                      className="color-1"
                      sx={{ fontSize: 22}}
                      color="text.primary"
                      gutterBottom
                    >
                      {report.street}
                    </Typography>
                    <Typography
                      className="color-1"
                      sx={{ fontSize: 22}}
                      color="text.primary"
                      gutterBottom
                    >
                      {report.city}
                    </Typography>
                    <Typography
                      className="color-1"
                      sx={{ fontSize: 22}}
                      color="text.primary"
                      gutterBottom
                    >
                      {report.state}
                    </Typography>
                    <Typography
                      className="color-1"
                      sx={{ fontSize: 22}}
                      color="text.primary"
                      gutterBottom
                    >
                      {report.zipCode}
                    </Typography>
                    <Typography
                      className="color-1"
                      sx={{ fontSize: 22}}
                      color="text.primary"
                      gutterBottom
                    >
                      {report.date &&
                        new Date(report.date).toISOString().split("T")[0]}
                    </Typography>
                    <Typography
                      className="color-1"
                      sx={{ fontSize: 22}}
                      color="text.primary"
                      gutterBottom
                    >
                      {report.description}
                    </Typography>
                    <Typography
                      className="color-1"
                      sx={{ fontSize: 22}}
                      color="text.primary"
                      gutterBottom
                    >
                      {report.weapon}
                    </Typography>
                    <Typography
                      className="color-1"
                      sx={{ fontSize: 22}}
                      color="text.primary"
                      gutterBottom
                    >
                      {report.typeOfCrime}
                    </Typography>
                  </CardContent>
                </React.Fragment>
              </div>
            </div>
          </Card>
        </div>
      </Box>
    </>
  );
};

export default DisplayOneReport;
