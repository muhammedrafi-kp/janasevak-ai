# Janasevak AI

> Empowering Citizens. Enabling Accountability.

![Janasevak AI Preview](https://via.placeholder.com/1200x600?text=Janasevak+AI+Dashboard)

**Live Demo:** [Janasevak AI Frontend](https://janasevak-p8vhnffcr-mhd-rafis-projects.vercel.app/)

Janasevak AI is a platform designed to bridge the gap between citizens and authorities. It enables citizens to easily report local issues (like infrastructure damage, waste management, etc.) while providing authorities with a streamlined dashboard to track, manage, and resolve those issues efficiently.

## 🚀 Key Features

*   **Dual-Role Authentication:** Secure login for both Citizens and Authorities using Supabase Auth, seamlessly integrated with user profile data in MongoDB.
*   **Issue Reporting System:** Citizens can report issues with geolocations, descriptions, and file attachments (images processed via Cloudinary).
*   **Public Issue Map:** An interactive map (powered by Leaflet) that visualizes reported issues in the community.
*   **Citizen Dashboard:** Users can track the status of their reported issues, view timelines, and manage their profiles.
*   **Authority Dashboard:** Dedicated workspace for officials to review incoming issues and update resolution statuses.
*   **AI Integration:** Leverages Google GenAI to analyze and categorize issues efficiently.
*   **Modern UI/UX:** Responsive, accessible, and animated interface built with React, Tailwind CSS, and Framer Motion.

## 🛠️ Tech Stack

**Frontend**
*   [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) + TypeScript
*   [Tailwind CSS](https://tailwindcss.com/) for styling
*   [Zustand](https://github.com/pmndrs/zustand) for state management
*   [React Router v7](https://reactrouter.com/) for navigation
*   [Framer Motion](https://www.framer.com/motion/) for animations
*   [React Leaflet](https://react-leaflet.js.org/) for interactive maps
*   [React Hook Form](https://react-hook-form.com/) for form validation
*   [Recharts](https://recharts.org/) for dashboard analytics

**Backend**
*   [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/) + TypeScript
*   [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) for database
*   [Supabase](https://supabase.com/) for secure Authentication
*   [Cloudinary](https://cloudinary.com/) for media storage and image delivery
*   [Google GenAI](https://ai.google.dev/) for intelligent issue processing

## 📁 Project Structure

```
janasevak-ai/
├── backend/                # Express & Node.js Server
│   ├── src/
│   │   ├── configs/        # DB, Supabase, Cloudinary configurations
│   │   ├── controllers/    # API Request handlers
│   │   ├── middlewares/    # Multer, Auth guards
│   │   ├── models/         # Mongoose Schemas (User, Complaint, etc.)
│   │   ├── routes/         # Express API routes
│   │   ├── services/       # Core business logic
│   │   └── index.ts        # Server entry point
│   └── package.json
└── frontend/               # React & Vite Application
    ├── src/
    │   ├── api/            # Axios API configurations
    │   ├── components/     # Shared UI components
    │   ├── features/       # Feature-based modules (my-issues, report-issue, etc.)
    │   ├── layouts/        # Global and Dashboard layouts
    │   ├── pages/          # Full page components
    │   ├── routes/         # App routing (Protected, Public)
    │   ├── store/          # Zustand global stores
    │   └── types/          # TypeScript definitions
    ├── vercel.json         # Vercel deployment config
    └── package.json
```

## 💻 Getting Started

To run this project locally, you will need to set up both the backend and frontend.

### Prerequisites
*   Node.js (v18+)
*   MongoDB Instance
*   Supabase Account (for Authentication keys)
*   Cloudinary Account (for image uploads)
*   Google Gemini API Key

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` root and configure the following:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    SUPABASE_URL=your_supabase_project_url
    SUPABASE_ANON_KEY=your_supabase_anon_key
    CLOUDINARY_CLOUD_NAME=your_cloudinary_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    GEMINI_API_KEY=your_google_genai_api_key
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

### Frontend Setup

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `frontend` root and add your backend API URL:
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```
4.  Start the Vite development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📄 License

This project is licensed under the MIT License.
