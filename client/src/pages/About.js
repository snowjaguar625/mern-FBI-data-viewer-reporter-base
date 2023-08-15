import { Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

const About = () => {
  return (
    <>
      <Card className="about-card">
        <CardContent style={{ padding: "0px" }}>
          <Typography
            className="about-headings"
            gutterBottom
            variant="h4"
            component="div"
          >
            Federal Bureau of Investigation Crime Data Explorer
          </Typography>
          <Typography
            className="about-paragraph"
            variant="body1"
            color="text.primary"
          >
            The Crime Data Explorer website allows law enforcement and the
            general public to have easy access to crime data. The aim is to
            improve accountability for law enforcement; and provide a foundation
            to help shape public policy with the result of a safer nation. This
            website contains multiple years of data as well as other
            information. This is data the FBI collects from law state and local
            law enforcement agencies and is used to compile the Crime in the US
            annual reports since 1960. Please note, there is no personally
            identifiable information about the offenders or victims. Use the
            Crime Data Explorer to discover available data through
            visualizations(graphs).
          </Typography>
          <Typography
            className="about-headings"
            gutterBottom
            variant="h4"
            component="div"
          >
            Online Reporting Service
          </Typography>
          <Typography
            className="about-paragraph"
            variant="body1"
            color="text.primary"
          >
            Using this website allows you to file a criminal report online for
            certain crimes or incidents. To create a report you first have to
            register which will allow you to submit your report online. In
            addition you can view, edit or delete a report if necessary. If you
            need immediate police assistance, please dial 911 or call your local
            precinct. To create an account please click the login link above.
          </Typography>
        </CardContent>
        <br />
      </Card>
    </>
  );
};

export default About;
