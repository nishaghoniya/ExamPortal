import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "./redux/dataSlice";
import { useParams } from "react-router-dom";

const Options = ({ question }) => {
  let { id = 0 } = useParams();
  const [value, setValue] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.answer) || [];

  const handleChangeCheckBox = (event) => {
    if (question?.answerSelectionType === "multiple") {
      if (value.includes(event.target.value)) {
        const index = value.indexOf(event.target.value);
        let newArray = [...value];
        if (index > -1) {
          newArray.splice(index, 1);
        }
        setValue(newArray);
      } else {
        setValue([...value, event.target.value]);
      }
    } else {
      setValue([event.target.value]);
    }
  };

  useEffect(() => {
    let objIndex = data.findIndex((obj) => obj?.id === id);
    if (objIndex > -1) setValue(data[objIndex].value);
  }, []);
  console.log(value);
  const setAnswerRedux = () => {
    let newData = [...data];
    let objIndex = newData.findIndex((obj) => obj.id === id);
    if (objIndex > -1) newData[objIndex].value = value;
    else newData[id] = { id: id, value: value };
    dispatch(setAnswer(newData));
  };

  return (
    <Box
      sx={{
        my: 1,
        mx: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        height: "70%",
      }}
    >
      {question?.answerSelectionType !== "multiple" ? (
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={handleChangeCheckBox}
        >
          {question?.answers?.map((item, index) => {
            return (
              <FormControlLabel
                value={index + 1}
                control={<Radio />}
                label={item}
                key={item}
                checked={value.includes(index + 1)}
              />
            );
          })}
        </RadioGroup>
      ) : (
        <FormGroup>
          {question?.answers?.map((item, index) => {
            return (
              <FormControlLabel
                control={<Checkbox />}
                label={item}
                key={item}
                value={index + 1}
                checked={value.includes(index + 1)}
                onChange={handleChangeCheckBox}
              />
            );
          })}
        </FormGroup>
      )}
    </Box>
  );
};
export default Options;
