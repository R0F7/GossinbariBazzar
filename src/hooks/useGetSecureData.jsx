import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetSecureData = (key, path) => {
  const axiosSecure = useAxiosSecure();

  const { data = [] } = useQuery({
    queryKey: [key, path],
    queryFn: async () => {
      const { data } = await axiosSecure.get(path);
      return data;
    },
    enabled: !!path,
  });

  return data;
};

export default useGetSecureData;
