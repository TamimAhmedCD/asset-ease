import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

const Dashboard = () => {
  const [role, setRole] = useState("");

  const { user } = useAuth();

  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    if (user?.email) {
      // Fetch user role
      axiosPublic.get(`/user/${user.email}`).then((res) => {
        const role = res.data.role;
        console.log(role);
        setRole(role);
      });
    }
  }, [user?.email, axiosPublic]);

  if(role == 'HR') {
    return <div>Hi HR</div>
  }
  if(role == 'employee') {
    return <div>Hi Employee</div>
  }
};

export default Dashboard;
