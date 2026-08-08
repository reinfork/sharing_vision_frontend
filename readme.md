# Sharing Vision Frontend

**Live Demo App:** 

This is the frontend dashboard for the Sharing Vision Fullstack Engineer submission. It consumes the Golang microservice to perform CRUD operations on articles.

## Tech Stack
* **Framework:** Vue 3 (Composition API)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS v4
* **HTTP Client:** Axios

## Prerequisites
To run this project locally, you will need:
* [Node.js](https://nodejs.org/) (v18 or higher)
* npm, yarn, or pnpm

## How to Run Locally

1. **Clone the repository:**
   
   ```bash
   git clone [YOUR_FRONTEND_REPO_URL]
   cd [YOUR_FRONTEND_FOLDER_NAME]
   ``
3. **Install Dependencies:**
   
   ```bash
   npm install
   ```
   
4. Configure Env

   ```bash
   VITE_API_BASE_URL=http://localhost:8080
   ```

5. Run

   ```bash
   npm run dev
   ```
