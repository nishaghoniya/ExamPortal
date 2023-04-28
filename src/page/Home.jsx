import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../components/Header";
import Question from "../components/Question";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTime } from "../redux/dataSlice";
import { blue } from "@mui/material/colors";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.exam[0]);
  const answer = useSelector((state) => state.answer) || [];
  const timer = useSelector((state) => state.time) || [];
  const user = useSelector((state) => state.user) || {};
  const [submit, setSubmit] = useState(false);
  const [[hrs, mins, secs], setTimer] = useState([0, 0, 0]);

  window.onbeforeunload = function (event) {
    dispatch(setTime([hrs.toString(), mins.toString(), secs.toString()]));
  };

  React.useEffect(() => {
    if (timer.length > 0) {
      let hours = parseInt(timer[0]);
      let minutes = parseInt(timer[1]);
      let seconds = parseInt(timer[2]);
      setTimer([hours, minutes, seconds]);
    } else if (data?.time) {
      let hours = parseInt(data.time[0]);
      let minutes = parseInt(data.time[1]);
      let seconds = parseInt(data.time[2]);
      setTimer([hours, minutes, seconds]);
    } else setTimer([0, 0, 0]);
  }, []);

  React.useEffect(() => {
    navigate(`/question/${0}`);
  }, [data]);

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/api/submit", {
        answers: answer,
        userId: user._id,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Data submitted successfully!!");
          navigate("/thankyou");
        } else {
          toast.error("Data not submitted!!");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      {data ? (
        <>
          <Header time={[hrs, mins, secs]} setTimer={setTimer} user={user} />
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
                  let answerSelected =
                    answer?.some((test) => test.id === index.toString()) ||
                    false;

                  return (
                    <div
                      onClick={() => navigate(`/question/${index}`)}
                      key={index}
                    >
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
                            width: 30,
                            height: 30,
                            my: 0.5,
                            bgcolor: answerSelected ? blue[700] : "none",
                          }}
                        >
                          <Typography variant="button">{index + 1}</Typography>
                        </Avatar>
                        <Typography variant="body1" marginLeft={1}>
                          {item.question}
                        </Typography>
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
              <Question setSubmit={setSubmit} />
            </Grid>
          </Grid>
        </>
      ) : null}
      {((hrs === 0 && mins === 0 && secs === 0) || submit) && (
        <Dialog
          open={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Exam Time Over!!!!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Submit your anwer
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Home;
