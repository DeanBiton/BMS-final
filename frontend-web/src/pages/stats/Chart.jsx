import DataComposedChart from "../../components/stats/ComposedChart";
import * as React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getEvents, reset } from '../../features/events/eventSlice'
import { useNavigate } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';


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


  const options = [...new Set(events.map(event => event.city))];

  const [city, setCity] = useState(undefined)

return(
  <div id="cityChart">
  <TextField
          name='city'
          id="selectCityChart"
          select
          label="Select"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          helperText="Please select city"
        >
            {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        {
          city && 
              <DataComposedChart headers={['id','demand','registers','donate']} data= {chartCityData(events,city)} />
        }
  </div>
)
}
export default Stats

  function chartCityData(events,city){
    return (

      events.filter(event=>event.city===city).map(event => {
        return (
            {id : `${event.date.substring(0,7)}
            ${event.timeStart.substring(11,16)}-${event.timeEnd.substring(11,16)}`,
              registers : Object.values(event.bloodTypeRegisters).reduce((a, b) => a + b),
              demand : Object.values(event.bloodTypeDemands).reduce((a, b) => a + b),
              donate : Object.values(event.bloodTypeDonated).reduce((a, b) => a + b)
            } 
        )
    })  
    )
  }