import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReportForm = (props) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleCancel = () => {
    navigate("/reports");
  };

  const [report, setReport] = useState(
    props.currentReport || {
      phoneNumber: "",
      date: "",
      description: "",
      weapon: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      typeOfCrime: "",
    }
  );

  useEffect(() => {
    console.log("test", props.currentReport);
    if (props.currentReport) {
      setReport(props.currentReport);
    }
  }, [props.currentReport]);

  
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("report", report);
    props.submitHandler(report, setErrors);
  };

  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Box
        sx={{
          "& .MuiTextField-root": { marginBottom: "5%", width: "100%" },
          "& .MuiFormControl-root": { marginBottom: "5%", width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <form className="form-container" onSubmit={submitHandler}>
          <div className="report-row">
            <div className="report-column">
              <Typography variant="h6" component="div" gutterBottom>
                Crime Information
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="Phone Number"
                type="number"
                name="phoneNumber"
                value={report.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && <p className ="error-message">{errors.phoneNumber.message}</p>}
              <TextField
                required
                id="date"
                type="date"
                name="date"
                value={
                  report.date &&
                  new Date(report.date).toISOString().split("T")[0]
                }
                onChange={handleChange}
              />
              {errors.date && <p className ="error-message">{errors.date.message}</p>}

              <TextField
                required
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                maxRows={4}
                type="text"
                name="description"
                value={report.description}
                onChange={handleChange}
              />
              {errors.description && <p className ="error-message">{errors.description.message}</p>}
              <TextField
                id="outlined-name"
                label="Weapon (Optional)"
                type="text"
                name="weapon"
                value={report.weapon}
                onChange={handleChange}
              />
            </div>
            <div className="report-column">
              <Typography variant="h6" component="div" gutterBottom>
                Address
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="Street"
                type="text"
                name="street"
                value={report.street}
                onChange={handleChange}
              />
              {errors.street && <p className ="error-message">{errors.street.message}</p>}
              <TextField
                required
                id="outlined-required"
                label="City"
                type="text"
                name="city"
                value={report.city}
                onChange={handleChange}
              />
              {errors.city && <p className ="error-message">{errors.city.message}</p>}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  sx={{ minWidth: 120 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="state"
                  value={report.state}
                  label="Select a Location"
                  onChange={handleChange}
                >
                  <MenuItem value={"United States"}>United States</MenuItem>
                  <MenuItem value={"Alabama"}>Alabama</MenuItem>
                  <MenuItem value={"Alaska"}>Alaska</MenuItem>
                  <MenuItem value={"Arizona"}>Arizona</MenuItem>
                  <MenuItem value={"Arkansas"}>Arkansas</MenuItem>
                  <MenuItem value={"California"}>California</MenuItem>
                  <MenuItem value={"Colorado"}>Colorado</MenuItem>
                  <MenuItem value={"Connecticut"}>Connecticut</MenuItem>
                  <MenuItem value={"Delaware"}>Delaware</MenuItem>
                  <MenuItem value={"District of Columbia"}>
                    District of Columbia
                  </MenuItem>
                  <MenuItem value={"Florida"}>Florida</MenuItem>
                  <MenuItem value={"Georgia"}>Georgia</MenuItem>
                  <MenuItem value={"Hawaii"}>Hawaii</MenuItem>
                  <MenuItem value={"Idaho"}>Idaho</MenuItem>
                  <MenuItem value={"Illinois"}>Illinois</MenuItem>
                  <MenuItem value={"Indiana"}>Indiana</MenuItem>
                  <MenuItem value={"Iowa"}>Iowa</MenuItem>
                  <MenuItem value={"Kansas"}>Kansas</MenuItem>
                  <MenuItem value={"Kentucky"}>Kentucky</MenuItem>
                  <MenuItem value={"Louisiana"}>Louisiana</MenuItem>
                  <MenuItem value={"Maine"}>Maine</MenuItem>
                  <MenuItem value={"Maryland"}>Maryland</MenuItem>
                  <MenuItem value={"Massachusetts"}>Massachusetts</MenuItem>
                  <MenuItem value={"Michigan"}>Michigan</MenuItem>
                  <MenuItem value={"Minnesota"}>Minnesota</MenuItem>
                  <MenuItem value={"Mississippi"}>Mississippi</MenuItem>
                  <MenuItem value={"Missouri"}>Missouri</MenuItem>
                  <MenuItem value={"Montana"}>Montana</MenuItem>
                  <MenuItem value={"Nebraska"}>Nebraska</MenuItem>
                  <MenuItem value={"Nevada"}>Nevada</MenuItem>
                  <MenuItem value={"New Hampshire"}>New Hampshire</MenuItem>
                  <MenuItem value={"New Jersey"}>New Jersey</MenuItem>
                  <MenuItem value={"New Mexico"}>New Mexico</MenuItem>
                  <MenuItem value={"New York"}>New York</MenuItem>
                  <MenuItem value={"North Carolina"}>North Carolina</MenuItem>
                  <MenuItem value={"NNorth DakotaD"}>North Dakota</MenuItem>
                  <MenuItem value={"Ohio"}>Ohio</MenuItem>
                  <MenuItem value={"Oklahoma"}>Oklahoma</MenuItem>
                  <MenuItem value={"Oregon"}>Oregon</MenuItem>
                  <MenuItem value={"Pennsylvania"}>Pennsylvania</MenuItem>
                  <MenuItem value={"Rhode Island"}>Rhode Island</MenuItem>
                  <MenuItem value={"South Carolina"}>South Carolina</MenuItem>
                  <MenuItem value={"South Dakota"}>South Dakota</MenuItem>
                  <MenuItem value={"Tennessee"}>Tennessee</MenuItem>
                  <MenuItem value={"Texas"}>Texas</MenuItem>
                  <MenuItem value={"Utah"}>Utah</MenuItem>
                  <MenuItem value={"Vermont"}>Vermont</MenuItem>
                  <MenuItem value={"Virginia"}>Virginia</MenuItem>
                  <MenuItem value={"Washington"}>Washington</MenuItem>
                  <MenuItem value={"West Virginia"}>West Virginia</MenuItem>
                  <MenuItem value={"Wisconsin"}>Wisconsin</MenuItem>
                  <MenuItem value={"Wyoming"}>Wyoming</MenuItem>
                  <MenuItem value={"American Samoa"}>American Samoa</MenuItem>
                  <MenuItem value={"Guam"}>Guam</MenuItem>
                  <MenuItem value={"Marina Islands"}>Marina Islands</MenuItem>
                  <MenuItem value={"Puerto Rico"}>Puerto Rico</MenuItem>
                  <MenuItem value={"US Virgin Islands"}>
                    US Virgin Islands
                  </MenuItem>
                </Select>
                {errors.state && <p className ="error-message">{errors.state.message}</p>}
              </FormControl>
              <TextField
                required
                id="outlined-required"
                label="Zip code"
                type="number"
                name="zipCode"
                value={report.zipCode}
                onChange={handleChange}
              />
              {errors.zipCode && <p className ="error-message">{errors.zipCode.message}</p>}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Crime</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={report.typeOfCrime}
                  name="typeOfCrime"
                  label="Crime"
                  onChange={handleChange}
                >
                  <MenuItem value={"Violent Crimes"}>Violent Crimes</MenuItem>
                  <MenuItem value={"Homicide"}>Homicide</MenuItem>
                  <MenuItem value={"Rape"}>Rape</MenuItem>
                  <MenuItem value={"Robbery"}>Robbery</MenuItem>
                  <MenuItem value={"Aggregated Assault"}>
                    Aggravated assault
                  </MenuItem>
                  <MenuItem value={"All Property Crimes"}>
                    All property crimes
                  </MenuItem>
                  <MenuItem value={"Arson"}>Arson</MenuItem>
                  <MenuItem value={"Burglary"}>Burglary</MenuItem>
                  <MenuItem value={"Larceny Theft"}>Larceny - theft</MenuItem>
                  <MenuItem value={"Motor Vehicle Theft"}>
                    Motor vehicle theft
                  </MenuItem>
                </Select>
              </FormControl>
              {errors.typeOfCrime && <p className ="error-message">{errors.typeOfCrime.message}</p>}
            </div>
          </div>
          <div className="report-form-button-container">
            <Button
              type="submit"
              variant="contained"
              color="success"
              value={props.buttonText}
            >
              {props.buttonText}
            </Button>
            <Button
              type="submit"
              onClick={handleCancel}
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
};

export default ReportForm;
