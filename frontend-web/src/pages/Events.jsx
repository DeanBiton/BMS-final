import React from "react"
import Card from "../components/Card"
import data from "../dummy/Events"

function Events() {
      
    
    const cards = data.map(event => {
        return (
            <Card 
                key={event._id}
                event_id={event._id}
                date={event.date}
                location={event.location}

            />
        )
    })        
    
    return (
        <div>
            {cards}
        </div>
    )
}
export default Events
