import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { PiTicketFill } from "react-icons/pi";

const Dashboard = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [dashboardData, setDashboardData] = useState({
    totalCategories: 0,
    totalTickets: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await fetch(
          `${BASE_URL}/tickets/getDashboardData`,
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Data fetch failed");
        const data = await response.json();
        setDashboardData(data.counts);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card-container">
      <div className="heading">Dashboard</div>
      <div className="cardItem">

        <div className="da_card da_card1">
          <div className="frow">
            <FaUsersBetweenLines className="card-icon" />
            <h2>Users</h2>
          </div>
          <div className="srow">
            <p>Total Users</p>
            <p className="number">{dashboardData.totalUsers}</p>
          </div>
        </div>

        <div className="da_card da_card2">
          <div className="frow">
            <MdCategory className="card-icon" />
            <h2>Categories</h2>
          </div>
          <div className="srow">
            <p>Total Categories</p>
            <p>{dashboardData.totalCategories}</p>
          </div>
        </div>

        <div className="da_card  da_card3">
          <div className="frow">
            <PiTicketFill className="card-icon" />
            <h2>Tickets</h2>
          </div>
          <div className="srow">
            <p>Total Tickets</p>
            <p>{dashboardData.totalTickets}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
