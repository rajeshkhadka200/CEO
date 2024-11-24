import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import Home from "./pages/index.jsx";

// import "./App.css";

// Define the routes for your app
const paths = [
  {
    path: "/",
    element: <Home />,
  },
];

// Create the browser router instance
const router = createBrowserRouter(paths);

const App = () => {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
};

export default App;
