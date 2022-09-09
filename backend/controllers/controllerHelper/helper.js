const User = require('../../models/userModel')
const Event = require('../../models/eventModel')
const Register = require('../../models/registerModel')
const Donation = require('../../models/donationModel')
const BloodTypeTrack = require('../../models/BloodTypeTrackModel')

const getRandomId = () => {
    return (Math.floor(Math.random() * 1000000000) + 1000000000).toString().substring(1);
}

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

const isBloodType = (name) => {
    const bloodTypes = ["A+","A-","B+","B-","O+","O-","AB+","AB-"]
    return bloodTypes.includes(name)
}

const updateBloodTypesInEvents = async(id, bloodType, pastBloodType) => {
    if(bloodType !== pastBloodType)
    {
        let registerEvents = await Register.find({user: id})
        let donationEvents = await Donation.find({user: id})
        await registerEvents.forEach(async (register) => {
            const event = await Event.findById(register.event)
            const bloodTypetrack = await BloodTypeTrack.findById(event.bloodTypeRegisters)
            const founded = await BloodTypeTrack.findById(bloodTypetrack._id)
            const newBlood = await BloodTypeTrack.findByIdAndUpdate(bloodTypetrack, 
                {
                    [bloodType]: bloodTypetrack[bloodType] + 1,
                    [pastBloodType]: bloodTypetrack[pastBloodType] - 1,
                })
        })
        await donationEvents.forEach(async (register) => {
            const event = await Event.findById(register.event)
            const bloodTypetrack = await BloodTypeTrack.findById(event.bloodTypeRegisters)
            const founded = await BloodTypeTrack.findById(bloodTypetrack._id)
            const newBlood = await BloodTypeTrack.findByIdAndUpdate(bloodTypetrack, 
                {
                    [bloodType]: bloodTypetrack[bloodType] + 1,
                    [pastBloodType]: bloodTypetrack[pastBloodType] - 1,
                })
        })
    }
}

const addIsDonatedField = async (user, event) => {
    const donation = await Donation.find({event : event, user : user._id})
    let res
    if(donation.length !== 0)
        res = {...user._doc, isDonated: true}
    else
        res = {...user._doc, isDonated: false}
    return res
}

const helper = {
    getRandomId, checkAuthorization, readyEventData, getEventStatus, compareEventsDate,isBloodType, updateBloodTypesInEvents,
    addIsDonatedField,
}

module.exports = helper