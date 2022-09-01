import React from "react"
import { useLocation } from 'react-router-dom'
import data from "../dummy/Events"
import SimpleTable from "../components/Table"
import "./Event.css";

function Event() {
        const event_id = useLocation().state.event_id
        
        const event = data.find(obj => {
            return obj._id === event_id;
          });
          

      return (
        <>
        <h1>hello {event._id} </h1>
        <h1>Date {event.date}</h1>
        <h1>Location {event.location}</h1>
        
        <SimpleTable rows={[{Type:"BloodTypeRegisters",...event.bloodTypeRegisters},
        {Type:"BloodTypeDemands",...event.bloodTypeDemands}]}/>
       {checkform}
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
