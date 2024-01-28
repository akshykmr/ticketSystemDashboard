import React, { useState } from "react";
import Sidebar from "./navbar/Navbar";
import Header from "./header/Header";
import "./Layout.css";

const Layout = ({ children }) => {

    const [prop, setProp] = useState(true)

    const getProp = (result)=>{
      setProp(result);
    }
   
    return (
       <div className="main">
         <div className={` layoutHeder ${prop ? 'open' : 'close'}`}>
           <Header/>
         </div>
         <div className="body">
           <div className={` sideBar ${prop ? 'open' : 'close'}`}>
             <Sidebar getProp={getProp} />
           </div>
           <div className={` childrenn ${prop ? 'open' : 'close'}`}>
             <main>{children}</main>
           </div>
         </div>
       </div>
    );
   };

export default Layout;
