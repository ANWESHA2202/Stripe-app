const switchBtn = ({isYearly,setIsYearly}) => {
    const activeClass='rounded-md text-black  bg-white'
  return (
    <div className='bg-blue-800 w-3/4 text-white p-2 flex rounded-lg shadow-md'>
        <div className={`p-3 cursor-pointer ${!isYearly?activeClass:''}`} onClick={()=>{setIsYearly(0)}}>Monthly</div>
        <div className={`p-3 pr-5 cursor-pointer ${isYearly?activeClass:''}`} onClick={()=>setIsYearly(1)}>Yearly</div>
    </div>
  )
}

export default switchBtn