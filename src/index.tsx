import React from 'react';
import ReactDOM from "react-dom";
import Sidebar from './Sidebar';
import reportWebVitals from "./reportWebVitals";

import { ChakraProvider, theme } from "@chakra-ui/react";


ReactDOM.render(
  <React.StrictMode>

    <ChakraProvider theme={theme}>
      <Sidebar />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
