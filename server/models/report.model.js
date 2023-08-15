const mongoose = require("mongoose");

const CrimeReportSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
      minlength: [10, "Phone number cannot be less than 10 characters"],

    },

    date: {
      type: Date,
      required: [true, "Date is required"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description cannot be less than 10 characters"],
    },

    weapon: {
      type: String,
    },

    street: {
      type: String,
      required: [true, "Street is required"],
      minLength: [3, "Street cannot be less than 3 characters"],
    },

    city: {
      type: String,
      required: [true, "City is required"],
      minLength:[3, "City cannot be less than 3 characters"]
    },

    state: {
      type: String,
      required: [true, "State is required"],
      enum: [
        "United States",
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
        "American Samoa",
        "Guam",
        "Marina Islands",
        "Puerto Rico",
        "US Virgin Islands"
      ],
    },
    zipCode: {
      type: String,
      required: [true, "Zip code is required"],
      minLength: [5, "Zip Code cannot be less than 5 numbers"],
    },

    typeOfCrime: {
      type: String,
      required: [true, "Type of Crime is required"],
      enum: [
        "Violent Crimes",
        "Robbery",
        "Homicide",
        "Rape",
        "Aggregated Assault",
        "All Property Crimes",
        "Arson",
        "Burglary",
        "Larceny Theft",
        "Motor Vehicle Theft",
      ],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", CrimeReportSchema);
module.exports = Report;
