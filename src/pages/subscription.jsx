import {useState,useEffect} from 'react';

import ShowSubscriptions from '../components/subscription/showSubscriptions';
import StripeContainer from '../components/stripe/stripeContainer';

const Subscription = () => {
  const [step,setStep]=useState(0);

  const nextStep=()=>{
    if(step<2){
      setStep(step+1);
    }
    
  }
  const prevStep=()=>{
    if(step>0){
      setStep(step-1);
    } 
  }
  
  switch(step){
    case 0:{
      return(
        <ShowSubscriptions
          nextStep={nextStep}
        />
      )
      
    }
    case 1:{
      return(
        <StripeContainer
          prevStep={prevStep}
        />
      )
      
    }
    default:
      break
  }
}

export default Subscription