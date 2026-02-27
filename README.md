# Elevate Resort - Luxury Hotel & Event Venue Website

Welcome to the **Elevate Resort** web application. This project is a full-stack MERN (MongoDB, Express, React, Node.js) application designed for a premium resort in Gorakhpur. It features a stunning public-facing website for modifications and a comprehensive admin panel for content management.

## 🌟 Features

### Public Website

- **Home Page**: Captivating hero section, testimonials, and "Why Choose Us" highlights.
- **Weddings & Events**: Detailed showcase of wedding lawns and poolside function areas.
- **Accommodation**: Display of available rooms (Executive, Bridal, Family Cottages) with details and pricing.
- **Pool & Leisure**: Information about the swimming pool, safety features, and dining.
- **Gallery**: categorized image gallery (Weddings, Pool, Rooms, etc.).
- **Contact**: Inquiry form and contact details.

### Admin Panel (CMS)

- **Dashboard**: Overview of total inquiries, rooms, and gallery images.
- **Room Management**: Add, edit, and delete room listings.
- **Gallery Management**: Upload and categorize images for the gallery.
- **Inquiry Management**: View and manage customer inquiries from the contact form.
- **Testimonial Management**: Add and highlight guest reviews.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or Atlas Connection String)

### Installation

1.  **Clone the repository** (if you haven't already):

    ```bash
    git clone <repository-url>
    ```

2.  **Install Server Dependencies**:

    ```bash
    cd server
    npm install
    ```

3.  **Install Client Dependencies**:
    ```bash
    cd ../client
    npm install
    ```

### Running Locally

1.  **Start the Server**:
    In one terminal window:

    ```bash
    cd server
    node server.js
    ```

    _Server runs on http://localhost:5000_

2.  **Start the Client**:
    In a second terminal window:
    ```bash
    cd client
    npm run dev
    ```
    _Client runs on http://localhost:5173_

## 🔐 Admin Access

To access the Admin Panel, look for the "Owner Login" link in the website footer, or navigate to `/admin/login`.

**Default Credentials:**

- **Username:** `admin`
- **Password:** `password123`

> **Note:** For security, please change this password after your first login (functionality to be added) or update it directly in the database/seed script.

## 🌐 Deployment

This project is ready for deployment on Vercel.

- **Server**: Deployed as a serverless function structure.
- **Client**: Deployed as a distinct Vite React app.

For detailed, step-by-step deployment instructions, please refer to the **[Vercel Deployment Guide](./vercel_deployment_guide.md)** included in this repository.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, CSS3, React Router DOM, Axios
- **Backend**: Node.js, Express.js
- **Database**: Supabase
- **Authentication**: JWT (JSON Web Tokens)
- **Image Handling**: Multer (Local/Server)
