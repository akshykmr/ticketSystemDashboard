import React, { useState, useEffect, useRef } from "react";
import "./TicketList.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LiaPagerSolid } from "react-icons/lia";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const ref = useRef(null);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/tickets/getTicketsforUsers`, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch tickets");
      const data = await response.json();
      setTickets(data.tickets);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCat = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/tickets/getCategoryes`, {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch tickets");
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCat();
  }, []);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

 

  const handleCategoryFilter = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePurchaseTicket = async (ticketId) => {
    ref.current.continuousStart();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/tickets/purchaseTicket`, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticketId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to purchase ticket");
      }
      ref.current.complete();
      toast.success("Ticket purchased successfully");
      fetchTickets();
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
      ref.current.complete();
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const filteredTickets = tickets.filter((ticket) => {
    const formattedSelectedDate = formatDate(selectedDate);
    return (
      (formattedSelectedDate === "" || ticket.date === formattedSelectedDate) &&
      (selectedCategory === "" || ticket.category._id === selectedCategory)
    );
  });

  return (
    <div className="tlist-container">
      <LoadingBar color="#f11946" ref={ref} />

      <div className="tlist-heading">Availabe Tickets</div>
      <div className="filters">
        <label>
          Filter by Date
          <DatePicker
            className="ticklistinpu"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)} 
            placeholderText="Select a date"
            dateFormat="dd-MM-yyyy" 
            isClearable={true} 
            closeOnSelect={true}
          />
        </label>
        <label>
          Category
          <select value={selectedCategory} onChange={handleCategoryFilter}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="tlistbody">
        <div className="ticket-list">
          <ul>

            {filteredTickets.map((ticket) => (
              <li key={ticket._id} className="ticket-item">
                <div className="ticket-details">
                  <LiaPagerSolid className="tick-iconn" />
                  <div className="tick-item">
                    <p>Date: {ticket.date}</p>
                    <p className="categoryl">
                      Category: {ticket.category.name}
                    </p>
                    <p>Price: {ticket.price}</p>
                    <p>Availability: {ticket.availability}</p>
                    <p>Occupancy: {ticket.occupancy}</p>
                  </div>
                </div>
                <div className="booking-controls">
                  <button
                    className="bookbtn"
                    onClick={() => handlePurchaseTicket(ticket._id)}
                  >
                    Book
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default TicketList;
