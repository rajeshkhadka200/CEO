import React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import "../styles/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const toggleDrawer = (open) => () => {
    toggleSidebar(open); // Use the passed function to toggle sidebar state
  };

  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          className="sidebar"
          sx={{ width: 400 }}
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          Sidebar Content
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default Sidebar;
