import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Timer from "./Timer";

const Header = (props) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {props.user.name}
        </Typography>
        <Timer {...props} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
