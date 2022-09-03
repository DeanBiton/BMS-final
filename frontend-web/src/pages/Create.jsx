import React from "react"
import BasicDatePicker from "../components/DatePicker"
import { Dayjs } from 'dayjs';
import { useEffect } from "react";
import { TextField } from "@mui/material";
import { useState } from "react";
import BloodDemand from "../components/BloodDemand";
import Button from "@mui/material/Button";
import  TimePicker  from "../components/TimePicker"
import { useDispatch } from 'react-redux'
import { createEvent } from '../features/events/eventSlice'

function Create(){
    const dispatch = useDispatch()

    function handleChange(event) {
        const {name, value,type} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: (type === 'number' && value < 0)? 0 : value
            }
        })
    }

    const[formData,setFormData] = useState({
        location:"",
        date:null,
        time:null,
        "A+":0,
        "A-":0,
        "B+":0,
        "B-":0,
        "AB+":0,
        "AB-":0,
        "O+":0,
        "O-":0
    })
    const [DateValue, setDateValue] = React.useState(Dayjs);
    const [TimeValue, setTimeValue] = React.useState(Dayjs);

    // useEffect(()=>{
    //     console.log(formData)
    // }, [formData,])

    function sendForm(){
        formData.date = DateValue
        formData.time = TimeValue
        dispatch(createEvent(formData))
        console.log(formData)
    }

    return (
        <>
        <BasicDatePicker value={DateValue} setValue={setDateValue}/>
       <div>
            <TimePicker value={TimeValue} setValue={setTimeValue}/>
       </div>
       <div>
            <TextField name="location" label="Address" variant="outlined" value={formData.address} onChange={handleChange}/>
       </div>
            <BloodDemand formData={formData} handleChange={handleChange}/>
        <Button variant="contained" onClick={sendForm}>Send</Button>
        </>
    )
}
export default Create




