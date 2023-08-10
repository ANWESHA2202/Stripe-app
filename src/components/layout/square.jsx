const Square = ({text,activeClassName}) => {
  console.log(text,activeClassName)
  const activeClassStyle='bg-blue-800';
  const inActiveClassStyle='bg-gray-400';
  return (
    <div>
      <div className={`${activeClassName==text?activeClassStyle:inActiveClassStyle} cursor-pointer text-white text-center pt-8 pb-8 pl-2 pr-2`} style={{width:'100px'}}>{text}</div>
    </div>
  )
}

export default Square