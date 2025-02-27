import container from "./settingsContent.js";

const Settings = () => {
  return (
    <div className="bg-[linear-gradient(135deg,_#1C232D,_#3A4B57)] min-h-screen relative overflow-hidden">
      <div className="bg-[rgba(55,72,85,0.7) bg-[rgba(98,114,123,0.7)] w-[550px] h-[550px] rounded-full absolute -top-[250px] -right-[240px]"></div>
      <div className="bg-[rgba(102,120,138,0.7) bg-[rgba(145,163,176,0.7)] w-[520px] h-[520px] rounded-full absolute -bottom-[250px] -left-[250px]"></div>

      {/* cards container */}
      <div className=" absolute top-0 left-0 flex h-full items-center">
        <div className="mx-20 order grid grid-cols-3 gap-10 card-container">
          {/* card */}
          {container.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl card hover:cursor-pointer"
            >
              <div className="flex items-center gap-1 text-xl font-semibold text-white">
                <span>{item.Icon}</span>
                <h2 className="">{item.Title}</h2>
              </div>
              <p className="mt-2 text-white">{item.Description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
