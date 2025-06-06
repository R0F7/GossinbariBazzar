import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import faqData from "./faqdata";
import PropTypes from "prop-types";

const AccordionX = ({ role }) => {
  const { items, data } = faqData;
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setActive(false);
  };

  if (role === "seller") {
    //   // Product Upload FAQs
    //   {
    //     category: "Product Upload",
    //     idx: true,
    //     items: [
    //       {
    //         title: "How do I upload a new product?",
    //         description:
    //           "Go to your vendor dashboard, click on 'product-management', fill in all the required fields, and click 'Submit'.",
    //       },
    //       {
    //         title: "What image format is supported for product uploads?",
    //         description:
    //           "We support JPG, PNG, and WEBP formats. Each image should not exceed 2MB.",
    //       },
    //       {
    //         title: "Can I edit my product details after publishing?",
    //         description:
    //           "Yes, go to your 'product-management > manage-inventory' section and click 'Update Product' next to the product you want to update.",
    //       },
    //     ],
    //   },

    //   // Payment FAQs
    //   {
    //     category: "Payments",
    //     items: [
    //       {
    //         title: "When will I receive payment for my sales?",
    //         description:
    //           "Payments are processed weekly on Sundays for all completed and delivered orders.",
    //       },
    //       {
    //         title: "What payment methods are supported for vendors?",
    //         description:
    //           "You can receive payouts via bank transfer or mobile banking (e.g., bKash, Nagad).",
    //       },
    //       {
    //         title: "Where can I check my payment history?",
    //         description:
    //           "Navigate to the 'Revenue' section of your dashboard to view detailed payment history and payout status.",
    //       },
    //     ],
    //   },

    //   // Order Cancellation & Returns
    //   {
    //     category: "Order Cancellation & Returns",
    //     items: [
    //       {
    //         title: "Can I cancel an order as a vendor?",
    //         description:
    //           "Only pending orders can be canceled. Once shipped, cancellation is no longer possible from your end.",
    //       },
    //       {
    //         title: "How are returns processed?",
    //         description:
    //           "If a customer initiates a return, you'll be notified with details. You must respond within 48 hours.",
    //       },
    //       {
    //         title: "What happens if a product is returned?",
    //         description:
    //           "Once returned and verified, the amount is deducted from your next payout or refunded accordingly.",
    //       },
    //     ],
    //   },

    //   // Account & Profile Issues
    //   {
    //     category: "Account & Profile",
    //     items: [
    //       {
    //         title: "I forgot my password. What should I do?",
    //         description:
    //           "Click on the 'Forgot Password' option on the login page and follow the email instructions.",
    //       },
    //       {
    //         title: "How do I update my business information?",
    //         description:
    //           "Go to 'Settings' in your vendor dashboard to update your store name, contact info, or address.",
    //       },
    //       {
    //         title: "My account is under review. How long does it take?",
    //         description:
    //           "Account verification usually takes 1–3 business days. If it takes longer, please contact support.",
    //       },
    //     ],
    //   },
    // ];

    return (
      <>
        {data.map((item, index) => (
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
              {item.category}
            </AccordionSummary>
            {item.items.map((sub_item, idx) => (
              <div key={idx} className="max-w-2xl mx-auto">
                <Accordion
                  key={index}
                  // expanded={expanded === `${index}` || active === item.idx}
                  // onChange={handleChange(`${index}`)}
                  className="accordion"
                >
                  <AccordionSummary
                    expandIcon={
                      expanded === `${index}` ? <FiMinus /> : <GoPlus />
                    }
                    className="font-semibold"
                  >
                    {sub_item.title}
                  </AccordionSummary>
                  <AccordionDetails className="-mt-4">
                    {sub_item.description}
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </Accordion>
        ))}
      </>
    );
  }

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

AccordionX.propTypes = {
  role: PropTypes.string,
};

export default AccordionX;
