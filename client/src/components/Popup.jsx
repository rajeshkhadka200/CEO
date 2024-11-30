import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IoCloseOutline } from "react-icons/io5";
import { ContextProvider } from "../config/Context";

const Popup = ({ open, handleClose, onExecute }) => {
  const { extraDesc, setExtraDesc } = useContext(ContextProvider);

  const style = {
    borderRadius: "5px",
    outline: "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#171717",
    boxShadow: 24,
    p: 2,
    border: "1px solid #3e3e3e88",
  };

  const handleOkay = () => {
    onExecute();
    handleClose();
    setExtraDesc("");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="header_popup">
          <h3>Add Additional Description:</h3>
          <div className="cross" onClick={handleClose}>
            <IoCloseOutline />
          </div>
        </div>
        <div className="content_additional">
          <textarea
            value={extraDesc}
            onChange={(e) => setExtraDesc(e.target.value)}
            rows="4"
            placeholder="Enter the extra description about your problem."
          />
          <div className="popupfooter">
            <button onClick={handleOkay}>Okay</button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default Popup;
