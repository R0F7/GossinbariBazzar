// import ReactGA from "react-ga4";

// const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
// const FORCE_GA = import.meta.env.VITE_FORCE_GA === "true";

// export const initGA = () => {
//   if (import.meta.env.MODE === "production" || FORCE_GA) {
//     ReactGA.initialize(GA_MEASUREMENT_ID);
//   }
// };

// export const trackPageView = (path) => {
//   if (import.meta.env.MODE === "production" || FORCE_GA) {
//     ReactGA.send({ hitType: "pageview", page: path });
//   }
// };

import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const FORCE_GA = import.meta.env.VITE_FORCE_GA === "true";

export const initGA = () => {
  if (import.meta.env.MODE === "production" || FORCE_GA) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }
};

export const trackPageView = (path) => {
  if (import.meta.env.MODE === "production" || FORCE_GA) {
    ReactGA.send({ hitType: "pageview", page: path });
  }
};

export const trackEvent = ({ category, action, label, value }) => {
  if (import.meta.env.MODE === "production" || FORCE_GA) {
    ReactGA.event({ category, action, label, value });
  }
};
