import React from "react"
import BasicDatePicker from "../components/DatePicker"
import { Dayjs } from 'dayjs';
import * as dayjs from 'dayjs'
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
        timeStart:null,
        timeEnd:null,
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
    const [TimeStartValue, setTimeStartValue] = React.useState(Dayjs);
    const [TimeEndValue, setTimeEndValue] = React.useState(Dayjs);

    const [ErrorValue, setErrorValue] = React.useState();
    let isOk = true
    // useEffect(()=>{
    //     console.log(formData)
    // }, [formData,])

    function sendForm(){
        formData.date = dayjs(DateValue).toDate()       
        formData.timeStart = dayjs(TimeStartValue).toDate()  
        formData.timeEnd = dayjs(TimeEndValue).toDate()  

        setErrorValue(errorDisplay() ) 
        if(isOk)
           {
            //dispatch(createEvent(formData))
            console.log("dispach")
           } console.log("notGood")
        

        //formData.location = LocationValue
    }
    
    function errorDisplay(){
         const dateError = formData.date<Date.now()? "please enter valid date":null
         const locationError = formData.location===""? "please enter location":null
         //const timeError = (formData.timeEnd<=formData.timeStart) || (formData.timeStart<Date.now() && formData.date===Date.now())? "please enter valid times":null
         console.log(dateError)
        if(dateError!== null ||locationError !==null)
            isOk=false
        console.log(isOk)    
        return (
            <>
        {isOk ? (
            <div>
                <h1>its ok</h1>
            </div>
            ) : (
            <div>
                <h1>{dateError}</h1>
                <h1>{locationError}</h1>
                {/* <h1>{timeError}</h1> */}
            </div>
        )}
        </>
        )
    } 


    return (
        <>

        <div class="row">
            <div class="col-25">
            <h1>Date</h1>
            </div>
            <div class="col-75">
            <BasicDatePicker value={DateValue} setValue={setDateValue}/>            
            </div>
        </div>
        <div class="row">
            <div class="col-25">
            <h1>Start Time</h1>
            </div>
            <div class="col-75">
            <TimePicker value={TimeStartValue} setValue={setTimeStartValue}/>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
            <h1>End Time</h1>
            </div>
            <div class="col-75">
            <TimePicker value={TimeEndValue} setValue={setTimeEndValue}/>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
            <h1>Location</h1>
            </div>
            <div class="col-75">
            <TextField name="location" label="Address" variant="outlined" value={formData.location} onChange={handleChange}/>
            </div>
        </div>
       <div class="row">
        <h1>Blood Demand</h1>
        <BloodDemand formData={formData} handleChange={handleChange}/>
       </div>
       <div class="row">
        <Button variant="contained" onClick={sendForm}>Send</Button>
        <h1>{ErrorValue}</h1>
       </div>
        </>
    )
}
export default Create




