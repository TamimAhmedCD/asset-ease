// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { Button } from "@mui/material";
// import { useEffect, useState } from "react";
// import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
// import useAuth from "../../../Hooks/useAuth";

// const CheckoutForm = () => {
//   const [error, setError] = useState("");
//   const [clientSecret, setClientSecret] = useState("")
//   const stripe = useStripe();
//   const elements = useElements();
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const [manager, setManager] = useState({});
//   console.log(manager);
//   const [price, setPrice] = useState(0);
//   console.log(price);

//   useEffect(() => {
//     axiosSecure.get(`/hr-account/${user.email}`).then((res) => {
//       const data = res.data;
//       setManager(data);
//       if (data.package === "premium") {
//         setPrice(15);
//       } else if (data.package === "standard") {
//         setPrice(8);
//       } else if (data.package === "basic") {
//         setPrice(5);
//       }
//     });
//     axiosSecure.post("/create-payment-intent", { price: price }).then((res) => {
//       console.log(res.data.clientSecret);
//       setClientSecret(res.data.clientSecret)
//     });
//   }, [axiosSecure, price, user.email]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) {
//       return;
//     }
//     const card = elements.getElement(CardElement);

//     if (card === null) {
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });

//     if (error) {
//       console.log("Payment error", error);
//       setError(error.message);
//     } else {
//       console.log("Payment method", paymentMethod);
//       setError("");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#424770",
//                 "::placeholder": {
//                   color: "#aab7c4",
//                 },
//               },
//               invalid: {
//                 color: "#9e2146",
//               },
//             },
//           }}
//         />
//         <div className="flex justify-center items-center mt-6">
//           <Button
//             variant="contained"
//             type="submit"
//             disabled={!stripe || !clientSecret}
//             className="text-center"
//           >
//             Subscribe
//           </Button>
//           <p className="text-red-600">{error}</p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CheckoutForm;
