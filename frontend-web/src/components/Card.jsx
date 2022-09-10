import React from "react"
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { FaSignInAlt,FaMapMarkerAlt, FaRegClock,FaRegCalendar } from 'react-icons/fa'
import { Box } from "@mui/material";
import Avatar from '@mui/material/Avatar';

const shapeStyles = { bgcolor: 'primary.main', width: 40, height: 40 };
const shapeCircleStyles = { borderRadius: '50%' };
const circle = (
    <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
  );
  
  function colorEvent(value){
    if(value==='Active')
      return 'linear-gradient(110deg, #dcdcdc 60%, #87cefa 60%)' 
    else if(value==='In progress')
      return 'linear-gradient(110deg, #dcdcdc 60%, #8fbc8f 60%)'
    else
      return 'linear-gradient(110deg, #dcdcdc 60%, #eee8aa 60%)'
  }

export default function Card(props) {
    //console.log(props)
    const navigate = useNavigate()
    const handleClick = () => {
        //<Link to="/event" id={"86"}> </Link>
        navigate('/event',{state:{event_id:props.event._id}});
        //navigate('/donated',{state:{event_id:props.event._id}});
      };


      const options = {
        // timeZone:"America/Sao_Paulo",
        hour12 : false,
        hour:  "2-digit",
        minute: "2-digit",
        second: "2-digit"
     };
    const date = new Date(props.event.date).toLocaleDateString('en-GB')
    const timeStart = new Date(props.event.timeStart).toLocaleTimeString(undefined,options).substring(0,5)
    const timeEnd = new Date(props.event.timeEnd).toLocaleTimeString(undefined,options).substring(0,5)
    return (
        <div className="goal cardList card-container" style={{'background': colorEvent(props.event.status)}}>
            <div className="card__text">
                  <div className="twoSides padding">
                <FaRegCalendar size={35} />
                <h2>{date}</h2>
                  </div>
                  <div className="twoSides padding">
                <FaRegClock size={35} />
                <h2>{timeStart}-{timeEnd}</h2>
                  </div>
                  <div className="twoSides padding">
                <FaMapMarkerAlt size={35} />
                <h2>{props.event.city}, {props.event.address}</h2>
                  </div>     
            </div>

            {/* <button onClick={handleClick}>info</button> */}
            <div className="card__right">

                <button className='btn' onClick={handleClick}>
                 Information
                </button>         
            </div>

        </div>
    )
}