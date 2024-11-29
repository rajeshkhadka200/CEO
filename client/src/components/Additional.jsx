import React from "react";
import "../styles/additional.css";
import { FaPlus } from "react-icons/fa6";
import Popup from "./Popup";

const Additional = ({ setDescription, onExecute }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="add_wrapper">
        <div onClick={handleOpen} className="add_con">
          <div className="plus">
            <FaPlus />
          </div>
        </div>
      </div>
      <Popup
        state={setOpen}
        open={open}
        handleClose={handleClose}
        setDescription={setDescription}
        onExecute={onExecute}
      />
    </>
  );
};

export default Additional;
