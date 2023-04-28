import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Options from "./Options";
import { useSelector } from "react-redux";

const Question = ({ setSubmit }) => {
  let { id = 0 } = useParams();
  const navigate = useNavigate();
  const data = useSelector((state) => state.exam[0]);
  let question = data?.questions.find((item, index) => index == id);

  const handlePrevious = () => {
    navigate(`/question/${parseInt(id) - 1}`);
  };

  const handleNext = () => {
    navigate(`/question/${parseInt(id) + 1}`);
  };
  return (
    <>
      <Box
        sx={{
          marginTop: 6,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {parseInt(id) + 1 + ". " + question.question}
        </Typography>
      </Box>
      <Options question={question} idindex={id.toString()} />
      <Box
        sx={{
          mx: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {id !== "0" && (
          <Button variant="contained" onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {data.questions.length - 1 !== parseInt(id) && (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
        {data.questions.length - 1 === parseInt(id) && (
          <Button variant="contained" onClick={() => setSubmit(true)}>
            Submit
          </Button>
        )}
      </Box>
    </>
  );
};

export default Question;
