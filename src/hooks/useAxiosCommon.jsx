import axios from "axios";

const useAxiosCommon = () => {
  const axiosCommon = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  return axiosCommon;
};

export default useAxiosCommon;
