import React from "react";
import Timer from "./Timer";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  const hoursMinSecs = { hours: 1, minutes: 20, seconds: 40 };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Exam
        </Typography>
        <Timer hoursMinSecs={hoursMinSecs} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
