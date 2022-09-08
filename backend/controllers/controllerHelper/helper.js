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

    let startDate = createFullDate(date, timeStart)
    let endDate = createFullDate(date, timeEnd)

    let status

    if(today <  startDate)
        status = "Active"
    else if (today > endDate)
        status = "Ended"
    else 
        status = "In progress"

    return status
}

const compareEventsDate = (a, b) => {
    let dateA = createFullDate(a.date, a.timeStart)
    let dateB = createFullDate(b.date, b.timeStart)
    let result

    if(dateA <  dateB)
        result = -1
    else if (dateA > dateB)
        result = 1
    else 
        result = 0

    return result
}

const createFullDate = (date, time) => {
    let fullDate = new Date(date)
    fullDate.setHours(new Date(time).getHours())
    fullDate.setMinutes(new Date(time).getMinutes())

    return fullDate
}

const helper = {
    checkAuthorization, readyEventData, getEventStatus, compareEventsDate
}

module.exports = helper