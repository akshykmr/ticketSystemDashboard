import React from "react";
import { Skeleton } from "@mui/material";

const TableRowsLoader = ({ rowsNum, columnsNum }) => {
    return [...Array(rowsNum)].map((row, rowIndex) => (
      <tr key={rowIndex}>
        {[...Array(columnsNum)].map((cell, cellIndex) => (
          <td key={cellIndex}>
            <Skeleton animation="wave" variant="text" />
          </td>
        ))}
      </tr>
    ));
  };
  
export default TableRowsLoader