import * as React from "react";
import { useState, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { auth } from "../../firebase/Firebase";
import { useNavigate } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import "./nav.css";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { fireStore } from "../../firebase/Firebase";

const Navbar = ({
  setsettingsActive,
  profileImageUrl,
  getUserDataFromSrch,
}) => {
  const [usersData, setusersData] = React.useState([]);
  const [dataSet, setdataSet] = React.useState(false);
  const [suggestionData, setsuggestionData] = useState([]);
  const [inputValue, setinputValue] = useState("");

  fireStore.collection("usersData").onSnapshot((snap) => {
    const dataArr = [];
    snap.docChanges().forEach((change) => {
      if (change.type === "added") {
        dataArr.push(change.doc.data());
      }
    });
    if (!dataSet) {
      setusersData(dataArr);
      console.log(dataArr);
      setdataSet(true);
    }
  });
  const filterSuggestion = (e) => {
    const searchWord = e.target.value;
    console.log(searchWord);
    setinputValue(searchWord);
    // const myArr = usersData.map((obj) => obj.name);
    const filteredData = usersData.filter((obj) => {
      const lowerCaseName = obj.name.toLowerCase();
      if (searchWord) {
        return lowerCaseName.indexOf(searchWord.toLowerCase()) !== -1;
      } else {
        return lowerCaseName == "xyz";
      }
    });
    const arrLenth = filteredData.length;
    arrLenth > 5 ? (filteredData.length = 6) : (filteredData.length = arrLenth);
    setsuggestionData(filteredData);
    console.log(filteredData);
  };
  const getAccountInfo = (e) => {
    console.log(e.target.id);
  };
  const suggestionList = suggestionData.map((obj) => {
    return (
      <div
        className="suggestion"
        id={obj.accountId}
        onClick={getUserDataFromSrch}
      >
        {/* <div className="profileIcon">
          <img
            src={
              obj.profileImageUrl
                ? obj.profileImageUrl
                : "https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg"
            }
            alt="profileicon"
          />
        </div> */}
        <Avatar src={obj.profileImageUrl} />
        <div className="suggestionName">{obj.name}</div>
      </div>
    );
  });

  const navigate = useNavigate();
  const settings = [
    {
      name: "Profile",
      onclick: () => {
        setsettingsActive(true);
        handleCloseUserMenu();
      },
    },
    { name: "Dashboard" },
    {
      name: "Logout",
      onclick: () => {
        console.log("logout");
        auth.signOut();
        navigate("/login");
      },
    },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <div className="srch">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{
                    "aria-label": "search",
                    value: inputValue,
                    onChange: filterSuggestion,
                    autoFocus: "ture",
                  }}
                />
              </Search>
              {/* <div className="suggestions">
                {suggestionData.length
                  ? suggestionData.map((obj) => {
                    return (
                      <div
                        key={obj.name}
                        id={obj.accountId}
                        className="suggestion"
                        onClick={getUserDataFromSrch}
                      >
                        {obj.name}
                      </div>
                    );
                  })
                  : ""}
              </div> */}
              <div className="suggestions">{suggestionList}</div>
            </div>
            Freinds App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            APP
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={profileImageUrl} alt="Remy Sharp" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={(handleCloseNavMenu, setting.onclick)}
                >
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
