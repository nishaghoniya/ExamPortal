import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Options from "./Options";
import { data } from "./data";
import { useSelector } from "react-redux";

const Question = () => {
  let { id = 0 } = useParams();
  const data = useSelector((state) => state.exam[0]);
  let question = data?.questions.find((item, index) => index == id);

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
          {id + ". " + question.question}
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
        {id !== 0 && <Button variant="contained">Previous</Button>}
        {data.questions.length !== id && (
          <Button variant="contained">Next</Button>
        )}
        {data.questions.length - 1 === id && (
          <Button variant="contained">Submit</Button>
        )}
      </Box>
    </>
  );
};

export default Question;
