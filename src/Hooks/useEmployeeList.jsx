import { useQuery } from "@tanstack/react-query";
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

const useEmployeeList = () => {
    const axiosPublic = useAxiosPublic()
  const {user} = useAuth(); //   useAuth hook

  // TanStack query
  const { refetch, data: employeeList = [] } = useQuery({
    queryKey: ["employeeList", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/employee-accounts/${user?.email}`);
      return res.data;
    },
  });
  return [employeeList, refetch];
};

export default useEmployeeList;
