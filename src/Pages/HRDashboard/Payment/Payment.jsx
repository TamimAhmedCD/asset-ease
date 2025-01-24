import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
  return (
    <div className="w-6/12 mx-auto">
      <h1 className="text-2xl text-center">This is Payment page</h1>
      <div className="mt-10">
        <Elements stripe={stripePromise}>
          {/* <CheckoutForm></CheckoutForm> */}
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
