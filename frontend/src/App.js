import Login from "././components/auth/Login";
import Register from "././components/auth/Register";
import Dashboard from "./components/content/dashboard/Dashboard";
import Ticket from "./components/content/ticket/Ticket";
import User from "./components/content/user/User"
import Category from "./components/content/category/Category"
import Layout from './components/layout/Layout';
import TicketList from "./components/userContent/ticketList/TicketList";
import TicketHistory from "./components/userContent/ticketHistory/TicketHistory";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import YouTube from "./components/youtube/Youtube";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Layout><Dashboard /></Layout>} />
          <Route path="/ticket" element={<Layout><Ticket /></Layout>} />
          <Route path="/user" element={<Layout><User /></Layout>} />
          <Route path="/category" element={<Layout><Category /></Layout>} />
          <Route path="/tickets" element={<Layout><TicketList /></Layout>} />
          <Route path="/history" element={<Layout><TicketHistory /></Layout>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
