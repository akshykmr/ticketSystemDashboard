# Ticket System - MERN

Welcome to the Ticket System - a MERN application designed to streamline the process of buying and creating tickets, managing ticket categories, and handling user management. This application offers a user-friendly frontend for both admins and regular users, enabling functionalities such as ticket addition, purchasing, and user management.


## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Variables](#env)
- [Deployment](#deployment)
- [FAQ](#faq)
- [Screenshots](#screenshots)
- [Contact](#contact)

## Features

- **Ticket Creation**: Admin can create tickets in various categories.

- **User Management**: The Admin dashboard provides a list of users who have created tickets. Admins have the ability to block or unblock users, ensuring a safe and secure environment.
- **Ticket History**: Users can view the history of their tickets, providing transparency and accountability.
- **Ticket Purchase**: Users can purchase tickets directly from the dashboard, simplifying the ticket acquisition process.

## Requirements

- NodeJs
- MongoDB Community (locally installed) / MongoDB Atlas URL

## Installation

#### Frontend

To run the fronted application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/akshykmr/ticketSystemDashboard.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ticketSystemDashboard
   ```

3. Navigate to frontend folder
   ```bash
   cd frontend
   ```
4. Install the required npm packages:
   ```bash
   npm install
   ```
5. Start the frontend application
   ```bash
   npm start
   ```
6. The server should now be running locally. You can access it by navigating to `http://localhost:4000` in your web browser.

#### Backend

To run the backend application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/akshykmr/ticketSystemDashboard.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ticketSystemDashboard
   ```

3. Navigate to server folder
   ```bash
   cd server
   ```
4. Install the required npm packages:
   ```bash
   npm install --also=dev
   ```
5. Configure your environment variables by updating the .env with the necessary values.

6. Start the backend/server application
   ```bash
   npm run start
   ```
7. The server should now be running locally. You can access it by navigating to `http://localhost:5000` or the port your provided in your `.env`.


## Environment Variables

The app needs to be configured before running. \
 **<span style="color:red">Please go through the variables carefully as it affects the behaviour and functionality of the app</span>**. I've also included a .env.example file in both the applications.

#### Frontend

- `REACT_APP_API_BASE_URL` : Backend API base URL. For eg: `http://localhost:3000`

#### Backend

- `DB_URL` : Your MongoDB URI. For eg: `mongodb://localhost:27017/ticketSystemDashboard`
- `PORT` : The port you want to run the application on. For eg: `3000`
- `JWTSECURE_KEY` : Jwt secure key for authenticaion. For eg: `secret`

####

- `REACT_APP_BASE_URL` : Your backend server base URL. For eg: `http://localhost:5000`


## Deployment

The application is hosted on Vercel, both frontend and backend. \
The backend application is hosted live at [https://ticketsystem-d7ze.onrender.com](https://ticketsystem-d7ze.onrender.com) and the frontend application is hosted live at [https://ticketsystemfrontend.onrender.com](https://ticketsystemfrontend.onrender.com).

## FAQ

1. **Have you missed any development point?**\
   No, I instead went ahead and added additional features like allowing creation of tickets, creation of categories, user management dashboard,and admin dashboard etc on my behalf.

## Screenshots

Attaching few screenshots of the live application, just for an overview.

- Admin Homepage \
  ![homepage](https://github.com/akshykmr/ticketSystemDashboard/blob/master/screenshots/admin_homepage.png)

- Admin Tickets Homepage\
  ![homepage](https://github.com/akshykmr/ticketSystemDashboard/blob/master/screenshots/admin_ticket_homepage.png)

- Admin Tickets Creation\
  ![homepage](https://github.com/akshykmr/ticketSystemDashboard/blob/master/screenshots/admin_ticket_create.png)



- Admin Users Homepage\
  ![homepage](https://github.com/akshykmr/ticketSystemDashboard/blob/master/screenshots/admin_user_homepage.png)

- Admin Categories Homepage\
  ![homepage](https://github.com/akshykmr/ticketSystemDashboard/blob/master/screenshots/admin_category_homepage.png)

- Admin Categories Creation\
  ![homepage](https://github.com/akshykmr/ticketSystemDashboard/blob/master/screenshots/admin_category_create.png)




---

- User Signup \
  ![homepage](https://github.com/akshykmr/ticketSystemDashboard/blob/master/screenshots/user_signup.png)

- User Login \
  ![homepage](https://github.com/akshykmr/ticketSystemDashboard/blob/master/screenshots/user_login.png)

- User Tickets Homepage \
  ![homepage](https://github.com/akshykmr/ticketSystemDashboard/blob/master/screenshots/user_tickets.png)


- User Tickets Filtered \
  ![homepage](https://github.com/akshykmr/ticketSystemDashboard/blob/master/screenshots/user_ticket_filter.png)

- user Tickets History  \
  ![homepage](https://github.com/akshykmr/ticketSystemDashboard/blob/master/screenshots/user_ticket_history.png)



## Contact

- [LinkedIn](https://www.linkedin.com/in/akshykmr/)
- [Gmail](mailto:akshykmr70@gmail.com)
