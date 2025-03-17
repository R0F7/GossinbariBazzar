import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useGetData = (key, path) => {
  const axiosCommon = useAxiosCommon();

  const { data = [] } = useQuery({
    queryKey: [key, path],
    queryFn: async () => {
      const { data } = await axiosCommon.get(path);
      return data;
    },
    enabled: !!path,
  });

  return data;
};

export default useGetData;
