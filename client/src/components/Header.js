import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { Avatar, Box, Button, ImageList } from "@mui/material";
import axiosInstance from "../utils/axios";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [navItems, setNavItems] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(undefined);

  useEffect(() => {
    if (window.localStorage.getItem("accessToken")) {
      axiosInstance
        .get("api/user")
        .then((response) => {
          setLoggedInUser(response.data);
        })
        .catch((error) => {
          console.log("error in getting user", error);
        });
    } else {
      setLoggedInUser(undefined);
    }
  }, [location]);

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    let navItems = [];
    console.log("location.pathname - ", location.pathname);
    if (location.pathname === "/") {
      navItems = ["About", "Submit", "Reports"];
    } else if (location.pathname === "/about") {
      navItems = ["Home", "Submit", "Reports"];
    } else if (location.pathname === "/report/new") {
      navItems = ["Home", "About", "Reports"];
    } else if (location.pathname === "/reports") {
      navItems = ["Home", "About", "Submit"];
    } else if (location.pathname.includes("/report/edit/")) {
      navItems = ["Home", "About", "Submit", "Reports"];
    } else if (location.pathname.includes("/report/")) {
      navItems = ["Home", "About", "Submit", "Reports"];
    } else if (location.pathname === "/login") {
      setLoggedInUser(undefined);
      navItems = ["Home", "About", "Submit", "Reports"];
    }
    setNavItems([...navItems, `${!!accessToken ? "Logout" : "Login"}`]);
  }, [location]);

  const handleButtonClick = (e) => {
    console.log(e.target.innerText);
    if (e.target.innerText === "HOME") {
      navigate("/");
    } else if (e.target.innerText === "ABOUT") {
      navigate("/about");
    } else if (e.target.innerText === "SUBMIT") {
      navigate("/report/new");
    } else if (e.target.innerText === "LOGIN") {
      navigate("/login");
    } else if (e.target.innerText === "REGISTER") {
      navigate("/register");
    } else if (e.target.innerText === "LOGOUT") {
      console.log("in here");
      window.localStorage.removeItem("accessToken");
      navigate("/login");
    } else if (e.target.innerText === "REPORTS") {
      navigate("/reports");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="static" style={{ background: "#24336F" }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
              <ImageList>
                <img
                  className="header-image"
                  src="https://cutewallpaper.org/24/fbi-png/fbi-db050-%E2%80%93-12ce0-logos-96b17-download.png"
                  alt="FBI-LOGO"
                />
              </ImageList>
            </Box>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{ color: "#fff" }}
                  onClick={handleButtonClick}
                >
                  {item}
                </Button>
              ))}
            </Box>
            {loggedInUser ? (
              <Box>
                <Avatar sx={{ bgcolor: "#facf55",color:"#111111" }}>
                  {`${loggedInUser.firstName.slice(
                    0,
                    1
                  )}${loggedInUser.lastName.slice(0, 1)}`.toUpperCase()}
                </Avatar>
              </Box>
            ) : null}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
