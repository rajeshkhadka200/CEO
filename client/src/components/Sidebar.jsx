import React, { useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Markdown from "react-markdown";
import Skeleton from "@mui/material/Skeleton";

import "../styles/sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar, image, isloadingRes, output }) => {
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
          sx={{ width: 700 }}
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {/* Image Section */}
          <div className="img_con">
            <img src={image} alt="image_canvas" />
          </div>

          {/* Question Section */}
          <div
            style={{
              padding: "15px",
            }}
          >
            {isloadingRes ? (
              <>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: "100%",
                    height: 50,
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  }}
                />
                <br />
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: "80%",
                    height: 50,
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  }}
                />
                <br />
                <Skeleton
                  variant="rectangular"
                  sx={{
                    height: 50,
                    width: "50%",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  }}
                />
                <br />
                <Skeleton
                  variant="rectangular"
                  sx={{
                    height: 50,
                    width: "100%",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  }}
                />
              </>
            ) : (
              <>
                <div className="question_section">
                  <h3 className="question_title">Question:</h3>
                  <Markdown>{output?.data?.que}</Markdown>
                </div>

                {/* Markdown Section */}
                <div className="markdown_section">
                  <h4 className="markdown_title">Answer:</h4>
                  <Markdown>{output?.data?.ans}</Markdown>
                </div>
              </>
            )}
          </div>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default Sidebar;
