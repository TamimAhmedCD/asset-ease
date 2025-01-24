import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './useAxiosSecure';


const useEmployee = () => {
    const axiosSecure = useAxiosSecure()

    const {data: employee = [], refetch} = useQuery({
        queryKey: ['employee'],
        queryFn: async() => {
            const res = await axiosSecure.get('/employee-account')
            return res.data
        }
    })

    return [employee, refetch]
}

export default useEmployee;