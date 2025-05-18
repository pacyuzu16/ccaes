# CCAES - Citizen Complaints and Engagement System

A modern web application for citizens to submit and track complaints about public services, with admin features to manage complaints and users.

## Tech Stack
- **Frontend**: React, Bootstrap 5, React Router
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT

## Features
- **User**: Signup, login, submit complaints, track status, view history.
- **Admin**: Manage complaints (view, update status/response), manage users (view, update name/email/password, delete).
- **UI/UX**: Responsive design with Bootstrap, intuitive navigation.

## Setup
1. Clone the repo: `git clone https://github.com/pacyuzu16/ccaes.git`
2. **Backend**:
   - `cd server`
   - `npm install`
   - Create `.env` with `MONGO_URI`, `JWT_SECRET`, `PORT`
   - `npm start`
3. **Frontend**:
   - `cd client`
   - `npm install`
   - `npm run dev`

## API Endpoints
- `POST /api/auth/signup`: Register user
- `POST /api/auth/login`: Login user
- `POST /api/complaints`: Submit complaint
- `GET /api/complaints/status/:ticketId`: Track complaint
- `GET /api/complaints/history`: User complaint history
- `GET /api/complaints`: Admin fetch all complaints
- `PUT /api/complaints/:id`: Admin update complaint
- `GET /api/users`: Admin fetch all users
- `PUT /api/users/:id`: Admin update user
- `DELETE /api/users/:id`: Admin delete user

## Demo
## Demo
- **Live Demo**: [https://ccaes.vercel.app]
- **Backend API**: [https://ccaes.onrender.com]  
   
   you can use this command in your terminal to check the backend apis:  curl -X POST https://ccaes.onrender.com/api/auth/signup -H "Content-Type: application/json" -d '{"name":"Test User","email":"test23@example.com","password":"password123"}'

   
- **Demo Video**: [https://youtu.be/uEe74EwwyrM]
[Live Demo Link]

## Screenshots
![Home Page](images/1.png)
![login](images/2.png)
![User Dashboard](images/3.png)

![Complain submited](images/4.png)
![admin Dashboard](images/5.png)
![user management Dashboard](images/6.png)


## Architecture
- **Database used**: mongodb online 
- **Frontend**: React with Bootstrap for responsive UI.
- **Backend**: RESTful API with MongoDB for data storage.
- **Authentication**: JWT-based secure access.
  

## Deployment
- **Frontend**: Vercel
- **Backend**: Render
