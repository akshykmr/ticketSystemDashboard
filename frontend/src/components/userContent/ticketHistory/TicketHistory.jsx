import React, { useEffect, useState } from "react";
import "./TicketHistory.css";
import SkeletonColor from "../../content/element/Loader/CardSkelaton";

const TicketHistory = () => {
 const [ticketHistory, setTicketHistory] = useState([]);
 const [user, setUser] = useState({});
 const BASE_URL = process.env.REACT_APP_BASE_URL;
 const [isLoading, setIsLoading] = useState(false);

 console.log(ticketHistory);
 useEffect(() => {
    const fetchTicketHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${BASE_URL}/tickets/getUserTicketHistory`,
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch ticket history");
        const data = await response.json();
        setTicketHistory(data.ticketHistory);
        setIsLoading(true);
        setUser(data.user);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTicketHistory();
 }, []);

 return (
    <div className="ticket-container">
      <div className="ticket-heading">Ticket History</div>
      <div className="bodyd">
        <div className="ticketbody">
          {!isLoading ? (
            <SkeletonColor numOfCards={4} />
          ) : (
            ticketHistory?.map((ticket) => (
              <div key={ticket._id} className="cardWrap">
                <div className="card cardLeft">
                 <h1>
                    Ticket Id : <span>{ticket._id}</span>
                 </h1>
                 <div className="title">
                    <h2>{user?.name}</h2>
                 </div>
                 <div className="name">
                    Email : <span>{user?.email}</span>
                 </div>
                 <div className="name">
                    Phone: <span>{user?.phone}</span>
                 </div>
                 <div className="seat">
                    <h2>{ticket?.date}</h2>
                 </div>
                </div>
                <div className="card cardRight">
                 <div className="eye"></div>
                 <div className="number">
                    <h3>1</h3>
                    <span>Quantity</span>
                 </div>
                 <div className="barcode"></div>
                </div>
              </div>
            ))
          )}
          {ticketHistory?.length % 2 !== 0 && (
            <div className="cardWrapp">
              <div className="cardd cardLeftt ">
              </div>
              <div className="cardd cardRightt ">
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
 );
};

export default TicketHistory;