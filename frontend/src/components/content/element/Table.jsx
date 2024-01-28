// UserTable.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Table.css'; // Import the CSS file

const Table = ({ theadData, tbodyData }) => {
  const [users, setUsers] = useState(tbodyData);

  console.log(users,'popopop')

  const handleToggleStatus = (userId) => {
    console.log('Toggling status for user with ID:', userId);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: !user.status } : user
      )
    );
  };
  

  return (
    <table className="user-table">
      <thead>
        <tr>
          {theadData.map((th, index) => (
            <th key={index}>{th}</th>
          ))}
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            {theadData.map((key, index) => (
              <td key={index}>{user[key]}</td>
            ))}
            <td>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={user.status}
                  onChange={() => handleToggleStatus(user.id)}
                />
                <span className="slider round"></span>
              </label>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  theadData: PropTypes.arrayOf(PropTypes.string).isRequired,
  tbodyData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // Include other properties corresponding to theadData keys
    })
  ).isRequired,
};

export default Table;
