import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "@mui/material";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if(error) {
        console.log('Payment error', error);
    } else {
        console.log('Payment method', paymentMethod);
    }
  };

  return (
    <div>
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
        <div className="flex justify-center items-center mt-6">
          <Button
            variant="contained"
            type="submit"
            disabled={!stripe}
            className="text-center"
          >
            Subscribe
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
