import React from "react";
import ReactDom from "react-dom";
import App from "./App.js";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

ReactDom.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
