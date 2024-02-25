// TicketDialog.jsx

import React, { useState,useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateTicket.css";
import { RxCrossCircled } from "react-icons/rx";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from "react-toastify";


const TicketDialog = ({ isOpen, onClose, categories, onSubmit }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const ref = useRef(null);

  const [formData, setFormData] = useState({
    category: "",
    price: "",
    date: new Date(),
    availability: "",
  });

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    ref.current.continuousStart();
  
   
    for (const key in formData) {
      if (formData[key].toString().trim() === '') {
        onSubmit({
          type : "warn",
          msg : `Please fill the ${key} field.`
        });
        ref.current.complete();
        return; 
      }
    }
    const formattedDate = formatDate(formData.date);
    const ticketData = {
      category: formData.category,
      price: formData.price,
      date: formattedDate,
      availability: formData.availability,
    };
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/tickets/createTicket`, {
        method: "POST",
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData), 
      });
      ref.current.complete();
      const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create ticket");
    }

      toast.success(data.message);
      setFormData({
        category: '',
        price: '',
        date: new Date(),
        availability: '',
      });
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
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className={`dialog-container ${isOpen ? "open" : ""}`}>
    <div className={`ticket-dialog `}>
      <LoadingBar color="#f11946" ref={ref} />

      <div className="backbtn" onClick={() => onClose()}>
        <RxCrossCircled />
      </div>
      <div className="dialog-content">
        <h2 className="heading-2">Create Ticket</h2>
        <label>
          Category
          <select
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Price
          <input
            className="internalInput"
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
          />
        </label>
        <label>
          Date
          <DatePicker
            className="internalInput"
            selected={formData.date}
            onChange={(newDate) => handleInputChange("date", newDate)}
            placeholderText="Select a date"

          />
        </label>
        <label>
          Availability
          <input
            className="internalInput"
            type="number"
            value={formData.availability}
            onChange={(e) => handleInputChange("availability", e.target.value)}
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

export default TicketDialog;
