import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

const AccordionX = () => {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setActive(false);
  };

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

  return (
    <>
      {items.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === `${index}` || active === item.idx}
          onChange={handleChange(`${index}`)}
          className="accordion"
        >
          <AccordionSummary
            expandIcon={expanded === `${index}` ? <FiMinus /> : <GoPlus />}
            className="accordion-title"
          >
            {item.title}
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            {item.description}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default AccordionX;
