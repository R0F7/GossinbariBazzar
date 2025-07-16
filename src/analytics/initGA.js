export const initGA = () => {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!id) return;

  const script1 = document.createElement("script");
  script1.setAttribute("async", "");
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${id}');
  `;
  document.head.appendChild(script2);
};