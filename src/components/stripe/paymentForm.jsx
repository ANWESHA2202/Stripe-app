import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "@chakra-ui/react";
import { Table, Tbody, Tr, Td, TableContainer } from "@chakra-ui/react";
import PaymentStatus from "./paymentStatus";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#0380aa",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#0380aa" },
    },
    invalid: {
      iconColor: "red",
      color: "red",
    },
  },
};
const PaymentForm = ({ prevStep }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [planDetails, setPlanDetails] = useState(
    JSON.parse(localStorage.getItem("plan"))
  );
  const[success,setSuccess]=useState(false)
  const [isProcessing, setIsProcessing] = useState(false);
  const [today, setToday] = useState("");


  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const calculateExpireDate = (date) => {
    const planDuration = planDetails.Price.split("/")[1];
    const dateObject = new Date(date);

    if (planDuration === "Month") {
      dateObject.setMonth(dateObject.getMonth() + 1);
    } else if (planDuration === "Year") {
      dateObject.setFullYear(dateObject.getFullYear() + 1);
    }

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth();
    const nextDay = dateObject.getDate();

    // Calculate the last day of the next month, considering leap years
    const lastDayOfNextMonth = new Date(year, month + 1, 0).getDate();

    // Adjust the day if it's beyond the last day of the next month
    const correctedNextDay =nextDay <= lastDayOfNextMonth ? nextDay : lastDayOfNextMonth;

    // Set the date to the corrected day
    dateObject.setDate(correctedNextDay);
   
    return formatDate(dateObject)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    const currentDate = new Date();
    const purchaseDate = formatDate(currentDate);
    setToday(purchaseDate);

    const expireDate = calculateExpireDate(purchaseDate);
    console.log(expireDate)
    const user=localStorage.getItem('email');
    if (!error) {
      try {
        const { id } = paymentMethod;
        const res = await fetch("http://localhost:4000/users/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: parseInt(planDetails.Price.split(" ")[0]),
            id,
            plan_name: planDetails.Name,
            purchase_date: purchaseDate,
            expire_date: expireDate,
            user
          }),
        });

        if (res.status == 200) {
          setSuccess(true)
          console.log("successfull payment");
        } else {
          console.log("payment failed");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
    {!success?
        <div className="w-2/3 p-5 space-x-5 bg-blue-100 flex justify-evenly items-center rounded-lg shadow-lg">
          <div className="w-1/2 space-y-8 flex flex-col">
            <div>
              <h1 className="text-2xl">Complete Your Payment</h1>
              <p className="text-gray-400">Enter your Card Details Below</p>
            </div>

            <form className="w-full m-5">
              <CardElement options={CARD_OPTIONS} />
            </form>
            <Button
              className={`p-4 ${!isProcessing?'bg-blue-500 cursor-pointer':'bg-blue-300 cursor-not-allowed animate-pulse'}`}
              colorScheme="blue.800"
              onClick={handleSubmit}
            >
              Pay
            </Button>
          </div>
          <div>
            <TableContainer>
              <Table size="sm" className="border-l-2 border-blue-500">
                <h1 className="ml-10 mb-5 text-xl">Order Details</h1>
                <Tbody>
                  <Tr>
                    <Td>Plan Name</Td>
                    <Td>{planDetails.Name}</Td>
                  </Tr>
                  <Tr>
                    <Td>Price</Td>
                    <Td>{planDetails.Price}</Td>
                  </Tr>
                  <Tr>
                    <Td>Resolution</Td>
                    <Td>{planDetails.Resolution}</Td>
                  </Tr>
                  <Tr>
                    <Td>Video Quality</Td>
                    <Td>{planDetails.Video_Quality}</Td>
                  </Tr>
                  <Tr>
                    <Td>No. of Screens</Td>
                    <Td>{planDetails.Active_Screen}</Td>
                  </Tr>
                  <Tr>
                    <Td>Devices</Td>
                    <Td>{planDetails.Devices}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </div>
:<PaymentStatus today={today} planDetails={planDetails} prevStep={prevStep}/>}
    </>
  );
};

export default PaymentForm;
