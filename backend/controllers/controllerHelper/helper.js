const checkAuthorization = (req, res, isForMedicalOrganization) => {
    // Check for user    
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check for a medical organization demand
    if (req.user.isMedicalOrganization !== isForMedicalOrganization) {
        res.status(401)
        throw new Error('User not authorized')
    }
}

const readyEventData = async event => {
    let bloodTypeDonated = await BloodTypeTrack.findById(event.bloodTypeDonated.toString(),
    {_id: 0, createdAt: 0, updatedAt: 0, __v: 0}).exec()
    let bloodTypeRegisters = await BloodTypeTrack.findById(event.bloodTypeRegisters.toString(), 
    {_id: 0, createdAt: 0, updatedAt: 0, __v: 0}).exec()
    let bloodTypeDemands = await BloodTypeTrack.findById(event.bloodTypeDemands.toString(),
    {_id: 0, createdAt: 0, updatedAt: 0, __v: 0, 'Not specified': 0}).exec()

    let newEvent = {
        ...event._doc,
        bloodTypeDonated: bloodTypeDonated,
        bloodTypeRegisters: bloodTypeRegisters,
        bloodTypeDemands: bloodTypeDemands,
    }
    return newEvent
}

const getEventStatus = (date, timeStart, timeEnd) => {
    const today = new Date()

    let startDate = new Date(date)
    startDate.setHours(new Date(timeStart).getHours())
    startDate.setMinutes(new Date(timeStart).getMinutes())

    let endDate = new Date(date)
    endDate.setHours(new Date(timeEnd).getHours())
    endDate.setMinutes(new Date(timeEnd).getMinutes())

    let status

    if(today <  startDate)
    {
        status = "Active"
    }
    else if (today > endDate)
        status = "Ended"
    else 
        status = "In progress"

    return status
}

const helper = {
    checkAuthorization, readyEventData, getEventStatus
}

module.exports = helper