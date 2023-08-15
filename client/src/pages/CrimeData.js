import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { CardContent } from "@mui/material";

import CrimeChart from "../components/CrimeChart";
import axiosInstance from "../utils/axios";

const CrimeData = () => {
  const [location, setLocation] = React.useState("national");
  const [yearFrom, setYearFrom] = React.useState("2010");
  const [yearTo, setYearTo] = React.useState("2020");
  const [crimeType, setCrimeType] = React.useState("violent_crime");
  const [crimeGraphData, setCrimeGraphData] = React.useState([]);

  const handleYearFromChange = (event) => {
    setYearFrom(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleYearToChange = (event) => {
    setYearTo(event.target.value);
  };

  const handleCrimeChange = (event) => {
    setCrimeType(event.target.value);
  };

  useEffect(() => {
    const url = `/fbi/reports?location=${location}&yearFrom=${yearFrom}&yearTo=${yearTo}`;
    axiosInstance
      .get(url)
      .then(({ data }) => {
        console.log("Data from FBI server - ", data);
        setCrimeGraphData(data.results);
      })
      .catch((err) => {
        console.log("Error while getting data from FBI server - ", err);
      });
  }, [location, yearFrom, yearTo]);

  return (
    <div className="crime-data-container">
      <Typography variant="h4" component="div" gutterBottom>
        Federal Bureau of Investigation Crime Data Explorer (FBICDE)
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        The graph below represents the trends of selected crime for a given
        state from the year 1985-2020
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Location
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={location}
                  label="Location"
                  onChange={handleLocationChange}
                >
                  <MenuItem value={"national"}>United States</MenuItem>
                  <MenuItem value={"states/AL"}>Alabama</MenuItem>
                  <MenuItem value={"states/AK"}>Alaska</MenuItem>
                  <MenuItem value={"states/AZ"}>Arizona</MenuItem>
                  <MenuItem value={"states/AR"}>Arkansas</MenuItem>
                  <MenuItem value={"states/CA"}>California</MenuItem>
                  <MenuItem value={"states/CO"}>Colorado</MenuItem>
                  <MenuItem value={"states/CT"}>Connecticut</MenuItem>
                  <MenuItem value={"states/DE"}>Delaware</MenuItem>
                  <MenuItem value={"states/DC"}>District of Columbia</MenuItem>
                  <MenuItem value={"states/FL"}>Florida</MenuItem>
                  <MenuItem value={"states/GA"}>Georgia</MenuItem>
                  <MenuItem value={"states/HI"}>Hawaii</MenuItem>
                  <MenuItem value={"states/ID"}>Idaho</MenuItem>
                  <MenuItem value={"states/IL"}>Illinois</MenuItem>
                  <MenuItem value={"states/IN?"}>Indiana</MenuItem>
                  <MenuItem value={"states/IA"}>Iowa</MenuItem>
                  <MenuItem value={"states/KS"}>Kansas</MenuItem>
                  <MenuItem value={"states/KY"}>Kentucky</MenuItem>
                  <MenuItem value={"states/LA"}>Louisiana</MenuItem>
                  <MenuItem value={"states/ME"}>Maine</MenuItem>
                  <MenuItem value={"states/MD"}>Maryland</MenuItem>
                  <MenuItem value={"states/MA"}>Massachusetts</MenuItem>
                  <MenuItem value={"states/MI"}>Michigan</MenuItem>
                  <MenuItem value={"states/MN"}>Minnesota</MenuItem>
                  <MenuItem value={"states/MS"}>Mississippi</MenuItem>
                  <MenuItem value={"states/MO"}>Missouri</MenuItem>
                  <MenuItem value={"states/MT"}>Montana</MenuItem>
                  <MenuItem value={"states/NE"}>Nebraska</MenuItem>
                  <MenuItem value={"states/NV"}>Nevada</MenuItem>
                  <MenuItem value={"states/NH"}>New Hampshire</MenuItem>
                  <MenuItem value={"states/NJ"}>New Jersey</MenuItem>
                  <MenuItem value={"states/NM"}>New Mexico</MenuItem>
                  <MenuItem value={"states/NY"}>New York</MenuItem>
                  <MenuItem value={"states/NC"}>North Carolina</MenuItem>
                  <MenuItem value={"states/ND"}>North Dakota</MenuItem>
                  <MenuItem value={"states/OH"}>Ohio</MenuItem>
                  <MenuItem value={"states/OK"}>Oklahoma</MenuItem>
                  <MenuItem value={"states/OR"}>Oregon</MenuItem>
                  <MenuItem value={"states/PA"}>Pennsylvania</MenuItem>
                  <MenuItem value={"states/RI"}>Rhode Island</MenuItem>
                  <MenuItem value={"states/SC"}>South Carolina</MenuItem>
                  <MenuItem value={"states/SD"}>South Dakota</MenuItem>
                  <MenuItem value={"states/TN"}>Tennessee</MenuItem>
                  <MenuItem value={"states/TX"}>Texas</MenuItem>
                  <MenuItem value={"states/UT"}>Utah</MenuItem>
                  <MenuItem value={"states/VT"}>Vermont</MenuItem>
                  <MenuItem value={"states/VA"}>Virginia</MenuItem>
                  <MenuItem value={"states/WA"}>Washington</MenuItem>
                  <MenuItem value={"states/WV"}>West Virginia</MenuItem>
                  <MenuItem value={"states/WI"}>Wisconsin</MenuItem>
                  <MenuItem value={"states/WY"}>Wyoming</MenuItem>
                  <MenuItem value={"states/AS"}>American Samoa</MenuItem>
                  <MenuItem value={"states/GM"}>Guam</MenuItem>
                  <MenuItem value={"states/MP"}>Marina Islands</MenuItem>
                  <MenuItem value={"states/PR"}>Puerto Rico</MenuItem>
                  <MenuItem value={"states/VI"}>US Virgin Islands</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Start Year
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">From</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={yearFrom}
                  label="From"
                  onChange={handleYearFromChange}
                >
                  <MenuItem value={2010}>2010</MenuItem>
                  <MenuItem value={2009}>2009</MenuItem>
                  <MenuItem value={2008}>2008</MenuItem>
                  <MenuItem value={2007}>2007</MenuItem>
                  <MenuItem value={2006}>2006</MenuItem>
                  <MenuItem value={2005}>2005</MenuItem>
                  <MenuItem value={2004}>2004</MenuItem>
                  <MenuItem value={2003}>2003</MenuItem>
                  <MenuItem value={2002}>2002</MenuItem>
                  <MenuItem value={2001}>2001</MenuItem>
                  <MenuItem value={2000}>2000</MenuItem>
                  <MenuItem value={1999}>1999</MenuItem>
                  <MenuItem value={1998}>1998</MenuItem>
                  <MenuItem value={1997}>1997</MenuItem>
                  <MenuItem value={1996}>1996</MenuItem>
                  <MenuItem value={1995}>1995</MenuItem>
                  <MenuItem value={1994}>1994</MenuItem>
                  <MenuItem value={1993}>1993</MenuItem>
                  <MenuItem value={1992}>1992</MenuItem>
                  <MenuItem value={1991}>1991</MenuItem>
                  <MenuItem value={1990}>1990</MenuItem>
                  <MenuItem value={1989}>1989</MenuItem>
                  <MenuItem value={1988}>1988</MenuItem>
                  <MenuItem value={1987}>1987</MenuItem>
                  <MenuItem value={1986}>1986</MenuItem>
                  <MenuItem value={1985}>1985</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                End Year
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">To</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={yearTo}
                  label="To"
                  onChange={handleYearToChange}
                >
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                  <MenuItem value={2018}>2018</MenuItem>
                  <MenuItem value={2017}>2017</MenuItem>
                  <MenuItem value={2016}>2016</MenuItem>
                  <MenuItem value={2015}>2015</MenuItem>
                  <MenuItem value={2014}>2014</MenuItem>
                  <MenuItem value={2013}>2013</MenuItem>
                  <MenuItem value={2012}>2012</MenuItem>
                  <MenuItem value={2011}>2011</MenuItem>
                  <MenuItem value={2010}>2010</MenuItem>
                  <MenuItem value={2009}>2009</MenuItem>
                  <MenuItem value={2008}>2008</MenuItem>
                  <MenuItem value={2007}>2007</MenuItem>
                  <MenuItem value={2006}>2006</MenuItem>
                  <MenuItem value={2005}>2005</MenuItem>
                  <MenuItem value={2004}>2004</MenuItem>
                  <MenuItem value={2003}>2003</MenuItem>
                  <MenuItem value={2002}>2002</MenuItem>
                  <MenuItem value={2001}>2001</MenuItem>
                  <MenuItem value={2000}>2000</MenuItem>
                  <MenuItem value={1999}>1999</MenuItem>
                  <MenuItem value={1998}>1998</MenuItem>
                  <MenuItem value={1997}>1997</MenuItem>
                  <MenuItem value={1996}>1996</MenuItem>
                  <MenuItem value={1995}>1995</MenuItem>
                  <MenuItem value={1994}>1994</MenuItem>
                  <MenuItem value={1993}>1993</MenuItem>
                  <MenuItem value={1992}>1992</MenuItem>
                  <MenuItem value={1991}>1991</MenuItem>
                  <MenuItem value={1990}>1990</MenuItem>
                  <MenuItem value={1989}>1989</MenuItem>
                  <MenuItem value={1988}>1988</MenuItem>
                  <MenuItem value={1987}>1987</MenuItem>
                  <MenuItem value={1986}>1986</MenuItem>
                  <MenuItem value={1985}>1985</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Crime Type
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Crime</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={crimeType}
                  label="Crime"
                  onChange={handleCrimeChange}
                >
                  <MenuItem value={"violent_crime"}>
                    All violent crimes
                  </MenuItem>
                  <MenuItem value={"homicide"}>Homicide</MenuItem>
                  <MenuItem value={"rape_revised"}>Rape</MenuItem>
                  <MenuItem value={"robbery"}>Robbery</MenuItem>
                  <MenuItem value={"aggravated_assault"}>
                    Aggravated assault
                  </MenuItem>
                  <MenuItem value={"property_crime"}>
                    All property crimes
                  </MenuItem>
                  <MenuItem value={"arson"}>Arson</MenuItem>
                  <MenuItem value={"burglary"}>Burglary</MenuItem>
                  <MenuItem value={"larceny"}>Larceny - theft</MenuItem>
                  <MenuItem value={"motor_vehicle_theft"}>
                    Motor vehicle theft
                  </MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
      <CrimeChart
        crimeGraphData={crimeGraphData}
        crimeType={crimeType}
        yearFrom={yearFrom}
        yearTo={yearTo}
        location={location}
      />
    </div>
  );
};

export default CrimeData;
