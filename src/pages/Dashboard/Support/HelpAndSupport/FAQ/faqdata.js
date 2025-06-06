const items = [
  {
    title: "How to place an order?",
    idx: true,
    description:
      'To place an order on GossainbariBazar, first browse the product categories and select the items you want. Click on the product to view details, choose the quantity, and then add it to your cart. Once you’ve added all desired items, go to the cart page and review your order. Click on "Proceed to Checkout," fill in your delivery address, choose a payment method, and confirm your purchase. You’ll receive an order confirmation email or SMS with the details of your order.',
  },
  {
    title: "How to track my order?",
    description:
      'After placing an order, you can track its status by logging into your account and navigating to the "Order History" section. Each order will have a tracking number or status update, showing whether it\'s "Processing," "Shipped," or "Delivered." If your order has been shipped, you may also receive a tracking link via email or SMS to monitor real-time updates.',
  },
  {
    title: "What payment methods are accepted?",
    description:
      "GossainbariBazar supports multiple payment options for convenience. You can pay using credit/debit cards (Visa, MasterCard, etc.), mobile banking services (bKash, Nagad, Rocket), or cash on delivery (COD) for eligible locations. Secure online payment gateways ensure your transactions are safe. During checkout, select your preferred payment method and follow the instructions to complete your purchase.",
  },
  {
    title: "How to return a product?",
    description:
      'If you receive a defective or incorrect product, you can request a return within a specified time frame (usually 7 days). To initiate a return, go to your account, find the order under "Order History," and select the item you want to return. Fill out the return request form with the reason for the return. Once approved, you’ll receive instructions for returning the item. After verification, a replacement or refund will be processed based on the return policy.',
  },
  {
    title: "How to contact customer support?",
    description:
      'If you need assistance, you can contact GossainbariBazar’s customer support through multiple channels. You can reach out via the live chat option on the website, send an email to support@gossainbaribazzer.com, or call the support helpline at +8801XXXXXXXXX during working hours. Additionally, you can check the "Help & Support" section for common troubleshooting solutions.',
  },
];

const data = [
  // Product Upload FAQs
  {
    category: "Product Upload",
    idx: true,
    items: [
      {
        title: "How do I upload a new product?",
        description:
          "Go to your vendor dashboard, click on 'product-management', fill in all the required fields, and click 'Submit'.",
      },
      {
        title: "What image format is supported for product uploads?",
        description:
          "We support JPG, PNG, and WEBP formats. Each image should not exceed 2MB.",
      },
      {
        title: "Can I edit my product details after publishing?",
        description:
          "Yes, go to your 'product-management > manage-inventory' section and click 'Update Product' next to the product you want to update.",
      },
    ],
  },

  // Payment FAQs
  {
    category: "Payments",
    items: [
      {
        title: "When will I receive payment for my sales?",
        description:
          "Payments are processed weekly on Sundays for all completed and delivered orders.",
      },
      {
        title: "What payment methods are supported for vendors?",
        description:
          "You can receive payouts via bank transfer or mobile banking (e.g., bKash, Nagad).",
      },
      {
        title: "Where can I check my payment history?",
        description:
          "Navigate to the 'Revenue' section of your dashboard to view detailed payment history and payout status.",
      },
    ],
  },

  // Order Cancellation & Returns
  {
    category: "Order Cancellation & Returns",
    items: [
      {
        title: "Can I cancel an order as a vendor?",
        description:
          "Only pending orders can be canceled. Once shipped, cancellation is no longer possible from your end.",
      },
      {
        title: "How are returns processed?",
        description:
          "If a customer initiates a return, you'll be notified with details. You must respond within 48 hours.",
      },
      {
        title: "What happens if a product is returned?",
        description:
          "Once returned and verified, the amount is deducted from your next payout or refunded accordingly.",
      },
    ],
  },

  // Account & Profile Issues
  {
    category: "Account & Profile",
    items: [
      {
        title: "I forgot my password. What should I do?",
        description:
          "Click on the 'Forgot Password' option on the login page and follow the email instructions.",
      },
      {
        title: "How do I update my business information?",
        description:
          "Go to 'Settings' in your vendor dashboard to update your store name, contact info, or address.",
      },
      {
        title: "My account is under review. How long does it take?",
        description:
          "Account verification usually takes 1–3 business days. If it takes longer, please contact support.",
      },
    ],
  },
];

export default { items, data };
