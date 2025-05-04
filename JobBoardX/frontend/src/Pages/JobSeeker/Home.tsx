import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeBody from "../../components/EmployeeBody";
import Navigation from "../../components/Navigation";

type User = {
  name: string;
  profilePhoto: string;
  email: string;
};

const Home = () => {
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // 🔑 Fetch token from localStorage
    axios
      .get("http://localhost:5000/api/v1/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        
          localStorage.setItem("user",JSON.stringify(res.data.data))
          setUser(res.data.data);
        
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, []);
  return (
    <div>
      <Navigation/>
      <EmployeeBody user={user}/>
    </div>
  );
};

export default Home;
