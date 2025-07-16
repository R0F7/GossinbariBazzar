// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const usePageTracking = () => {
//   const location = useLocation();
//   const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

//   useEffect(() => {
//     if (!window.gtag || !measurementId) return;

//     window.gtag("config", measurementId, {
//       page_path: location.pathname + location.search,
//     });
//   }, [location, measurementId]);
// };

// export default usePageTracking;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/utils/ga";

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
};

export default usePageTracking;
