import BasicPieChart from "../../components/stats/PieChart";
import * as React from 'react';
import { useEffect } from "react";
import { useState } from "react";

import { useSelector, useDispatch } from 'react-redux'
import { getEvents, reset } from '../../features/events/eventSlice'
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

  return(
    <BasicPieChart dataFirst= {pieData(events,'bloodTypeDemands')} dataSecond={pieData(events,'bloodTypeDonated').slice(0, -1)}/>
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