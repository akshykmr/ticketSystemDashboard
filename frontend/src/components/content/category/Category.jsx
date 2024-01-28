import React, { useState, useEffect } from "react";
import CreatCat from "./createCategory/CreateCat";
import "./Category.css";
import { ToastContainer, toast } from "react-toastify";

const Category = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [categories, setCategories] = useState([]);

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
  useEffect(() => {
    fetchCat();
  }, []);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCreateCat = (ticketData) => {
    if(ticketData.type === 'warn'){
      toast.warn(ticketData.msg);
      } else if (ticketData.type === 'success'){
        fetchCat();
      }
  };

  const headers = ["Serial No", "Name"];


  return (
    <div className="cat-container">
      <div className="cat-heading">
        <p className="catheadingtxt">Category</p>
        <button className="catcreateticket-btn" onClick={handleOpenDialog}>
          Create
        </button>
      </div>

      <CreatCat
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        categories={categories}
        onSubmit={handleCreateCat}
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
            {categories.map((category, index) => (
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
              </tr>
            ))}
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

export default Category;
