import { useQuery } from "@tanstack/react-query";
import useAuth from './useAuth';
import useAxiosSecure from "./useAxiosSecure";

const useAllRequest = (searchQuery = "") => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()

  const { data: requests = [], refetch, isFetching } = useQuery({
    queryKey: searchQuery ? ["search-requests", searchQuery] : ["requests", user?.email] , 
    queryFn: async () => {
      try {
        if (searchQuery) {
          // Call the search API when searchQuery is provided
          const res = await axiosSecure.get(`/requested-assets?email=${user.email}`, {
            params: {
              requester_email: searchQuery, 
              requester_name: searchQuery 
            },
          });
          return res.data;
        } else {
          // Call the all requests API when no searchQuery is provided
          const res = await axiosSecure.get(`/requested-assets?email=${user.email}`);
          return res.data;
        }
      } catch (error) {
        console.error("Error fetching requested assets:", error);
        throw new Error("Failed to fetch requested assets");
      }
    },
    enabled: searchQuery !== undefined, 
  });

  return [requests, refetch, isFetching];
};

export default useAllRequest;