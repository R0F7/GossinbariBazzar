import GuidelineCard from "./GuidelineCard/GuidelineCard";

const VendorGuidelines = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">📘 Vendor Guidelines</h1>
      <div className="space-y-8">
        {/* Each guideline section will go here */}
        <GuidelineCard title="Vendor Onboarding" icon="🚀">
          <p>1. Register using your email and phone number.</p>
          <p>2. Submit required documents for verification.</p>
          <p>3. Set up your store profile, logo, and contact info.</p>
        </GuidelineCard>

        <GuidelineCard title="Product Listing Rules" icon="📦">
          <p>✔️ Only allowed categories (no weapons, no drugs).</p>
          <p>✔️ High-resolution images with white background.</p>
          <p>✔️ Clear, concise titles and detailed descriptions.</p>
        </GuidelineCard>

        <GuidelineCard title="Pricing Policy" icon="💰">
          <p>✔️ Price must be competitive with market rates.</p>
          <p>✔️ Discounts must not exceed 70% without approval.</p>
          <p>✔️ Price updates allowed once per day.</p>
        </GuidelineCard>

        <GuidelineCard title="Shipping & Handling" icon="🚚">
          <p>✔️ Package securely to avoid damage.</p>
          <p>✔️ Dispatch must be within 24–48 hours.</p>
          <p>✔️ Partner couriers: GBX, DHL, FedEx.</p>
        </GuidelineCard>

        <GuidelineCard title="Return & Refund Rules" icon="↩️">
          <p>✔️ Accept returns for damaged/wrong items within 7 days.</p>
          <p>✔️ Refunds processed within 3–5 business days.</p>
          <p>✔️ Disputes resolved via vendor support team.</p>
        </GuidelineCard>

        <GuidelineCard title="Prohibited Items" icon="⛔">
          <p>❌ Drugs, weapons, counterfeit goods, and adult content.</p>
          <p>❌ Expired food items or medicines.</p>
        </GuidelineCard>

        <GuidelineCard title="Code of Conduct" icon="📜">
          <p>✔️ Maintain professionalism in all communication.</p>
          <p>✔️ Zero tolerance for fraud, spam, or abusive language.</p>
          <p>✔️ Violations may result in account suspension.</p>
        </GuidelineCard>
      </div>
    </section>
  );
};

export default VendorGuidelines;
