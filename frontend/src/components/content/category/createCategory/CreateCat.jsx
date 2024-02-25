// TicketDialog.jsx

import React, { useState,useRef} from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../../ticket/createTicket/CreateTicket.css";
import { RxCrossCircled } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";


const CatDialog = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const ref = useRef(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleInputChange = (value) => {
    setName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    ref.current.continuousStart();
  
   
   
      if (!name) {
        onSubmit({
          type : "warn",
          msg : `Please fill the name field.`
        });
        ref.current.complete();
        return; 
      }

    const catData = {
      name: name,
    };
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/tickets/createCategory`, {
        method: "POST",
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(catData), 
      });
      ref.current.complete();
      const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create Category");
    }
      toast.success(data.message);
      setName("");
      onSubmit({
        type : "success",
      });
    } catch (error) {
      ref.current.complete();
      toast.error(error.message);
      console.error("Error:", error);
    }
    onClose();
  };

  return (
    <div className={`dialog-container ${isOpen ? "open" : ""}`}>
    <div className={`ticket-dialog `}>

      <LoadingBar color="#f11946" ref={ref} />
      <div className="backbtn" onClick={() => onClose()}>
        <RxCrossCircled />
      </div>
      <div className="dialog-content">
        <h2 className="heading-2">Create Category</h2>
        <label>
          Name
          <input
            className="internalInput"
            type="text"
            value={name}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </label>
        <button className="sub-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
    </div>
  );
};

export default CatDialog;
