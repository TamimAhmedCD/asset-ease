import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://asset-ease-seven.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;