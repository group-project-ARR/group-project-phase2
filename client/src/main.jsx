import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import "./style.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Detail from "./pages/Detail.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";
import MyProduct from "./pages/MyProduct.jsx";
import Chat from "./pages/Chat.jsx";
import EditPage from "./pages/EditPage.jsx";

const auth = () => {
  const access_token = localStorage.access_token;
  if (!access_token) {
    throw redirect("/login");
  }
  return null;
};

const authLogin = () => {
  const access_token = localStorage.access_token;
  if (access_token) {
    throw redirect("/");
  }
  return null;
};

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: auth,
      },
      {
        path: "/detail/:id",
        element: <Detail />,
        loader: auth,
      },
      {
        path: "/create",
        element: <CreateProduct />,
        loader: auth,
      },
      {
        path: "/myposts",
        element: <MyProduct />,
        loader: auth,
      },
      {
        path: "/myposts/:id",
        element: <EditPage />,
        loader: auth,
      },
    ],
  },
  {
    path: "/chats",
    element: <Chat />,
    loader: auth,
  },
  {
    path: "/login",
    element: <Login />,
    loader: authLogin,
  },
  {
    path: "/register",
    element: <Register />,
    loader: authLogin,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
