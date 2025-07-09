import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [anchorElStudent, setAnchorElStudent] = useState(null);
  const [anchorElRegister, setAnchorElRegister] = useState(null);

  const handleStudentOpen = (event) => setAnchorElStudent(event.currentTarget);
  const handleStudentClose = () => setAnchorElStudent(null);

  const handleRegisterOpen = (event) => setAnchorElRegister(event.currentTarget);
  const handleRegisterClose = () => setAnchorElRegister(null);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My School Portal
        </Typography>

        <Button color="inherit" component={Link} to="/home">Home</Button>

        {/* Register Dropdown */}
        <Button color="inherit" onClick={handleRegisterOpen}>
          Register
        </Button>
        <Menu
          anchorEl={anchorElRegister}
          open={Boolean(anchorElRegister)}
          onClose={handleRegisterClose}
        >
          <MenuItem component={Link} to="/register" onClick={handleRegisterClose}>
            New Register
          </MenuItem>
          <MenuItem component={Link} to="/registerlist" onClick={handleRegisterClose}>
            Register List
          </MenuItem>
        </Menu>

        <Button color="inherit" component={Link} to="/sports">Sports</Button>

        {/* Student Details Dropdown */}
        <Button color="inherit" onClick={handleStudentOpen}>
          Student Details
        </Button>
        <Menu
          anchorEl={anchorElStudent}
          open={Boolean(anchorElStudent)}
          onClose={handleStudentClose}
        >
          <MenuItem component={Link} to="/studentbooks" onClick={handleStudentClose}>
            Student Books
          </MenuItem>
          <MenuItem component={Link} to="/studentcourse" onClick={handleStudentClose}>
            Student Course
          </MenuItem>
        </Menu>

        <Button color="inherit" component={Link} to="/logout">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
