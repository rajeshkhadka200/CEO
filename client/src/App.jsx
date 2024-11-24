import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import Ceo from "./pages/Ceo.jsx";
import Home from "./pages/Home.jsx";

const paths = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/ceo",
    element: <Ceo />,
  },
];

const router = createBrowserRouter(paths);

const App = () => {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
};

export default App;
