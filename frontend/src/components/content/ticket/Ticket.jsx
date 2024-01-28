import React, { useEffect, useState } from "react";
import "./Ticket.css";
import CreateTicket from "./createTicket/CreateTicket";
import { ToastContainer, toast } from "react-toastify";
import TableRowsLoader from "../element/Loader/TableSkelaton";

const Ticket = () => {
  const [tickets, setTickets] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/tickets/getTickets`, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch tickets");
      const data = await response.json();
      setIsLoading(true);
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCreateTicket = (ticketData) => {
    if (ticketData.type === "warn") {
      toast.warn(ticketData.msg);
    } else if (ticketData.type === "success") {
      fetchTickets();
    }
  };

  const headers = [
    "Serial No",
    "Category",
    "Price",
    "Date",
    "Availability",
    "Occupancy",
    "Status",
  ];

  return (
    <div className="ticket-container">
      <div className="ticket-headingg">
        <p className="headingtxt">Tickets</p>
        <button className="createticket-btn" onClick={handleOpenDialog}>
          Create{" "}
        </button>
      </div>

      <CreateTicket
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        categories={categories}
        onSubmit={handleCreateTicket}
      />
      <div className="tablebody">
        <table className="ticket-table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isLoading ? (
              <TableRowsLoader rowsNum={10} columnsNum={headers.length} />
            ) : (
              tickets.map((ticket, index) => (
                <tr key={ticket.id}>
                  <td>{index + 1}</td>
                  <td>{ticket?.category?.name}</td>
                  <td>{ticket?.price}</td>
                  <td>{ticket?.date}</td>
                  <td>{ticket?.availability}</td>
                  <td>{ticket?.occupancy}</td>
                  <td>{ticket?.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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

export default Ticket;
