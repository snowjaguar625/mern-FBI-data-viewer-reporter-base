import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import jwt_decode from "jwt-decode";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import io from "socket.io-client";

const DisplayAllReports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [socket] = useState(() => io(":8000"));
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    socket.on("connect", () => {
      // console.log("Connected socket id - ", socket.id);
    });

    socket.on("added_report", (data) => {
      setReports([...reports, data]);
    });

    socket.on("updated_report", (data) => {
      // console.log("updated_report", data);
      setReports(
        reports.map((report) => {
          if (report._id === data._id) {
            return data;
          }
          return report;
        })
      );
    });

    socket.on("report_deleted", (deletedReport) => {
      // console.log("deletedReportId - ", deletedReport);
      setReports(reports.filter((report) => report._id !== deletedReport._id));
    });
  }, [reports, socket]);

  useEffect(() => {
    axiosInstance
      .get("api/reports")
      .then(({ data }) => {
        // console.log("Display all reports response - ", data);
        setReports(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (!!accessToken) {
      const user = jwt_decode(accessToken);
      setLoggedInUser(user);
    }
  }, []);

  const editReport = (id) => {
    navigate(`/report/edit/${id}`);
  };

  const deleteReport = (deletedId) => {
    if (window.confirm("Are you sure you want to delete this") === true) {
      console.log("Deleting report");
      axiosInstance
        .delete(`api/reports/${deletedId}`)
        .then((response) => {
          // console.log(response);
          setReports(reports.filter((report) => report._id !== deletedId));
          socket.emit("deleted_report", {
            _id: deletedId,
          });
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <>
      <Typography variant="h4" component="div" gutterBottom>
        List of all Crimes Reported Below
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell className="display-all-headings">
                Type of Crime
              </StyledTableCell>
              <StyledTableCell className="display-all-headings" align="right">
                Incident Date
              </StyledTableCell>
              <StyledTableCell className="display-all-headings" align="right">
                Weapon
              </StyledTableCell>
              <StyledTableCell className="display-all-headings" align="right">
                Actions
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <StyledTableRow className="row-style" key={report._id}>
                <StyledTableCell className="display-all-headings" align="right">
                  <Link
                    className="display-all-links"
                    to={`/report/${report._id}`}
                  >
                    {report.typeOfCrime}
                  </Link>
                </StyledTableCell>
                <StyledTableCell className="display-all-headings" align="right">
                  {new Date(report.date).toISOString().split("T")[0]}
                </StyledTableCell>
                <StyledTableCell
                  className="display-all-headings"
                  component="th"
                  scope="row"
                >
                  {report.weapon}
                </StyledTableCell>
                <StyledTableCell className="display-all-headings" align="right">
                  {report.createdBy._id === loggedInUser._id ? (
                    <>
                      <EditIcon
                        onClick={() => editReport(report._id)}
                        className="edit-button"
                      />
                      <span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                      <DeleteIcon
                        onClick={() => deleteReport(report._id)}
                        className="delete"
                      />
                    </>
                  ) : null}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DisplayAllReports;
