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

 // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const [value, setValue] = React.useState(0);
  const [show, setShow] = useState(<h1>test</h1>)





  const handleChange = (event, newValue) => {
    setValue(newValue);
    setShow(statistics[newValue])
  }

  const data0r = events.map(event => {
    return event.bloodTypeRegisters
  }).reduce((a, b) => {
    for (let k in b) {
      if (b.hasOwnProperty(k))
        a[k] = (a[k] || 0) + b[k];
    }
    return a;
  }, {});

  const data00r = Object.entries(data0r).map(element =>{
    return ({name : element[0], value : element[1]})
  })

  const data0d = events.map(event => {
    return event.bloodTypeDemands
  }).reduce((a, b) => {
    for (let k in b) {
      if (b.hasOwnProperty(k))
        a[k] = (a[k] || 0) + b[k];
    }
    return a;
  }, {});

  const data00d = Object.entries(data0d).map(element =>{
    return ({name : element[0], value : element[1]})
  })

 const data2 = events.map(event => {
      return (
          {id : event._id,
            registers : Object.values(event.bloodTypeRegisters).reduce((a, b) => a + b),
            demand : Object.values(event.bloodTypeDemands).reduce((a, b) => a + b)
          } 

      )
  })  

  
    console.log(data)


  const statistics = [
    <BasicPieChart dataFirst= {data00d} dataSecond={data00r}/>,
    <h1>Hello</h1>,
    <DataComposedChart headers={['id','demand','registers']} data= {data2}/>,
  ];

return(

  <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
  <Tabs value={value} onChange={handleChange} centered>
    <Tab label="Item One" />
    <Tab label="Item Two" />
    <Tab label="Item Three" />
  </Tabs>
  {show}

</Box>

)
}
export default Stats


