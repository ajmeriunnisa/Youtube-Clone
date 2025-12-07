# YouTube Clone 🎥

A responsive YouTube‑style video platform built with React (frontend) and Node.js + Express + MongoDB (backend).  
Users can create channels, upload videos, browse by category, and interact using likes, dislikes, and comments.

---

## ✨ Features

- **Authentication & Users**
  - Login state stored in localStorage
  - Prevents watching videos without signing in

- **Channels**
  - Create a channel with name, description, banner, and profile image
  - Each video is linked to a channel (channel name + channel profile image)
  - Channel page shows channel info and uploaded videos

- **Video Upload**
  - Upload form with:
    - Title and description
    - Thumbnail URL
    - Video URL (YouTube or direct link)
    - Category chosen from a fixed dropdown (Music, Gaming, Software, etc.)
    - Duration (in seconds) and initial views
  - Validation on required fields
  - Stores duration and views in the database

- **Home Page**
  - Responsive video grid:
    - 1 column on very small screens
    - 2–3 columns on tablets
    - 3–4 columns on desktops
  - Top horizontal **Filter Bar** with category chips (All, Music, Gaming, …)
  - Left **Sidebar** similar to YouTube with Home, Explore, Trending, etc.
  - Sidebar collapses to icons only and is responsive

- **Video Cards**
  - Thumbnail with duration badge (MM:SS or H:MM:SS)
  - Channel profile avatar
  - Video title and channel name
  - Views formatted as `1.2K`, `3.4M`, etc.
  - Upload date shown under the title

- **Video Page**
  - Video details section
  - Like and dislike counters
  - Comments:
    - Add comment (requires login)
    - Edit own comment
    - Delete own comment

---

## 🛠 Tech Stack

### Frontend

- React
- React Router
- Tailwind CSS
- React Icons
- Axios for API calls

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT‑based authentication (token stored on the client)

---

## 📁 Folder Structure

Youtube_Clone/
frontend/
src/
api/
axios.js
components/
ChannelContent.jsx
Comment.jsx
EditVideoModal.jsx
FilterBar.jsx
Header.jsx
Sidebar.jsx
SuggestedCard.jsx
SuggestedList.jsx
UploadVideo.jsx
VideoCard.jsx
hooks/
useVideos.jsx
pages/
Channel.jsx
CreateChannel.jsx
Home.jsx
Login.jsx
SignIn.jsx
VideoPlayer.jsx
App.jsx
main.jsx

backend/
controllers/
channel.controller.js
user.controller.js
video.controller.js
middleware/
auth.middleware.js
models/
channel.model.js
user.model.js
video.model.js
routes/
channel.routes.js
user.routes.js
video.routes.js
server.js


---

## 🚀 Getting Started

### 1. Clone the repository

git clone https://github.com/ajmeriunnisa/Youtube-Clone
cd Youtube-Clone


### 2. Setup backend

cd backend
npm install

Create a `.env` file in `backend` with values like:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Run the backend:
npm start

Backend will usually run on `http://localhost:5000`.

### 3. Setup frontend

cd ../frontend
npm install

Create a `.env` (or `vite.config`) for the API base URL if needed, for example:
VITE_API_BASE_URL=http://localhost:5000

Run the frontend:

Frontend will usually run on `http://localhost:5173`.

---

## 🔗 Main Endpoints (Backend)

- `POST /api/user/register` – Register a new user  
- `POST /api/user/login` – Login and receive token  
- `POST /api/channels` – Create a channel (auth required)  
- `GET /api/channels` – Get channels 
- `GET /api/channels/:id` - Get Channel by id 
- `POST /api/videos` – Create/upload video (auth required)  
- `GET /api/videos` – Get all videos  
- `GET /api/videos/:id` – Get single video  
- `GET /api/videos/category/:category` – Videos by category 
- `PUT /api/videos/:id` – Edit video (auth required)
- `DELETE /api/videos/:id` – Delete video (auth required)
- `POST /api/videos/:id/comments` – Add comment (auth required)
- `PUT /api/videos/:videoId/comments/:commentId` – Edit comment (auth required)
- `DELETE /api/videos/:videoId/comments/:commentId` – Delete comment (auth required)
- `POST /api/videos/:id/like` – Like video (auth required)
- `POST /api/videos/:id/dislike` – Dislike video (auth required)  


---

## ✅ Current Status

- Core YouTube‑style UI implemented  
- Responsive header, sidebar, filter bar, and video grid  
- Video upload with duration, views, and fixed category dropdown  
- Channel profile image displayed on channel page and video cards  
- Comments + likes/dislikes wired to backend

---

## 🧩 How It Works

- When a user logs in, a JWT token is stored on the client and sent with protected API requests.  
- Creating a channel stores `name`, `description`, `bannerImage`, and `profileImage`, and links the channel to the user.  
- Uploading a video:
  - Takes form data (title, description, URLs, category, duration, views) from the React form.
  - Backend saves a `Video` document with `channelId`, `channelName`, and `channelProfileImage` for quick display.  
- Home page uses a custom React hook to fetch videos, filtering by selected category and search text.  
- Comments, likes, and dislikes are stored on each video document and exposed through REST endpoints.

---

## 🙌 Acknowledgements

This project is inspired by the YouTube interface and various open‑source YouTube clone tutorials and articles about building MERN applications.  
It is meant for learning purposes (React, Tailwind, Node.js, Express.js, MongoDB, and JWT authentication).








