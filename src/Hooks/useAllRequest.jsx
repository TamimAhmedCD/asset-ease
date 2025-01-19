import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from '@tanstack/react-query';


const useAllRequest = () => {
    const axiosPublic = useAxiosPublic()

    const {data: requests = [], refetch} = useQuery({
        queryKey: ['requests'],
        queryFn: async() => {
            const res = await axiosPublic.get('/requested-assets')
            return res.data
        }
    })

    return [requests, refetch]
};

export default useAllRequest;