import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.tsx";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Home from "./screens/Home.tsx";
import Login from "./screens/Login.tsx";
import Register from "./screens/Register.tsx";
import Profile from "./screens/Profile.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route index={true} path="/login" element={<Login />} />
      <Route index={true} path="/register" element={<Register />} />
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
