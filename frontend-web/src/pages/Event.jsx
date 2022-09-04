import React from "react"
import { useLocation } from 'react-router-dom'
import data from "../dummy/Events"
import SimpleTable from "../components/Table"
import Button from "@mui/material/Button";
import { useDispatch } from 'react-redux'
import { deleteEvent } from '../features/events/eventSlice'
import "./Event.css";

function Event() {
        const event = useLocation().state.event
        const dispatch = useDispatch()

        function handleDelete(){
          dispatch(deleteEvent(event._id))
          console.log(event._id)
      }
      
      return (
        <>
        <h1>hello {event._id} </h1>
        <h1>Date {event.date}</h1>
        <h1>Location {event.location}</h1>
        
        <SimpleTable rows={[
        {Type:"bloodTypeDonated",...event.bloodTypeDonated},
        {Type:"BloodTypeRegisters",...event.bloodTypeRegisters},
        {Type:"BloodTypeDemands",...event.bloodTypeDemands}]}/>
       {checkform}
       <Button variant="contained" onClick={handleDelete}>Delete</Button>

        </>
      )
    
   
}
export default Event

const checkform = 
<form>
<div id="trst"  >
 
  <input type="number" placeholder="8" min="1" max="50" />
  <input type="number" placeholder="8" min="1" max="50" />
  <input type="number" placeholder="8" min="1" max="50" />
  <input type="number" placeholder="8" min="1" max="50" />
  <input type="number" placeholder="8" min="1" max="50" />
  <input type="number" placeholder="8" min="1" max="50" />
  <input type="number" placeholder="8" min="1" max="50" />
  <input type="number" placeholder="8" min="1" max="50" />
  </div>

<input type="submit" value="Submit" />
</form>
