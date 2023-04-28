import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { getData, setTime, setUser } from "../redux/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ParticlesBg from "particles-bg";
import { Card, CardActions, CardContent } from "@mui/material";
import { toast } from "react-toastify";

function Login() {
  const theme = createTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setLogin] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [name, setName] = React.useState("");
  const data = useSelector((state) => state.exam[0]) || {};

  React.useEffect(() => {
    if (!data?.questions?.length) {
      axios.get("http://localhost:5000/api/getAll").then((response) => {
        dispatch(getData(response.data));
        dispatch(setTime(""));
      });
    }
  }, []);

  const handleStart = () => {
    if (name) {
      axios
        .post("http://localhost:5000/api/login", { name: name })
        .then((response) => {
          if (response.status === 200) {
            setLogin(true);
            dispatch(setUser(response.data));
          } else {
            toast.error("Error in login");
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLogin && (
          <div className="loading">
            <Button
              onClick={() => {
                if (data?.questions?.length > 0) navigate("/home");
              }}
              variant="contained"
            >
              Start Exam
            </Button>
          </div>
        )}
        {!isLogin && (
          <>
            <ParticlesBg type="cobweb" bg={true} color="#154360" />
            <Card
              sx={{
                maxWidth: 300,
                margin: "auto",
                marginTop: 20,
              }}
            >
              <CardContent>
                <Avatar
                  sx={{ m: 1, bgcolor: "secondary.main", marginX: "auto" }}
                ></Avatar>
                <Typography component="h1" variant="h5" textAlign={"center"}>
                  Sign in
                </Typography>
                <Box component="form" noValidate>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    error={error && !name ? true : false}
                    label="name"
                    onChange={(event) => setName(event.target.value)}
                    name="name"
                    helperText={error && !name ? "Name Required!" : ""}
                  />

                  <CardActions>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{ mt: 3, mb: 2 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleStart();
                      }}
                    >
                      Login
                    </Button>
                  </CardActions>
                </Box>
              </CardContent>
            </Card>
          </>
        )}
      </ThemeProvider>
    </div>
  );
}

export default Login;
