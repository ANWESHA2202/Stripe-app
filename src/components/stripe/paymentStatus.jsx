import { Button } from "@chakra-ui/react";
import { useState,useEffect } from "react";
const PaymentStatus = ({planDetails}) => {
  const [planStatus, setPlanStatus] = useState(true);
  const [today,setToday]=useState('')

  useEffect(()=>{
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setToday(currentDate.toLocaleDateString('en-US', options));
  },[])
  return (
    <div className="w-1/2 p-5 rounded-xl bg-blue-100">
      <div className="w-full flex justify-between items-center">
        <span className="flex items-center">
          <h1 className="text-xl">Current Plan Details</h1>
          <div
            className={`p-1 pr-2 pl-2 ml-2 rounded-lg ${
              planStatus
                ? "bg-blue-200 text-blue-500"
                : "bg-red-200 text-red-500"
            }`}
          >
            {planStatus ? "Active" : "Cancelled"}
          </div>
        </span>
        {planStatus ? <span className="text-blue-500 underline cursor-pointer" onClick={()=>setPlanStatus(false)}>Cancel</span> : null}
      </div>
      <div className="mt-5">
        <div className="text-gray-600">{planDetails.Name}</div>
        <div className="text-sm text-gray-400">{planDetails.Devices}</div>
        <div className="mt-3 mb-5 text-2xl font-bold">₹ {planDetails.Price}</div>
        <div>
            <button className="p-2 pr-4 pl-4 border-2 mb-10 text-blue-500 border-blue-400">Change Plan</button>
        </div>
        {planStatus?<div>
            Your Subscription has started on {today}!
        </div>:<div>You've cancelled the plance, Hence You'll loose access from {today}!</div>}
      </div>
    </div>
  );
};

export default PaymentStatus;
