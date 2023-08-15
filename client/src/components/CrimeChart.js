import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Typography } from "@mui/material";

const DataKeyToGraphTitleMap = {
  aggravated_assault: "Aggravated Assault",
  arson: "Arson",
  burglary: "Burglary",
  homicide: "Homicide",
  larceny: "Larceny",
  motor_vehicle_theft: "Motor Vehicle Theft",
  property_crime: "Property Crime",
  rape_revised: "Rape",
  robbery: "Robbery",
  violent_crime: "Violent Crime",
};

const LocationKeyToGraphTooltipMap = {
  national: "United States",
  "states/AL": "Alabama",
  "states/AK": "Alaska",
  "states/AZ": "Arizona",
  "states/AR": "Arkansas",
  "states/CA": "California",
  "states/CO": "Colorado",
  "states/CT": "Connecticut",
  "states/DE": "Delaware",
  "states/DC": "District",
  "states/FL": "Florida",
  "states/GA": "Georgia",
  "states/HI": "Hawaii",
  "states/ID": "Idaho",
  "states/IL": "Illinois",
  "states/IN": "Indiana",
  "states/IA": "Iowa",
  "states/KS": "Kansas",
  "states/KY": "Kentucky",
  "states/LA": "Louisiana",
  "states/ME": "Maine",
  "states/MD": "Maryland",
  "states/MA": "Massachusetts",
  "states/MI": "Michigan",
  "states/MN": "Minnesota",
  "states/MS": "Mississippi",
  "states/MO": "Missouri",
  "states/MT": "Montana",
  "states/NE": "Nebraska",
  "states/NV": "Nevada",
  "states/NH": "New",
  "states/NJ": "New",
  "states/NM": "New",
  "states/NY": "New",
  "states/NC": "North",
  "states/ND": "North",
  "states/OH": "Ohio",
  "states/OK": "Oklahoma",
  "states/OR": "Oregon",
  "states/PA": "Pennsylvania",
  "states/RI": "Rhode",
  "states/SC": "South",
  "states/SD": "South",
  "states/TN": "Tennessee",
  "states/TX": "Texas",
  "states/UT": "Utah",
  "states/VT": "Vermont",
  "states/VA": "Virginia",
  "states/WA": "Washington",
  "states/WV": "West",
  "states/WI": "Wisconsin",
  "states/WY": "Wyoming",
  "states/AS": "American",
  "states/GM": "Guam",
  "states/MP": "Marina",
  "states/PR": "Puerto",
  "states/VI": "US Virgin Islands",
};

const CrimeChart = ({
  crimeGraphData,
  crimeType,
  yearFrom,
  yearTo,
  location,
}) => {
  const [modifiedGraphData, setModifiedGraphData] = useState([]);

  const chartOptions = {
    chart: {
      type: "line",
      height: 500,
      backgroundColor:"#F9F9F9",
      shadow:true
    },
    title: {
      text: DataKeyToGraphTitleMap[`${crimeType}`],
    },
    subtitle: {
      text: `Rate of Offence by Population`,
    },
    xAxis: {
      categories: crimeGraphData.map((data) => data.year),
      accessibility: {
        description: "Months of the year",
      },
    },
    yAxis: {
      title: {
        text: "Rate per 100,000 people",
      },
      labels: {
        formatter: function () {
          return this.value + "";
        },
      },
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      formatter: function () {
        return `${this.x}</br>${LocationKeyToGraphTooltipMap[`${location}`]}: ${
          this.y
        }`;
      },
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: "#666666",
          lineWidth: 1,
        },
      },
      series: {
        color: "#facf55",
        marker: {
          fillColor: "#CF093F",
        },
      },
    },
    series: [
      {
        name: DataKeyToGraphTitleMap[`${crimeType}`],
        marker: {
          symbol: "square",
          fillColor: "#1976d2",
        },
        data: modifiedGraphData.map((data) => {
          const populationFactor = data.population / 100000;
          return parseFloat(
            (data[`${crimeType}`] / populationFactor).toFixed(1)
          );
        }),
      },
      {
        showInLegend: crimeType === "rape_revised",
        name: DataKeyToGraphTitleMap[`${crimeType}`],
        marker: {
          symbol: "circle",
        },
        data:
          crimeType === "rape_revised"
            ? modifiedGraphData.map((data) => {
                const populationFactor = data.population / 100000;
                return parseFloat(
                  (data.rape_legacy / populationFactor).toFixed(1)
                );
              })
            : [],
      },
    ],
  };

  useEffect(() => {
    // Sort Crime Data By Year
    setModifiedGraphData(
      crimeGraphData.sort((item1, item2) => item1.year - item2.year)
    );
  }, [crimeGraphData]);

  return (
    <div>
      <Typography gutterBottom variant="h5" component="div">
        Trend of {DataKeyToGraphTitleMap[`${crimeType}`]} from {yearFrom} to{" "}
        {yearTo}
      </Typography>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default CrimeChart;
