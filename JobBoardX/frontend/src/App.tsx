import {Routes,Route,BrowserRouter} from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import LoginPage from "./Pages/Auth/LoginPage"
import RegisterPage from "./Pages/Auth/RegisterPage"
import Home from "./Pages/JobSeeker/Home"
import JobDetail from "./Pages/JobSeeker/JobDetail"
import Application from "./Pages/JobSeeker/Application"
import JobPage from "./Pages/JobSeeker/JobPage"
import ProfilePage from "./Pages/JobSeeker/ProfilePage"
import ProtectedRoute from "./ProtectedRoute"
import EmployeeHome from "./Pages/Employee/EmployeeHome"
import Companies from "./Pages/Employee/Companies"
import Job from "./Pages/Employee/Job"
import ApplicantPage from "./Pages/Employee/ApplicantPage"


const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
            <Route path="/register" element={<RegisterPage/>}></Route>
            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route path="/seeker/home" element={<Home/>}></Route>
              <Route path="/seeker/jobs" element={<JobPage/>}></Route>
              <Route path="/jobs/:id" element={<JobDetail/>}></Route>
              <Route path="/seeker/applications" element={<Application/>}></Route>
              <Route path="/seeker/profile" element={<ProfilePage/>}/>
     
            </Route>
            <Route element={<ProtectedRoute allowedRoles={['recruiter']} />}>
              <Route path="/employee/home" element={<EmployeeHome/>}/>
              <Route path="/employee/company" element={<Companies/>}></Route>
              <Route path="/employee/job" element={<Job/>}></Route>
              <Route path="/employee/job/applicants" element={<ApplicantPage/>}></Route>
            </Route>
            
        </Routes>
    </BrowserRouter>
  )
}

export default App