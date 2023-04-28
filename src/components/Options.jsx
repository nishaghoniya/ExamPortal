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
import { setAnswer } from "../redux/dataSlice";
import { useParams } from "react-router-dom";

const Options = ({ question }) => {
  let { id = 0 } = useParams();
  const data = useSelector((state) => state.answer) || [];
  const [value, setValue] = useState([]);
  const dispatch = useDispatch();

  const handleChangeCheckBox = (event) => {
    if (question?.answerSelectionType === "multiple") {
      if (value.includes(event.target.value)) {
        const index = value.indexOf(event.target.value);
        let newArray = [...value];
        if (index > -1) {
          newArray.splice(index, 1);
        }
        setValue(newArray);
        setAnswerRedux(newArray);
      } else {
        setValue([...value, event.target.value]);
        setAnswerRedux([...value, event.target.value]);
      }
    } else {
      setValue([event.target.value]);
      setAnswerRedux([event.target.value]);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      let objIndex = data.findIndex((obj) => obj?.id === id);
      if (objIndex > -1) setValue(data[objIndex].value);
      else setValue([]);
    }
  }, [id]);

  const setAnswerRedux = (dataArray) => {
    if (data.length > 0) {
      var newData = [...data];
      let objIndex = newData.findIndex((obj) => obj.id === id);
      if (objIndex > -1 && dataArray) {
        let xyz = [...data];
        const todoObj = xyz[objIndex];
        const newTodoObj = { ...todoObj, value: dataArray };
        xyz = xyz.filter((object) => {
          return object.id !== id.toString();
        });
        const zbc = [...xyz, newTodoObj];
        dispatch(setAnswer(zbc));
      } else {
        let newData = [...data, { id: id, value: dataArray }];
        dispatch(setAnswer(newData));
      }
    } else {
      let newArray = [{ id: id.toString(), value: dataArray }];
      dispatch(setAnswer(newArray));
    }
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
                checked={value.includes((index + 1).toString()) ? true : false}
              />
            );
          })}
        </RadioGroup>
      ) : (
        <FormGroup>
          {question?.answers?.map((item, index) => {
            return (
              <FormControlLabel
                control={<Checkbox sx={{ my: 2 }} />}
                label={item}
                key={item}
                value={index + 1}
                checked={value.includes((index + 1).toString()) ? true : false}
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
