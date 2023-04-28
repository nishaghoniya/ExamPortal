import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Backdrop, Button, CircularProgress, Typography } from "@mui/material";
import { clearData } from "../redux/dataSlice";
import { toast } from "react-toastify";

const ThankYou = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user) || {};
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    if (user._id && result === "") getResult();
  }, [user._id]);

  const getResult = () => {
    axios
      .get(`http://localhost:5000/api/result/${user._id}`)
      .then((response) => {
        if (response.data) {
          setResult(response.data.score);
          setLoading(false);
          dispatch(clearData());
        } else {
          toast.error("Something wrong! please retry");
          setRetry(true);
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setRetry(true);
      });
  };

  window.addEventListener("popstate", function (event) {
    navigate("/");
  });

  return (
    <>
      {result !== "" ? (
        <div className="loading">
          <Typography variant="h1" component="h2" color={"white"}>
            Your Score is : {result}
          </Typography>
        </div>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          {retry ? (
            <Button onClick={() => getResult()} autoFocus variant="contained">
              Retry
            </Button>
          ) : (
            <CircularProgress color="inherit" />
          )}
        </Backdrop>
      )}
    </>
  );
};

export default ThankYou;
