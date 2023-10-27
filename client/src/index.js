import ReactDOM from "react-dom/client";
import React from "react";
import App from './App';
import reportWebVitals from './reportWebVitals';

import "./index.css";
// route
import Person from "./route/Person.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/people/:ownerId",
    element: <Person />,
  },
]);

const client = new ApolloClient({
  uri: "http://localhost:8000/people-cars",
  cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
