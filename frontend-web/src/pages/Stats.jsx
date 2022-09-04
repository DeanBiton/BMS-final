import BasicPieChart from "../components/stats/PieChart";
import DataComposedChart from "../components/stats/ComposedChart";
import * as React from 'react';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useEffect } from "react";
import { useState } from "react";

import { useSelector, useDispatch } from 'react-redux'
import { getEvents, reset } from '../features/events/eventSlice'
import { useNavigate } from 'react-router-dom'

function Stats(){
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { events, isLoading, isError, message } = useSelector(
      (state) => state.events
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }
    else
    {
      dispatch(getEvents())
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  const data = [
    { name: "Group A", value: 2400 },
    { name: "Group B", value: 4567 },
    { name: "Group C", value: 1398 },
    { name: "Group D", value: 9800 },
    { name: "Group E", value: 3908 },
    { name: "Group F", value: 4800 }
  ];

  const [value, setValue] = React.useState(0);
  const [show, setShow] = useState(<h1>test</h1>)

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setShow(statistics[newValue])
  }

  const statistics = [
    <BasicPieChart dataFirst= {pieData(events,'bloodTypeDemands')} dataSecond={pieData(events,'bloodTypeRegisters')}/>,
    <h1>Hello</h1>,
    <DataComposedChart headers={['id','demand','registers','donate']} data= {chartData(events)}/>,
  ];

return(

  <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
  <Tabs value={value} onChange={handleChange} centered>
    <Tab label="Pie" />
    <Tab label="Item Two" />
    <Tab label="Chart" />
  </Tabs>
  {show}

</Box>

)
}
export default Stats


function pieData(events,type){

     const data= events.map(event => {
    return event[type]
  }).reduce((a, b) => {
    for (let k in b) {
      if (b.hasOwnProperty(k))
        a[k] = (a[k] || 0) + b[k];
    }
    return a;
  }, {})
return (
  Object.entries(data).map(element =>{
    return ({name : element[0], value : element[1]})
  })
)
}

function chartData(events){
  return (
    events.map(event => {
      return (
          {id : event._id,
            registers : Object.values(event.bloodTypeRegisters).reduce((a, b) => a + b),
            demand : Object.values(event.bloodTypeDemands).reduce((a, b) => a + b),
            donate : Object.values(event.bloodTypeDonated).reduce((a, b) => a + b)
          } 
      )
  })  
  )
}



