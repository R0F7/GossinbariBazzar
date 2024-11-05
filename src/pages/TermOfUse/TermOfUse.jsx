import { IoIosArrowBack } from "react-icons/io";

const TermOfUse = () => {
  return (
    <div className="container mx-auto">
      {/* page location  */}
      <div className="flex items-center justify-between my-3">
        <div className="flex items-center gap-1.5">
          <h4>Home</h4>
          <span>/</span>
          <h4>Pages</h4>
        </div>
        <div className="flex items-center gap-1">
          <i>
            <IoIosArrowBack />
          </i>
          <h4>Previous page</h4>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-[#212B36]">
          Terms of Use for GossainbariBazar
        </h1>

        <div className="mt-6 space-y-4">
          <div className="border-b border-[#00000015] px-4 pb-6 pt-3 shadow">
            <div className="flex items-center gap-1 font-bold mb-0.5">
              <span>1.</span>
              <h4 className="">Acceptance of Terms</h4>
            </div>
            <p className="text-[#757B82] text-sm font-semibold">
              By accessing or using GossainbariBazar, you agree to comply with
              and be bound by these Terms of Use, along with any updates. Please
              review these terms carefully. If you do not agree, you should not
              access the site.
            </p>
          </div>
          
          <div className="border-b border-[#00000015] px-4 pb-6 pt-3 shadow">
            <div className="flex items-center gap-1 font-bold">
              <span>2.</span>
              <h4>Use of Site</h4>
            </div>
            <p className="text-[#757B82] text-sm font-semibold">
            GossainbariBazar provides users with access to various products, including Electronics, Clothing, Jewelry, and more. You may only use the site for lawful purposes and not engage in fraudulent or unauthorized activities.
            </p>
          </div>

          <div className="border-b border-[#00000015] px-4 pb-6 pt-3 shadow">
            <div className="flex items-center gap-1 font-bold">
              <span>3.</span>
              <h4>Registration and Account Security</h4>
            </div>
            <p className="text-[#757B82] text-sm font-semibold">
            To make a purchase, you may need to create an account. By registering, you agree to provide accurate information and keep your password secure. GossainbariBazar is not responsible for any loss from unauthorized account access.
            </p>
          </div>
          <div className="border-b border-[#00000015] px-4 pb-6 pt-3 shadow">
            <div className="flex items-center gap-1 font-bold">
              <span>4.</span>
              <h4>Purchases and Payments</h4>
            </div>
            <p className="text-[#757B82] text-sm font-semibold">
            All prices are displayed in your local currency and are subject to change. We accept various payment methods and use secure third-party payment processors to handle transactions. GossainbariBazar does not store your payment information directly.
            </p>
          </div>
          <div className="border-b border-[#00000015] px-4 pb-6 pt-3 shadow">
            <div className="flex items-center gap-1 font-bold">
              <span>5.</span>
              <h4> Returns and Refunds</h4>
            </div>
            <p className="text-[#757B82] text-sm font-semibold">
            Please refer to our Return Policy for details on returnable items, conditions, and refund procedures. Generally, items must be returned in original condition within a specific time frame.
            </p>
          </div>
          <div className="border-b border-[#00000015] px-4 pb-6 pt-3 shadow">
            <div className="flex items-center gap-1 font-bold">
              <span>6.</span>
              <h4>Intellectual Property Rights</h4>
            </div>
            <p className="text-[#757B82] text-sm font-semibold">
            All content, including images, text, and trademarks, are the property of GossainbariBazar or our suppliers. Unauthorized use of any content may violate intellectual property laws.
            </p>
          </div>
          <div className="border-b border-[#00000015] px-4 pb-6 pt-3 shadow">
            <div className="flex items-center gap-1 font-bold">
              <span>7.</span>
              <h4>User-Generated Content</h4>
            </div>
            <p className="text-[#757B82] text-sm font-semibold">
            You may post reviews, comments, and other content where allowed. By posting, you grant GossainbariBazar a royalty-free license to use, modify, and display your content on the site. We reserve the right to remove any inappropriate content.
            </p>
          </div>
          <div className="border-b border-[#00000015] px-4 pb-6 pt-3 shadow">
            <div className="flex items-center gap-1 font-bold">
              <span>8.</span>
              <h4>Limitation of Liability</h4>
            </div>
            <p className="text-[#757B82] text-sm font-semibold">
            GossainbariBazar and its affiliates are not liable for any indirect or direct damages resulting from the use or inability to use the site, including damages for lost profits or data.
            </p>
          </div>
          <div className="border-b border-[#00000015] px-4 pb-6 pt-3 shadow">
            <div className="flex items-center gap-1 font-bold">
              <span>9.</span>
              <h4> Changes to Terms</h4>
            </div>
            <p className="text-[#757B82] text-sm font-semibold">
            We reserve the right to modify these Terms of Use at any time. Changes will be posted on this page, and your continued use of GossainbariBazar will signify acceptance of the updated terms.
            </p>
          </div>
          <div className="border-b border-[#00000015] px-4 pb-6 pt-3 shadow">
            <div className="flex items-center gap-1 font-bold">
              <span>10.</span>
              <h4>Governing Law
              </h4>
            </div>
            <p className="text-[#757B82] text-sm font-semibold">
            These Terms of Use are governed by the laws of [Your Country/State] without regard to its conflict of law principles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermOfUse;
