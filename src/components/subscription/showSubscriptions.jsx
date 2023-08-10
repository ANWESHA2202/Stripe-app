import data from '../fetchApi_data/data.json'
import { useState } from 'react'
import SwitchBtn from '../layout/switchBtn'
import Square from '../layout/square'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button
  } from '@chakra-ui/react'

const ShowSubscriptions = ({nextStep}) => {
  const [isYearly,setIsYearly]=useState(0);
  const [planName,setPlanName]=useState(data[0].Basic);

  const handlePlan=(plan)=>{
    setPlanName(data[isYearly][plan])
  }

  const handleNext=()=>{
    localStorage.setItem('plan',JSON.stringify(planName));
    nextStep();
  }
  return (
    <div className='flex flex-col space-y-10 justify-center items-center mt-10'>
      <h1 className='text-lg font-semibold'>Choose the Right Plan for You</h1>
      <TableContainer>
        <Table variant='simple' className='select-none'>
          {/* <TableCaption>Select the Perfect Plan For You</TableCaption> */}
          <Thead>
            <Tr>
                <Th>
                  <SwitchBtn isYearly={isYearly} setIsYearly={setIsYearly}/>
                </Th>
                <Th onClick={()=>handlePlan('Basic')}>
                  <Square text='Basic' activeClassName={planName.Name}/>
                </Th>
                <Th onClick={()=>handlePlan('Standard')}>
                  <Square text='Standard' activeClassName={planName.Name}/>
                </Th>
                <Th onClick={()=>handlePlan('Premium')}>
                  <Square text='Premium' activeClassName={planName.Name}/>
                </Th>
                <Th onClick={()=>handlePlan('Regular')}>
                  <Square text='Regular' activeClassName={planName.Name}/>
                </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{isYearly?'Yearly Price':'Monthly Price'}</Td>
              <Td>{data[isYearly].Basic.Price}</Td>
              <Td>{data[isYearly].Standard.Price}</Td>
              <Td>{data[isYearly].Premium.Price}</Td>
              <Td >{data[isYearly].Regular.Price}</Td>
            </Tr>
            <Tr>
              <Td>Video Quality</Td>
              <Td>{data[isYearly].Basic.Video_Quality}</Td>
              <Td>{data[isYearly].Standard.Video_Quality}</Td>
              <Td>{data[isYearly].Premium.Video_Quality}</Td>
              <Td >{data[isYearly].Regular.Video_Quality}</Td>
            </Tr>
            <Tr>
              <Td>Resolution</Td>
              <Td>{data[isYearly].Basic.Resolution}</Td>
              <Td>{data[isYearly].Standard.Resolution}</Td>
              <Td>{data[isYearly].Premium.Resolution}</Td>
              <Td >{data[isYearly].Regular.Resolution}</Td>
            </Tr>
            <Tr>
              <Td>Devices You can Use To Watch</Td>
              <Td>{data[isYearly].Basic.Devices}</Td>
              <Td>{data[isYearly].Standard.Devices}</Td>
              <Td>{data[isYearly].Premium.Devices}</Td>
              <Td >{data[isYearly].Regular.Devices}</Td>
            </Tr>
            <Tr>
              <Td>Number of Active Screen At A Time</Td>
              <Td>{data[isYearly].Basic.Active_Screen}</Td>
              <Td>{data[isYearly].Standard.Active_Screen}</Td>
              <Td>{data[isYearly].Premium.Active_Screen}</Td>
              <Td >{data[isYearly].Regular.Active_Screen}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      <Button className='p-4 bg-blue-800'colorScheme='blue.800' minWidth={200} onClick={()=>handleNext()}>Next</Button>
    </div>
  )
}

export default ShowSubscriptions