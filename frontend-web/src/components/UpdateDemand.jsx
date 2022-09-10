import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import BloodForm from '../components/CreateEvent/BloodForm'
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateEvent } from '../features/events/eventSlice'


export default function Test({eventId, data, handle}){
    const dispatch = useDispatch()


    const[formData,setFormData] = React.useState({
        "id":eventId,
        "A+":data["A+"],
        "A-":data["A-"],
        "B+":data["B+"],
        "B-":data["B+"],
        "AB+":data["AB+"],
        "AB-":data["AB-"],
        "O+":data["O+"],
        "O-":data["O-"]
    })

    function handleChange(event) {
        const {name, value,type} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: (type === 'number' && value < 0)? 0 : value
            }
        })
    }

    function handleOk(){
        dispatch(updateEvent(formData))
        handle(false)
    }
return(
    <Paper  className="eventInnerPaper" variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
    <BloodForm formData={formData} handleFunc={handleChange}/>
    <div className='updateDemendBtns'>
    <Button  variant="contained" onClick={handleOk}>Update</Button>
    <Button  variant="contained" onClick={()=>handle(false)} >Cancel</Button>        
    </div>

    </Paper>
)
}