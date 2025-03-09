import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useEffect, useState } from "react";
// import useAxiosCommon from "../../hooks/useAxiosCommon";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PropTypes from "prop-types";

const CheckoutForm = ({ closeModal, orderInfo, setTransactionId }) => {
  const stripe = useStripe();
  const elements = useElements();
  // const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // option 1
    // fetch(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/JSON" },
    //   body: JSON.stringify({ total_price: orderInfo.total_price }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => setClientSecret(data.clientSecret));

    // option 2
    getClientSecret(orderInfo.total_price);
  }, [orderInfo]);

  const getClientSecret = async (total_price) => {
    const { data } = await axiosSecure.post("/create-payment-intent", {
      total_price,
    });
    setClientSecret(data.clientSecret);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: orderInfo?.order_owner_info?.email,
            name: orderInfo?.order_owner_info?.name,
          },
        },
      });

    if (paymentIntent.status === "succeeded") {
      setProcessing(false);
      setTransactionId(paymentIntent.id);
      console.log(orderInfo);
      // TODO:
      // 1. create payment info obj
      // 2. save payment info in db
      // 3. update cart
      // 4. update Product card
    }

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex mt-2 justify-around">
          <button
            disabled={!stripe || cardError || processing}
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            {/* {processing ? (
              <ImSpinner9 className='animate-spin m-auto' size={24} />
            ) : ( */}
            {/* `Pay ${bookingInfo?.price}` */}
            {/* )} */}
            Pay
          </button>
          <button
            onClick={closeModal}
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
    </>
  );
};

CheckoutForm.propTypes = {
  closeModal: PropTypes.func,
  orderInfo: PropTypes.object,
  setTransactionId: PropTypes.func,
};

export default CheckoutForm;
