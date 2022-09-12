import * as React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getEvents, reset } from '../../features/events/eventSlice'
import { useNavigate } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import ChartQ from '../../components/stats/ChartQ'

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

  const options = ['A+','A-','B+','B-','AB+','AB-','O+','O-']

  const [bloodType, setBloodType] = useState(undefined)

return(
  <div id="cityChart">
  <TextField
          name='BloodType'
          id="selectBloodType"
          select
          label="Select"
          value={bloodType}
          onChange={(event) => setBloodType(event.target.value)}
          helperText="Please select blood type"
        >
            {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        {
          bloodType &&
             <ChartQ data = {chartData(events,bloodType)}/>
      }
  </div>
)
}
export default Stats

function chartData(events,type){

    var result = [];
    return(
        Object.values(
    chartData2(events,type).reduce(function(res, value) {
      if (!res[value.date]) {
        res[value.date] = { date: value.date, registers: 0, demand: 0, donate: 0};
        result.push(res[value.date])
      }
      res[value.date].registers += value.registers;
      res[value.date].demand += value.demand;
      res[value.date].donate += value.donate;
      return res;
    }, {})
    
    ))
  }

  function chartData2(events,type){
    return (

      events.map(event => {
        return (
            {date : event.date.substring(0,7),
              registers : event.bloodTypeRegisters[type],
              demand : event.bloodTypeDemands[type],
              donate : event.bloodTypeDonated[type]
            } 
        )
    })  
    )
  }