import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from '@tanstack/react-query';


const useAllRequest = () => {
    const axiosPublic = useAxiosPublic()

    const {data: request = [], refetch} = useQuery({
        queryKey: ['request'],
        queryFn: async() => {
            const res = await axiosPublic.get('/requested-assets')
            return res.data
        }
    })

    return [request, refetch]
};

export default useAllRequest;