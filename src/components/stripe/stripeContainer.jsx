import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "./paymentForm"

const PUBLIC_KEY='pk_test_51NdW7LSAv1rq4kfxQvAZCVLZjC9PpsvWzLdWEzPIQCtZNogDC7VPCKlr0YFdM9wAuvIMzHc6HwJ3362mlnrMbSii00He0yGyZ4'
const stripeTestPromise=loadStripe(PUBLIC_KEY)

const StripeContainer = ({prevStep}) => {
  return (
    <div className="w-screen h-screen bg-blue-800 flex justify-center items-center">
        <Elements stripe={stripeTestPromise}>
            <PaymentForm prevStep={prevStep}/>
        </Elements>
    </div>
  )
}

export default StripeContainer