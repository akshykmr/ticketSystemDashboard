import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./User.css";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import TableRowsLoader from "../element/Loader/TableSkelaton";

const User = () => {
  const ref = useRef(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const headers = [
    "Serial No",
    "Name",
    "Phone Number",
    "Email",
    "Status",
    "Action",
  ];

  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // Fetching all users]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/tickets/getAllUsers/`, {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        });
        if (!response.ok) throw new Error("Data fetch failed");
        const data = await response.json();
        setIsLoading(true);
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleToggleStatus = async (userId) => {
    ref.current.continuousStart();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/tickets/toggleUserActivation?userId=${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to toggle user status");
      const data = await response.json();
      ref.current.complete();

      toast.success(data.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? { ...user, is_deactivated: !user.is_deactivated }
            : user
        )
      );
    } catch (error) {
      ref.current.complete();
      toast.error(error.message);
      console.error("Error toggling user status:", error);
    }
  };

  return (
    <div className="user-container">
      <LoadingBar color="#f11946" ref={ref} />
      <div className="user-heading">User</div>
      <div className="tablebody">
        <table className="user-table">
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
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{!user.is_deactivated ? "Active" : "Inactive"}</td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={!user.is_deactivated}
                        onChange={() => handleToggleStatus(user._id)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
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

export default User;
