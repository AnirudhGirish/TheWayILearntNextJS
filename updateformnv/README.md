# NVPSA Portal

NVPSA Portal is a robust and secure alumni management platform for the Nutan Vidyalaya Past Students Association. It enables users to submit their details via a dynamic, validated form, while providing administrators with a responsive dashboard to view, manage, and export collected data. Built with modern technologies, NVPSA Portal emphasizes security, performance, and user-friendly design.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Features
- **Alumni Form Submission:** Users can securely submit their details through a dynamic form validated with Zod.
- **Admin Dashboard:** Administrators can view, filter, and export submissions in CSV or Excel formats.
- **Secure Authentication:** Admin signup, sign-in, and sign-out functionalities are implemented using JWT and secure httpOnly cookies.
- **Responsive Design:** Built with Tailwind CSS, ensuring a modern, responsive UI across all devices.
- **Server-Side Rendering (SSR):** Critical pages like the landing page are rendered on the server for improved performance and SEO.
- **Clipboard Functionality:** Easily copy the form link for sharing purposes.

---

## Tech Stack
- **Frontend:** Next.js (React), Tailwind CSS, React Hook Form, Zod
- **Backend:** Next.js API Routes, MongoDB, Mongoose
- **Authentication:** JWT, bcryptjs for password hashing, secure httpOnly cookies
- **Utilities:** json2csv, ExcelJS, (optional: pdf-lib for PDF exports)

---

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/nvpsa-portal.git
   cd nvpsa-portal
   ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Set up environment variables:**

    Create a `.env.local file` in the root directory with the following content:
    ```bash
    MONGODB_URI=your_mongodb_connection_string
    TOKEN_SECRET=your_jwt_secret_key
    ```
4. **Run the development server:**
    ```bash
    npm run dev
    ```
    Open http://localhost:3000 in your browser.

---
## Configuration

- **Database**: Use MongoDB (Atlas or local) and update the MONGODB_URI in .env.local.
- **JWT Authentication**: Set the TOKEN_SECRET to secure your JWT tokens.
- **Deployment**: Configure your environment variables on your hosting platform (e.g., Vercel).

---
## Usage

- Landing Page: Provides an introduction to the NVPSA Portal with calls to action for signing in or submitting the form.
- Form Submission: Users fill out and submit their data via a dynamic, validated form.
- Admin Dashboard: Authenticated admins can access the dashboard to view submissions and export data.
- Authentication: Admin routes are protected using secure cookies and server-side authentication middleware.

---
## API Endpoints

- POST `/api/form`

    Submits form data after Zod validation and saves it to MongoDB.
- GET `/api/fetch`

    Fetches all submitted form data for the admin dashboard.
- GET `/api/export`

    Exports form data in CSV or Excel formats.
- POST `/api/sign-up`

    Registers a new admin user.
- POST `/api/sign-in`

    Authenticates an admin user and sets a secure token cookie.
- POST `/api/sign-out`

    Clears the authentication cookie to sign out an admin.
---
## Authentication

**NVPSA Portal uses JWT-based authentication:**

- Admin Signup: Create an account with secure credentials.
- Admin Sign-In: Authenticate using your email/username and password.
- Token Security: Tokens are stored as httpOnly cookies, ensuring they cannot be accessed via client-side JavaScript.

---
## Contributing

**Contributions are welcome!**

- Fork the repository.
- Create a feature branch: `git checkout -b feature/YourFeature`
- Commit your changes: `git commit -m 'Add new feature'`
- Push to your branch: `git push origin feature/YourFeature`
- Open a pull request for review.

--- 
## Acknowledgements

- Inspiration: NVPSA Portal was inspired by the need for efficient and secure alumni data management.
- Open Source: Thanks to the open-source community for the amazing libraries and tools that made this project possible.
- Special Mentions: Big shout-out to all contributors and supporters of the project.

---
## Contact Me

Contact me for help or advices at anirudhgirish08@gmail.com 

---
**Enjoy using NVPSA Portal! 🚀**