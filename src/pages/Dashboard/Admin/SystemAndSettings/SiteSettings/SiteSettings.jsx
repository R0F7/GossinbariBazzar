import { Button } from "@/components/ui/button";
import { useState } from "react";
import BrandIdentity from "./BrandIdentity/BrandIdentity";
import DesignAndTheme from "./DesignAndTheme/DesignAndTheme";
import HomepageSections from "./HomepageSections/HomepageSections";
import CustomerInteraction from "./CustomerInteraction/CustomerInteraction";

const SiteSettings = () => {
  const [activeFeature, setActiveFeature] = useState("");

  const features = [
    "Brand Identity", // (Logo, Favicon, Title & Slogan)
    "Design & Theme",
    "Homepage Sections", //  (Banner, Featured Products, Offers)
    // "Product Management", // (Categories, Variants, Inventory)",
    // "Shopping & Checkout (Cart, Payment, Shipping)",
    "Customer Interaction", //(Contact Info, Social Media, Reviews)",
  ];

  return (
    <section className="p-4 pb-0 bg-[#F6F6F6] min-h-screen">
      <div className="bg-white p-4 rounded-md shadow">
        <h2 className="text-lg font-semibold">Settings</h2>
        <p className="text-sm text-gray-800">
          Manage your plan and billing history here
        </p>

        <div className="space-x-2 mt-3">
          {features.map((feature, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="sm"
              onClick={() => setActiveFeature(feature)}
              className={`${
                (activeFeature === feature ||
                  (idx === 0 && activeFeature === "")) &&
                "bg-accent"
              }`}
            >
              {feature}
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-white mt-3 p-4 rounded-md shadow min-h-[calc(100vh-165px)]">
        {(activeFeature === "Brand Identity" || activeFeature === "") && (
          <BrandIdentity />
        )}
        {activeFeature === "Design & Theme" && <DesignAndTheme />}
        {activeFeature === "Homepage Sections" && <HomepageSections />}
        {activeFeature === "Customer Interaction" && <CustomerInteraction />}
      </div>
    </section>
  );
};

export default SiteSettings;
