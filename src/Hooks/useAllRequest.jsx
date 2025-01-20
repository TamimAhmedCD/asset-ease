import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useAllRequest = (searchQuery = "") => {
  const axiosPublic = useAxiosPublic();

  const { data: requests = [], refetch, isFetching } = useQuery({
    queryKey: searchQuery ? ["search-requests", searchQuery] : ["requests"],
    queryFn: async () => {
      try {
        if (searchQuery) {
          // Call the search API when searchQuery is provided
          const res = await axiosPublic.get("/requested-assets", {
            params: {
              requester_email: searchQuery, 
              requester_name: searchQuery 
            },
          });
          return res.data;
        } else {
          // Call the all requests API when no searchQuery is provided
          const res = await axiosPublic.get("/requested-assets");
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