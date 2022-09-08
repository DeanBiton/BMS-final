import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBloodType } from '../../../features/auth/authSlice'

function DonationForm() {
    const dispatch = useDispatch()

    const [formData1, setFormData1] = useState(
        {
            id: "",
            bloodType: "",
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
        dispatch(updateBloodType(formData1))
        console.log(formData1)
    }
    
    return (
        <>
            <form onSubmit={handleSubmit1}>
                <input
                    type="text"
                    placeholder="id"
                    onChange={handleChange1}
                    name="id"
                    value={formData1.id}
                />
                <input
                    type="text"
                    placeholder="bloodType"
                    onChange={handleChange1}
                    name="bloodType"
                    value={formData1.bloodType}
                />
                <br />
                <br />
                <button>Submit</button>
            </form>
        </>
  )
}

export default DonationForm