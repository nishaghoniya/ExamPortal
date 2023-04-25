import {
  AppBar,
  Avatar,
  Box,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Header from "./Header";
import Question from "./Question";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./redux/dataSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.exam[0]);

  React.useEffect(() => {
    // if (data)
    axios.get("http://localhost:5000/api/getAll").then((response) => {
      dispatch(getData(response.data));
    });
  }, []);

  return (
    <>
      <Header />
      {data ? (
        <Grid
          container
          component="main"
          sx={{ marginTop: 5, overflow: "hidden" }}
        >
          <Grid item xs={12} sm={4} md={4} sx={{ overflow: "hidden" }}>
            <Box
              sx={{
                my: 6,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                height: "85vh",
                overflowY: "auto",
              }}
            >
              {data?.questions?.map((item, index) => {
                return (
                  <div onClick={() => navigate(`/question/${index}`)}>
                    <Box
                      sx={{
                        display: "flex",
                        my: 2,
                        justifyItems: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          mx: 1,
                        }}
                      >
                        {item.index}
                      </Avatar>
                      <Typography variant="body1">{item.question}</Typography>
                    </Box>
                  </div>
                );
              })}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            component={Paper}
            elevation={6}
            square
            sx={{ overflow: "hidden" }}
          >
            <Question />
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};

export default Home;
