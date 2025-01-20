import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useAsset = () => {
    const axiosPublic = useAxiosPublic()

    const {data: assets = [], refetch} = useQuery({
        queryKey: ['assets'],
        queryFn: async() => {
            const res = await axiosPublic.get('/assets')
            return res.data
        }
    })

    return [assets, refetch]
};

export default useAsset;