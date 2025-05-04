💼 **JobBoardX – Full Stack Job Board Platform**

**Overview:**
JobBoardX is a role-based, full-stack web application simulating a real-world job board like LinkedIn or AngelList. Built with React + TypeScript on the frontend and Node.js + Express + MongoDB on the backend, it allows Job Seekers to apply for jobs and Employers to post and manage listings.

---

🚀 **Features**

👨‍💻 *Job Seeker*

* Register/Login
* Create and update personal profile
* Browse and search jobs
* Apply for jobs (only once per job)
* Withdraw applications
* Track application statuses

🧑‍💼 *Employer*

* Register/Login
* Post, edit, and delete job listings
* View list of applicants per job
* Change applicant statuses (submitted, reviewed, accepted, rejected)

🔒 *Security*

* JWT-based authentication (stored in cookies)
* Role-based access control (middleware protected routes)

💅 *UI/UX*

* Violet-based theme with light/dark mode
* Responsive and clean UI using MUI + styled-components
* Form validation using Formik + Yup
* Toast notifications and confirmation dialogs

---

🛠️ **Tech Stack**

*Frontend*

* React 18+
* TypeScript
* React Router v6
* MUI + styled-components
* Formik + Yup
* Axios
* Toastify

*Backend*

* Node.js + Express
* MongoDB + Mongoose
* JWT + bcryptjs
* dotenv

---

📁 **Folder Structure**

*Frontend (Vite + React)*

```
client/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── styles/
│   ├── routes/
│   ├── context/
│   └── App.tsx, main.tsx
```

*Backend (Express + MongoDB)*

```
server/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── server.js
├── .env
```

---

⚙️ **Setup Instructions**

🔽 *Clone the Repository*

```
git clone https://github.com/sandeepvaranasi16/Hiringhood_Tasks/S2_01_May_86cyt462d/job_boardx.git
cd jobboardx
```

▶️ *Backend Setup*

```
cd server
npm install
```

✏️ Create a `.env` file in `/server`:

```
PORT=your_port_number
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
```

Start the backend:

```
npm run dev
```

Backend will run at: `http://localhost:5000`

▶️ *Frontend Setup*

```
cd client
npm install
```

Update Axios base URL in `src/services/api.ts`:

```ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default api;
```

Start the frontend:

```
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

🧪 **Testing (Optional)**

* Use Thunder Client or Postman to test endpoints
* JWT token is stored in cookies with httpOnly flag
* Protected routes: `/profile`, `/employer/jobs`, `/applications/me`

---

🚀 **Deployment**

*Frontend (Vercel/Netlify)*

* Connect to GitHub repo
* Build command: `npm run build`
* Output directory: `dist`

*Backend (Render)*

* Create Web Service
* Build command: `npm install`
* Start command: `node server.js` or `npm start`
* Add environment variables from `.env` file

