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

const helper = {
    checkAuthorization, readyEventData
}

module.exports = helper