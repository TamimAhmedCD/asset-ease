import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useEmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); //   useAuth hook

  // TanStack query
  const { refetch, data: employeeList = [] } = useQuery({
    queryKey: ["employeeList", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee-accounts/${user?.email}`);
      return res.data;
    },
  });
  return [employeeList, refetch];
};

export default useEmployeeList;
