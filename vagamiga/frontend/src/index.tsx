// // // If you want to start measuring performance in your app, pass a function
// // // to log results (for example: reportWebVitals(console.log))
// // // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // reportWebVitals();

// import { CssBaseline } from "@mui/material";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";

// const theme = createTheme();

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <App />
//     </ThemeProvider>
//   </React.StrictMode>
// );

import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ReactDOM.createRoot(document.getElementById("root")).render(
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <App />
  </React.StrictMode>
);
