import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createDonation, deleteDonation, getEventRegisters } from '../../../features/donations/donationSlice'

function DonationForm() {
    const dispatch = useDispatch()

    const [formData1, setFormData1] = useState(
        {
            eventId: "",
        }
    )

    function handleChange1(event) {
        const {name, value} = event.target
        setFormData1(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function handleSubmit1(event) {
        event.preventDefault()
        dispatch(createDonation(formData1))
        console.log(formData1)
    }

    const [formData2, setFormData2] = useState(
        {
            id: "",
        }
    )

    function handleChange2(event) {
        const {name, value} = event.target
        setFormData2(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function handleSubmit2(event) {
        event.preventDefault()
        dispatch(deleteDonation(formData3))
        console.log(formData3)
    }
    
    const [formData3, setFormData3] = useState(
        {
            id: "",
        }
    )

    function handleChange3(event) {
        const {name, value} = event.target
        setFormData3(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function handleSubmit3(event) {
        event.preventDefault()
        dispatch(getEventRegisters(formData3))
        console.log(formData3)
    }

    return (
        <>
            <form onSubmit={handleSubmit1}>
                <input
                    type="text"
                    placeholder="Event ID"
                    onChange={handleChange1}
                    name="eventId"
                    value={formData1.eventId}
                />
                <br />
                <br />
                <button>Submit</button>
            </form>

            <form onSubmit={handleSubmit2}>
                <input
                    type="text"
                    placeholder="Event ID"
                    onChange={handleChange2}
                    name="id"
                    value={formData2.id}
                />
                <br />
                <br />
                <button>Submit</button>
            </form>

            <form onSubmit={handleSubmit3}>
                <input
                    type="text"
                    placeholder="id"
                    onChange={handleChange3}
                    name="id"
                    value={formData3.id}
                />
                <br />
                <br />
                <button>Submit</button>
            </form>
        </>
  )
}

export default DonationForm